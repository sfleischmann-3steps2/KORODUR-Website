"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import { useLocale } from "@/lib/LocaleContext";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const { lang } = useLocale();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (!images || images.length === 0) return null;

  const closeLabel =
    lang === "de" ? "Schließen" : lang === "fr" ? "Fermer" : lang === "pl" ? "Zamknij" : "Close";
  const prevLabel =
    lang === "de"
      ? "Vorheriges Bild"
      : lang === "fr"
      ? "Image précédente"
      : lang === "pl"
      ? "Poprzednie zdjęcie"
      : "Previous image";
  const nextLabel =
    lang === "de"
      ? "Nächstes Bild"
      : lang === "fr"
      ? "Image suivante"
      : lang === "pl"
      ? "Następne zdjęcie"
      : "Next image";

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setSelectedIndex(i)}
            className="relative overflow-hidden cursor-pointer group"
            style={{ borderRadius: 10, aspectRatio: "4/3", border: "none", padding: 0, background: "var(--icon-bg)" }}
          >
            <Image
              src={withBasePath(src)}
              alt={`${alt} – Bild ${i + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog
        open={selectedIndex !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedIndex(null);
        }}
      >
        <DialogContent
          closeLabel={closeLabel}
          aria-describedby={undefined}
          overlayClassName="bg-black/85"
          className="w-[95vw] max-w-5xl gap-2 border-none bg-transparent p-0 text-white shadow-none"
        >
          <DialogTitle className="sr-only">{alt}</DialogTitle>
          <Carousel
            setApi={setApi}
            opts={{ startIndex: selectedIndex ?? 0, loop: true }}
            className="w-full"
          >
            <CarouselContent>
              {images.map((src, i) => (
                <CarouselItem key={src} className="flex items-center justify-center">
                  <Image
                    src={withBasePath(src)}
                    alt={`${alt} – Bild ${i + 1}`}
                    width={1600}
                    height={1200}
                    sizes="95vw"
                    className="h-auto w-auto max-h-[80vh] max-w-full rounded-lg object-contain"
                    priority={i === selectedIndex}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious label={prevLabel} className="left-2 size-11" />
            <CarouselNext label={nextLabel} className="right-2 size-11" />
          </Carousel>

          {/* Counter */}
          <div className="text-center text-sm font-semibold text-white/70">
            {current + 1} / {images.length}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
