// Batch-Optimierung der Referenzbilder (Launch-Plan M2, Performance-Paket).
// Bei NEUEN Bildern unter public/images/referenzen/ einmal laufen lassen:
//   node scripts/optimize-referenz-bilder.mjs
// Macht zwei Dinge:
//   1. Vollbilder auf max. 1600 px Kante begrenzen und als mozjpeg q72
//      re-encoden (nur wenn >1600 px oder >250 KB — idempotent genug,
//      bereits optimierte Dateien werden nicht erneut verschlechtert).
//   2. Für JEDES Bild ein 640-px-Thumb (<name>.thumb.jpg, q70) erzeugen —
//      genutzt von ReferenceCard und ImageGallery-Grid (lib/images.ts).
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const root = "public/images/referenzen";
const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (/\.jpe?g$/i.test(f) && !/\.thumb\.jpg$/i.test(f)) files.push(p);
  }
})(root);

let optimiert = 0;
let thumbs = 0;
let gespart = 0;

for (const p of files) {
  const before = fs.statSync(p).size;
  const meta = await sharp(p).metadata();

  if ((meta.width ?? 0) > 1600 || (meta.height ?? 0) > 1600 || before > 250 * 1024) {
    const buf = await sharp(p)
      .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 72, mozjpeg: true })
      .toBuffer();
    if (buf.length < before) {
      fs.writeFileSync(p, buf);
      gespart += before - buf.length;
      optimiert++;
    }
  }

  const tp = p.replace(/\.jpe?g$/i, ".thumb.jpg");
  await sharp(p)
    .resize(640, 640, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 70, mozjpeg: true })
    .toFile(tp);
  thumbs++;
}

console.log(
  `Bilder: ${files.length} · optimiert: ${optimiert} · Thumbs: ${thumbs} · gespart: ${(gespart / 1048576).toFixed(1)} MB`
);
