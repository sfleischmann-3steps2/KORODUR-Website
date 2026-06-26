// Zentrale Layout-Breiten (#342). Bewusst nur ZWEI Werte, damit die Seite ruhig
// wirkt und nicht driftet:
//   SHELL    = Seiten-/Container-Breite, ueberall gleich (Nav, Grids, Hubs,
//              Artikel-Rahmen, Footer). Das ist die "wie breit ist die Seite"-Groesse.
//   LESEMASS = Fliesstext-Lesespalte (Zeilenlaenge ~80 Zeichen bei 18px). Das ist
//              KEINE Seitenbreite, sondern das Typografie-Lesemass fuer Artikel-Prosa.
//
// Frueher gab es zusaetzlich einen Zwischenwert 1100 am Artikel-Rahmen -> drei
// gefuehlte Breiten, "unruhig". Aufgeloest: Artikel-Rahmen laeuft jetzt auf SHELL,
// nur die Prosa bleibt auf LESEMASS.
export const SHELL_MAXWIDTH = 1320;
export const LESEMASS_MAXWIDTH = 760;
