"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { AppIcon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  baueSuchindex,
  filtereSuchindex,
  type SuchEintrag,
} from "@/lib/suchindex";
import type { Dictionary } from "../app/[lang]/dictionaries";

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
  const router = useRouter();

  useEffect(() => {
    if (open) setQuery("");
  }, [open]);

  const allItems = useMemo(() => baueSuchindex(lang, dict), [lang, dict]);
  const results = useMemo(
    () => filtereSuchindex(allItems, query),
    [query, allItems]
  );

  const navigateTo = (result: SuchEintrag) => {
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

  const placeholder =
    lang === "de" ? "Suchen..." : lang === "fr" ? "Rechercher..." : lang === "pl" ? "Szukaj..." : "Search...";
  const hint =
    lang === "de"
      ? "Referenzen, Kategorien und Produkte durchsuchen"
      : lang === "fr"
      ? "Rechercher dans les références, catégories et produits"
      : lang === "pl"
      ? "Szukaj referencji, kategorii i produktów"
      : "Search references, categories and products";
  const emptyText =
    lang === "de" ? "Keine Ergebnisse" : lang === "fr" ? "Aucun résultat" : lang === "pl" ? "Brak wyników" : "No results";

  return (
    <CommandDialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
      title={placeholder}
      description={hint}
      shouldFilter={false}
      showCloseButton={false}
      className="top-[min(20vh,160px)] translate-y-0 sm:max-w-[600px] rounded-2xl border-none shadow-2xl [&_[data-slot=command-input-wrapper]]:border-bullet-bg [&_[data-slot=command-input-wrapper]]:px-5 [&_[data-slot=command-input-wrapper]>svg]:text-cyan [&_[data-slot=command-input-wrapper]>svg]:opacity-100"
    >
      <div className="relative">
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder={placeholder}
          className="text-[16px] text-navy placeholder:text-navy placeholder:opacity-30 sm:pr-14"
          style={{ fontFamily: "inherit", fontWeight: 600 }}
        />
        <kbd
          className="hidden sm:inline-flex absolute right-4 top-1/2 -translate-y-1/2 items-center text-[11px] text-navy opacity-30 px-2 py-0.5 rounded border border-bullet-bg"
          style={{ fontWeight: 600 }}
        >
          ESC
        </kbd>
      </div>

      <CommandList className="max-h-[400px] p-2">
        {/* Empty state — nur bei aktiver Suche, sonst Hinweistext */}
        {query.trim() ? (
          <CommandEmpty className="py-10 text-center text-navy opacity-30 text-[14px] font-semibold">
            {emptyText}
          </CommandEmpty>
        ) : (
          <div className="text-center py-8 text-navy opacity-25 text-[13px]" style={{ fontWeight: 500 }}>
            {hint}
          </div>
        )}

        {results.map((result, i) => (
          <CommandItem
            key={`${result.type}-${result.title}-${i}`}
            value={`${result.type}-${result.href}-${i}`}
            onSelect={() => navigateTo(result)}
            className="flex items-center gap-3 rounded-xl cursor-pointer px-4 py-3 data-[selected=true]:bg-icon-bg"
            style={{ fontFamily: "inherit" }}
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
          </CommandItem>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
