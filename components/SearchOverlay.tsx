"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, ExternalLink } from "lucide-react";
import { AppIcon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { referenzen } from "../data/referenzen";
import { produkte } from "../data/produkte";
import type { Dictionary } from "../app/[lang]/dictionaries";

interface SearchResult {
  type: "referenz" | "kategorie" | "produkt";
  title: string;
  subtitle: string;
  href: string;
}

export default function SearchOverlay({
  lang,
  dict,
  open,
  onClose,
}: {
  lang: string;
  dict: Dictionary;
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Build search index
  const allItems = useMemo<SearchResult[]>(() => {
    const items: SearchResult[] = [];

    // Neue Seiten
    items.push({
      type: "kategorie",
      title: dict.nav.loesungsfinder,
      subtitle: dict.home.finder_teaser_title,
      href: `/${lang}/loesungsfinder/`,
    });
    items.push({
      type: "kategorie",
      title: dict.nav.anwendungsmatrix,
      subtitle: dict.anwendungsmatrix.h1,
      href: `/${lang}/anwendungsmatrix/`,
    });

    // Referenzen
    referenzen.forEach((ref) => {
      items.push({
        type: "referenz",
        title: ref.titel,
        subtitle: `${ref.ort}, ${ref.land}`,
        href: `/${lang}/referenzen/${ref.slug}`,
      });
    });

    // Produkte
    produkte.forEach((prod) => {
      items.push({
        type: "produkt",
        title: prod.name,
        subtitle: prod.kurzbeschreibung.slice(0, 80),
        href: `/${lang}/produkte/${prod.id}`,
      });
    });

    return items;
  }, [lang, dict]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allItems
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [query, allItems]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      e.preventDefault();
      navigateTo(results[selectedIndex]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  const navigateTo = (result: SearchResult) => {
    onClose();
    if (result.href.startsWith("http")) {
      window.open(result.href, "_blank");
    } else {
      router.push(result.href);
    }
  };

  const typeLabels: Record<string, string> = {
    referenz: dict.common.reference_singular,
    kategorie: dict.common.page,
    produkt: dict.referenzen.filter_all_products.replace("Alle ", "").replace("All ", "").replace("Tous les ", ""),
  };

  const typeBadgeClasses: Record<string, string> = {
    referenz: "bg-cyan/10 text-cyan",
    kategorie: "bg-navy/10 text-navy",
    produkt: "bg-cyan-hover/10 text-cyan-hover",
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center animate-overlay"
      style={{ paddingTop: "min(20vh, 160px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Search panel */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full mx-4 overflow-hidden animate-fade-in-up"
        style={{ maxWidth: 600 }}
      >
        {/* Input */}
        <div className="flex items-center gap-3 border-b border-bullet-bg" style={{ padding: "16px 20px" }}>
          <AppIcon icon={Search} className="size-5 shrink-0 text-cyan" strokeWidth={2} aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={lang === "de" ? "Suchen..." : lang === "fr" ? "Rechercher..." : lang === "pl" ? "Szukaj..." : "Search..."}
            className="flex-1 text-[16px] text-navy bg-transparent border-none outline-none placeholder:text-navy placeholder:opacity-30"
            style={{ fontFamily: "inherit", fontWeight: 600 }}
          />
          <kbd className="hidden sm:inline-flex items-center text-[11px] text-navy opacity-30 px-2 py-0.5 rounded border border-bullet-bg" style={{ fontWeight: 600 }}>
            ESC
          </kbd>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="max-h-[400px] overflow-y-auto" style={{ padding: "8px" }}>
            {results.map((result, i) => (
              <button
                key={`${result.type}-${result.title}-${i}`}
                onClick={() => navigateTo(result)}
                onMouseEnter={() => setSelectedIndex(i)}
                className={`w-full flex items-center gap-3 text-left rounded-xl border-none cursor-pointer transition-colors duration-100 ${
                  i === selectedIndex ? "bg-icon-bg" : "bg-transparent hover:bg-icon-bg"
                }`}
                style={{ padding: "12px 16px", fontFamily: "inherit" }}
              >
                <Badge
                  variant="secondary"
                  className={`rounded text-[10px] font-bold uppercase tracking-wider ${typeBadgeClasses[result.type] ?? ""}`}
                >
                  {typeLabels[result.type] || result.type}
                </Badge>
                <div className="flex-1 min-w-0">
                  <div className="text-navy text-[14px] truncate" style={{ fontWeight: 700 }}>
                    {result.title}
                  </div>
                  <div className="text-navy opacity-40 text-[12px] truncate">
                    {result.subtitle}
                  </div>
                </div>
                {result.href.startsWith("http") && (
                  <AppIcon icon={ExternalLink} className="size-3.5 shrink-0 text-navy opacity-30" strokeWidth={2} aria-hidden="true" />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Empty state */}
        {query.trim() && results.length === 0 && (
          <div className="text-center py-10 text-navy opacity-30 text-[14px]" style={{ fontWeight: 600 }}>
            {lang === "de" ? "Keine Ergebnisse" : lang === "fr" ? "Aucun résultat" : lang === "pl" ? "Brak wyników" : "No results"}
          </div>
        )}

        {/* Hint */}
        {!query.trim() && (
          <div className="text-center py-8 text-navy opacity-25 text-[13px]" style={{ fontWeight: 500 }}>
            {lang === "de"
              ? "Referenzen, Kategorien und Produkte durchsuchen"
              : lang === "fr"
              ? "Rechercher dans les références, catégories et produits"
              : lang === "pl"
              ? "Szukaj referencji, kategorii i produktów"
              : "Search references, categories and products"}
          </div>
        )}
      </div>
    </div>
  );
}
