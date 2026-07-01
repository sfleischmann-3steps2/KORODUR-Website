"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import type { Referenz } from "@/data/types";
import { withBasePath } from "@/lib/basePath";
import { useLocale } from "@/lib/LocaleContext";
import { Button } from "@/components/ui/button";
import { AppIcon } from "@/components/ui/icon";

interface ProduktInfo {
  name: string;
  kurzbeschreibung: string;
  besonderheiten: string[];
  verarbeitung?: { besonderheiten?: string };
}

interface ReferenzPdfProps {
  referenz: Referenz;
  produkt: ProduktInfo | undefined;
  size?: "default" | "sm";
}

export default function ReferenzPdf({ referenz, produkt, size = "default" }: ReferenzPdfProps) {
  const { dict } = useLocale();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const { generateReferenzPdf } = await import("@/lib/pdf");
      const bildUrl = withBasePath(referenz.bild);
      await generateReferenzPdf(referenz, produkt, bildUrl, dict.pdf);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button onClick={handleClick} disabled={loading} variant="outline" size={size}>
      <AppIcon icon={Download} width={16} height={16} strokeWidth={2} aria-hidden="true" />
      {loading ? dict.pdf.button_loading : dict.pdf.button}
    </Button>
  );
}
