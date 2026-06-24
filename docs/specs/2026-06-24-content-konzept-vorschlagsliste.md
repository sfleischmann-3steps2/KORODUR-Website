<!-- Generiert 2026-06-24 via Multi-Agent-Workflow (10 Cluster-Agenten + Vollständigkeits-Kritik + Synthese).
     Produkt-IDs gegen data/produkte.ts (70) und Referenz-Slugs gegen data/referenzen.ts (132) deterministisch validiert.
     Status: Vorschlag für Kollegen-Challenge (Steffi). Noch KEINE Issues erstellt. -->

# Content-Konzept neue korodur.de — Kuratierte Content-Liste je Bereich

## 1. Kurzueberblick

Wir schlagen rund 60 Content-Pieces ueber 7 Bereiche plus eine Branchen-Strecke vor, aufgeteilt in **Ratgeber-Artikel** (Such-/Funnel-Content) und **Bereichsseiten-Absaetze** (direkt auf den Bereichsseiten). Logik: jeder Ratgeber bedient eine eigene Suchintention und ist mit 2-3 echten Produkten und 2-3 echten Referenzen belegt, jeder Bereichsabsatz ordnet die Produktgruppen vor dem Detailcontent ein. Bestand: 24 Repo-Entwuerfe (MDX) sind teils fertig strukturiert, brauchen aber Referenz-/Produkt-Pflege im Frontmatter und Frank-Freigaben; der groessere Teil der Luecken (Verguss, Trinkwasser, Pflaster, Fugen, Nachhaltigkeit) ist noch zu bauen und muss aus der Bestandswebsite gehoben werden. Wichtig: Die Cluster `neubau-strecke` und `wirtschaftlichkeit-betreiber` sind **IA-Sichten auf denselben Artikelpool**, kein zweites Content-Set — in den Tabellen einmal als Quelle gefuehrt, sonst nur verlinkt.

---

## 2. Content-Pieces je Bereich

### Industrieboden (Kerngeschaeft)

| Titel | Typ | Status | Prio | Produkte | Referenzen | Zweck |
|---|---|---|---|---|---|---|
| Bereichseinstieg Industrieboden: Hartstoff-Kompetenz seit 1936 | Bereichsabsatz | erweitern | hoch | neodur-he-65, neodur-he-3, korodur-fscem | amazon-logistikzentrum-bad-hersfeld, borbet-leichtmetallradproduktion-kodersdorf, wirtgen-produktionshallen-weltweit | Bereichs-Intro, positioniert Kerngeschaeft, rahmt Neubau + Sanierung |
| Bauweisen im Ueberblick: Einstreuung, Schicht, Schnellestrich, selbstverlaufend | Bereichsabsatz | neu | hoch | neodur-he-3, neodur-he-65, neodur-he-60-rapid | — | Orientierung zwischen Produktliste und Tiefen-Artikel |
| Neubau oder Sanierung? Zwei Wege in den Industrieboden | Bereichsabsatz | neu | mittel | neodur-he-60-rapid, korodur-hb-5-rapid, korocrete | antolin-wochenend-sanierung, kleemann-produktionshalle, wirtgen-produktionshallen-weltweit | Verzweigung in die Sub-Seiten, Schnellsanierung als USP |
| Industrieboden im Neubau: das passende System waehlen | Ratgeber | vorhanden-entwurf | hoch | neodur-he-3, neodur-he-65, korodur-fscem | amazon-logistikzentrum-bad-hersfeld, borbet-leichtmetallradproduktion-kodersdorf, obi-baumaerkte | Orientierungs-Pillar Neubau-Systemwahl |
| Hartstoffeinstreuung oder Hartstoffschicht? Der technische Vergleich | Ratgeber | vorhanden-entwurf | hoch | neodur-he-3, neodur-he-65, korodur-diamantbeton | amazon-logistikzentrum-bad-hersfeld, borbet-leichtmetallradproduktion-kodersdorf, wirtgen-produktionshallen-weltweit | Entscheidungs-Cluster zentrale Bauweisen-Frage |
| Normen und Klassen: EN 13813, Boehme und DIN 18560-7 | Ratgeber | vorhanden-entwurf | hoch | neodur-he-65, korodur-wh-metallisch, korodur-diamantbeton | borbet-leichtmetallradproduktion-kodersdorf, caterpillar-abu-dhabi-dubai, wirtgen-produktionshallen-weltweit | Planer-Content, Featured-Snippet-Kandidat |
| So entsteht ein KORODUR Industrieboden: Verfahren und Ablauf | Ratgeber | vorhanden-entwurf | mittel | neodur-he-3, neodur-he-65, korocure | lidl-zentrallager-graben, zalando-bygodszcz-polen, ropa-montagezentrum-herrngiersdorf | Prozess-Transparenz Silosystem/Glaetten/Nachbehandlung |
| Oberflaechenschutz und Nachbehandlung richtig vergueten | Ratgeber | vorhanden-entwurf | mittel | korocure, koromineral-li, korodur-easyfinish | jura-werkstaetten-amberg, kunstdepot-muenchen, lkw-waschstrasse | Auswahllogik Curing vs. Verfestigung vs. Impraegnierung |
| Warum sich ein hochwertiger Industrieboden im Neubau rechnet | Ratgeber | vorhanden-entwurf | mittel | neodur-he-65, neodur-he-3-green, korodur-diamantbeton | amazon-logistikzentrum-bad-hersfeld, leica-firmenzentrale-wetzlar, obi-baumaerkte | TCO/Lebensdauer fuer Bauherren, CO2 als Zusatzhebel |
| Sichtboden und Designboden im Neubau | Ratgeber | erweitern | mittel | tru-self-leveling, granidur, kcf | porsche-showroom-loerrach, escada-muenchen, verwaltungsgebaeude-moedel-amberg | Dekorativer Zweig, seit #331 unter Industrieboden |
| Untergrund in der Bodensanierung: Arten, Pruefen, Vorbereiten (Pillar) | Ratgeber | luecke | hoch | korodur-hb-5, korodur-pc, korodur-uniprimer | guben-produktionshalle, sanierung-einer-sanierung, neodur-level-norderstedt | SEO-Pillar Untergrundvorbereitung, verteilt auf Cluster |
| Estricharten nach EN 13813 verstehen: CT, CA, MA, AS, SR | Ratgeber | luecke | mittel | korodur-fscem, korodur-fscem-screed, neodur-level | guben-produktionshalle, heidelberger-cement-ag-heidelberg, fertigstellen-eines-zementfussbodens-in-einem-bewohnten-appartment-gdynia-polen | SEO-Cluster Estricharten, Snippet-Tabelle |
| Untergrund pruefen: Haftzug, Druckfestigkeit, Restfeuchte messen | Ratgeber | luecke | mittel | korodur-hb-5, korodur-pc, korodur-txpk | sanierung-einer-sanierung, neodur-level-norderstedt, guben-produktionshalle | SEO-Cluster Pruefmethoden, CTA Beratung |
| Untergrund vorbereiten: Fraesen, Kugelstrahlen, Schleifen im Vergleich | Ratgeber | luecke | mittel | korodur-hb-5, korodur-hb-5-rapid, korodur-uniprimer | monheim-produktionsflaeche, loosen-werkzeug-klausen, guben-produktionshalle | SEO-Cluster Verfahrensvergleich, Rautiefe-Logik |
| Sperrzeit und Wiederinbetriebnahme: Wie lange steht meine Flaeche? | Ratgeber | vorhanden-entwurf | mittel | neodur-he-60-rapid, neodur-level, korocrete | antolin-wochenend-sanierung, wochenend-sanierung-werkstatt, guben-produktionshalle | Sanierung im laufenden Betrieb, Stillstandskosten |
| Haeufige Fragen zur Industriebodensanierung (Betreiber-FAQ) | Ratgeber | vorhanden-entwurf | niedrig | neodur-he-60-rapid, korodur-hb-5-rapid, neodur-level | antolin-wochenend-sanierung, guben-produktionshalle, sanierung-einer-sanierung | Mid-Funnel FAQ, FAQ-Schema-Kandidat |
| Bereichsseite Industrieboden: Wirtschaftlichkeits-Absatz | Bereichsabsatz | neu | mittel | neodur-he-65, neodur-he-3, neodur-he-60-rapid | wirtgen-produktionshallen-weltweit, hafen-catania | Entscheider-Hook Lebensdauer + Stillstand |
| Branchenloesungen im Ueberblick (Absatz + Sektor-Kacheln) | Bereichsabsatz | luecke | mittel | neodur-he-3, neodur-he-65, tru-self-leveling | — | Use-Case-Einstieg in die 7 Branchenseiten |

> **Hinweis:** Die Cluster-Sicht „Neubau-Strecke" fuehrt genau die hier gelisteten Neubau-Artikel als IA-Bündel — kein eigener Content. Auf der Sub-Seite `/bereiche/industrieboden/neubau` empfiehlt sich zusaetzlich ein **Bauweisen-Absatz** (neodur-he-3, neodur-he-65, tru-self-leveling) und ein **Heritage-Absatz** (neodur-he-65, neodur-he-3, korodur-diamantbeton; Refs airbus-a-380-hamburg-finkenwerder, caterpillar-abu-dhabi-dubai).

### Betonsanierung (rapid-set)

| Titel | Typ | Status | Prio | Produkte | Referenzen | Zweck |
|---|---|---|---|---|---|---|
| Sanierung uebers Wochenende: Boden im laufenden Betrieb instand setzen | Ratgeber | neu | hoch | rapid-set-cement-all, korocrete, korodur-hb-5-rapid | antolin-wochenend-sanierung, wochenend-sanierung-werkstatt, loosen-werkzeug-klausen | Staerkstes Rapid-Set-Differenzierungsmerkmal |
| Verkehrsflaechen instand setzen: Fahrbahn, Schacht, Pflaster ohne langen Stillstand | Ratgeber | neu | hoch | dot-europe-concrete-mix, rapid-set-mortar-mix, rapid-set-schnellbeton | strassensanierung-wien, schachtregulierung-fahrbahn-nittenau, pflastersteinsanierung-amberg | Referenzreichster Use-Case, ZTV-ING/Verkehrsfreigabe |
| Wie lange steht meine Flaeche? Sperrzeit (Rapid-Set-Sicht) | Ratgeber | vorhanden-entwurf | hoch | rapid-set-cement-all, dot-europe-concrete-mix, korocrete | antolin-wochenend-sanierung, strassensanierung-wien, dhl-ueberadebruecken | Sperrzeit als Entscheidungsgroesse, Rapid-Set-Werte |
| Wirtschaftlichkeit von Bodensanierung: Lebensdauer, Stillstand, CO2 | Ratgeber | vorhanden-entwurf | hoch | korocrete, dot-europe-concrete-mix, rapid-set-cement-all | monheim-produktionsflaeche, loosen-werkzeug-klausen, strassensanierung-wien | TCO statt Quadratmeterpreis |
| Betoninstandsetzung nach EN 1504: Prinzipien, R-Klassen, Methode | Ratgeber | luecke | mittel | dot-europe-concrete-mix, neodur-msm-5, neodur-msb-8 | fussgaengerbruecke-albbruck, theodor-heuss-bruecke, bruckensanierung-amberg | Norm-Content gegen Sika/MC, Pflicht-Tischset |
| Spritzmoertel und Spritzbeton: Reprofilierung Wand, Decke, Bauwerk | Ratgeber | neu | niedrig | neodur-msm-3, neodur-msm-5, neodur-msb-8 | treppenstufen-sanierung, fussgaengerbruecke-albbruck, bruckensanierung-amberg | Vertikal-/Ueber-Kopf-Instandsetzung, MSM/MSB sichtbar machen |
| Pflaster und Fugen barrierefrei und dauerhaft sanieren | Ratgeber | neu | niedrig | neodur-pfm-1k-easyfix, neodur-pfm-ze, rapid-set-mortar-mix | pflastersanierung-crailsheim, pflastersanierung-esslingen, absenksteine-tankstelle | Pflaster-Egalisierung/Fugen, DIN 18040 |
| Die mineralische Alternative zu Epoxidharz-Moertel | Bereichsabsatz | erweitern | mittel | rapid-set-cement-all, korodur-durop, korodur-robust | — | A1/kein Gefahrgut gegen Epoxid |
| Rapid Set Technologie: warum BCSA-Zement schneller und schwundneutral ist | Bereichsabsatz | erweitern | mittel | rapid-set-cement-all, rapid-set-concrete-pharmacy, dot-europe-concrete-mix | — | Technologie-Vertrauensanker, FAKTENCHECK-Werte freigeben |
| Welches Rapid-Set-Produkt fuer welche Schichtstaerke? | Bereichsabsatz | erweitern | mittel | rapid-set-cement-all, rapid-set-mortar-mix, rapid-set-concrete-mix | — | Auswahl-Tabelle Schichtstaerke × Produkt × Anwendung |
| Bereichsseite Betonsanierung: Absatz Stillstandskosten senken | Bereichsabsatz | neu | mittel | rapid-set-cement-all, asphalt-repair-mix, dot-europe-concrete-mix | dhl-ueberadebruecken, autohaus-versmold | Rapid-Versprechen in Betreiber-Nutzen uebersetzen |

> **Konsolidiert:** Der frueher separat gefuehrte Verguss-Artikel wandert in den Bereich Spezialmoertel (dort fuehrend). „Sanierung uebers Wochenende" und „Im laufenden Betrieb sanieren" sind **ein** Artikel.

### Infrastruktur

| Titel | Typ | Status | Prio | Produkte | Referenzen | Zweck |
|---|---|---|---|---|---|---|
| Verkehrsflaechen und Infrastruktur instand setzen (Hub) | Bereichsabsatz | erweitern | hoch | korocrete, rapid-set-schnellbeton, dot-europe-concrete-mix | fahrbahnsanierung-wien, lkw-umfahrt-darmstadt, theodor-heuss-bruecke | Zentraler Einstiegs-Hub des Clusters |
| Verkehrsfreigabe in Stunden: Sanieren ohne lange Sperrzeit | Ratgeber | neu | hoch | rapid-set-schnellbeton, korocrete, dot-europe-concrete-mix | fahrbahnsanierung-wien, lkw-umfahrt-darmstadt, strassensanierung-wien | Staerkster Conversion-Angle Infrastruktur |
| Frost und Tausalz: Verkehrsbeton dauerhaft schuetzen | Ratgeber | neu | hoch | dot-europe-concrete-mix, korocrete, koromineral-li | theodor-heuss-bruecke, hafen-catania, strassensanierung-wien | Kern-Lastfall Frost-Tausalz, XF-Expositionsklassen |
| Pflasterflaechen und Fugen instand setzen: barrierefrei und tragfaehig | Ratgeber | neu | mittel | rapid-set-mortar-mix, neodur-pfm-1k-easyfix, neodur-pfm-ze | pflastersanierung-crailsheim, pflastersanierung-esslingen, hauptbahnhofsvorplatz-landau | Pflaster-Angle abseits Fahrbahnbeton |
| Schachtregulierung und punktuelle Reparatur unter Verkehr | Ratgeber | neu | mittel | rapid-set-mortar-mix, rapid-set-cement-all, korocrete | schachtregulierung-fahrbahn-nittenau, kanalsanierung-im-schlosspark-muenchen, treppensanierung-gehweg-esslingen | Kommunal-/Tiefbau-Use-Case |
| Asphalt schnell und dauerhaft reparieren | Ratgeber | neu | mittel | asphalt-repair-mix, korophalt-02, dot-europe-concrete-mix | autohaus-versmold, oelie-saur-saint, gefaellesanierung-tankstelle-schneeberg | Asphalt-Angle, Abgrenzung Kaltasphalt |
| Bruecken instand setzen: Belag, Kappen und Uebergaenge | Ratgeber | neu | mittel | korodur-durop, korocrete, rapid-set-mortar-mix | theodor-heuss-bruecke, bruckensanierung-amberg, fussgaengerbruecke-albbruck | Ingenieurbau-Trust-Artikel (ZTV-ING) |
| KOROCRETE Schnellbeton: volumetrisch gemischt, in Stunden befahrbar | Bereichsabsatz | erweitern | mittel | korocrete, rapid-set-schnellbeton, koromineral-cure | lkw-umfahrt-darmstadt, monheim-produktionsflaeche, loosen-werkzeug-klausen | Leitprodukt-Vertiefung, Beweis Sperrzeit-Story |

> **Konsolidiert/Verschoben:** „Trinkwasserbehaelter sanieren DVGW-konform" und „Tankstellen/WHG-Verkehrsflaechen" werden **nicht** doppelt gefuehrt — Trinkwasser lebt im Bereich Microtop, Tankstelle in der Branchen-Strecke. Frost/Tausalz hat hier den Infrastruktur-Schwerpunkt, das Schadensbild verlinkt darauf.

### Microtop (TW-Behaeltersanierung)

| Titel | Typ | Status | Prio | Produkte | Referenzen | Zweck |
|---|---|---|---|---|---|---|
| Trinkwasserbehaelter sanieren mit dem MICROTOP TW System | Bereichsabsatz | erweitern | hoch | microtop-tw-5, microtop-tw-nsm, microtop-tw-bm | trinkwasserbehaelter-haidberg, trinkwasserbehaelter-bad-nauheim, hochbehaelter-krottenbach | System-Lead, DVGW statt Kunstharz/Edelstahl |
| DVGW-Konformitaet: Was W 270, W 300 und W 347 bedeuten | Bereichsabsatz | neu | hoch | microtop-tw-3, microtop-tw-5, microtop-tw-02 | trinkwasserbehaelter-haidberg, trinkwasserturm-budapest | Vertrauens-/Compliance-Block, zentrales Kaufargument |
| Trockenspritz oder Nassspritz? Das richtige Verfahren | Ratgeber | neu | hoch | microtop-tw-5, microtop-tw-nsm, microtop-tw-02 | trinkwasserbehaelter-haidberg, trinkwasserbehaelter-bad-nauheim, hochbehaelter-krottenbach | Kern-Entscheidungsfrage des Bereichs |
| Trinkwasserbehaelter sanieren: Ablauf von Untergrund bis Wiederinbetriebnahme | Ratgeber | neu | mittel | microtop-tw-vsm, microtop-tw-3, microtop-tw-bm | trinkwasserbehaelter-haidberg, trinkwasserspeicher-raecknitz-dresden, hochbehaelter-puchheim | Prozess-Ratgeber, KORODUR als System-Owner |
| Mineralische Behaelterbeschichtung vs. Kunstharz und Edelstahl | Ratgeber | luecke | mittel | microtop-tw-5, microtop-tw-bm, microtop-tw-mineral | trinkwasserbehaelter-haidberg, trinkwasserturm-budapest, trinkwasserspeicher-raecknitz-dresden | Staerkstes Positionierungs-Asset gegen Wettbewerb |
| Oberflaechenschutz und Verfestigung: TW BM und TW Mineral | Bereichsabsatz | neu | niedrig | microtop-tw-bm, microtop-tw-mineral | trinkwasserbehaelter-haidberg, hochbehaelter-krottenbach | Abgrenzung Beschichtung/Schutz gegen Spritzmoertel |

> **Entscheidung noetig:** Microtop ist die **eine Heimat** fuer Trinkwasser-Content. Der zuvor unter Infrastruktur vorgeschlagene DVGW-Artikel entfaellt zugunsten dieser Strecke, sonst Keyword-Kannibalisierung.

### Spezialmoertel

| Titel | Typ | Status | Prio | Produkte | Referenzen | Zweck |
|---|---|---|---|---|---|---|
| Spezialmoertel im Ueberblick: Verguss, Verankerung, Pflasterfugen aus dem Werk | Bereichsabsatz | erweitern | hoch | neodur-vm-1, neodur-pfm-1k-easyfix, neodur-msm-5 | — | Ordnender Einstieg fuer drei Use-Cases |
| Verguss richtig planen: Querschnitt, Festigkeitsklasse, Fruehbelastbarkeit | Ratgeber | neu | hoch | neodur-vm-1, neodur-vm-5, neodur-svm-03 | caterpillar-abu-dhabi-dubai, borbet-leichtmetallradproduktion-kodersdorf, ropa-montagezentrum-herrngiersdorf | Fuehrender Verguss-Ratgeber (KORODUR-Staerke, content-armer Markt) |
| Verguss- und Montagemoertel fuer Maschinenfundamente und Stahlbau | Bereichsabsatz | neu | hoch | neodur-vm-1, neodur-vm-5, neodur-svm-03 | — | Use-Case Maschinenfundament/Ankerverguss, Querschnitts-Logik |
| Gebundene Pflasterbauweise: Fugenmoertel richtig waehlen und einbauen | Ratgeber | neu | mittel | neodur-pfm-1k-easyfix, neodur-pfm-ze, rapid-set-mortar-mix | hauptbahnhofsvorplatz-landau, pflastersanierung-crailsheim, kopfsteinpflaster-lenningen | GaLaBau/Kommunen, gebundene vs. ungebundene Bauweise |
| Schnellverguss vs. Standardverguss: Wann sich schnelle Wiederinbetriebnahme lohnt | Ratgeber | neu | mittel | neodur-svm-03, neodur-svm-4, neodur-vm-1 | caterpillar-abu-dhabi-dubai, ropa-montagezentrum-herrngiersdorf | TCO/Sperrzeit fuer Verguss-Anwendung |
| Gebundene Pflasterdecke: Fugenmoertel fuer begeh- und befahrbare Flaechen | Bereichsabsatz | neu | mittel | neodur-pfm-1k-easyfix, neodur-pfm-ze | hauptbahnhofsvorplatz-landau | Use-Case gebundene Bauweise nach ZTV/M FG |
| Halbstarre Deckschichten: KOROPHALT als Verfuellmoertel | Ratgeber | neu | niedrig | korophalt-02, neodur-vm-1 | autohaus-versmold, oelie-saur-saint | Nischenthema halbstarre Bauweise |

> **Konsolidiert:** Verguss war vierfach gestreut (Betonsanierung, zwei Spezialmoertel-Pieces, Schnellverguss). Wir fuehren **einen** Verguss-Ratgeber + **einen** Bereichsabsatz fuehrend hier; „Schnellverguss vs. Standard" bleibt als vertiefender Zweit-Artikel optional. Pflaster ist clusteruebergreifend (Infrastruktur/Spezialmoertel/Branchen) — eine fuehrende Pflaster-Seite empfohlen, Rest verlinkt (siehe Luecken).

### Katzenstreu

| Titel | Typ | Status | Prio | Produkte | Referenzen | Zweck |
|---|---|---|---|---|---|---|
| Private-Label Katzenstreu von KORODUR | Bereichsabsatz | neu | hoch | goodcat-golden-nature, goodcat-silver-classic, goodcat-organic-love | — | Einstiegsabsatz, mineralischer Hersteller-Brueckenschlag |
| Sortiment: Premium und Standard im Ueberblick | Bereichsabsatz | neu | hoch | goodcat-golden-nature, goodcat-organic-love, goodcat-silver-classic | — | Produktvergleich entlang Geruchsbindung/Material |
| Private-Label: Ihre Marke, unsere Produktion | Bereichsabsatz | neu | mittel | goodcat-silver-classic, goodcat-golden-nature | — | B2B-Angle Handelsmarken, echte Zielgruppe |
| Bentonit oder Pflanzenfaser? Materialien im Vergleich | Ratgeber | luecke | niedrig | goodcat-golden-nature, goodcat-organic-love, goodcat-silver-classic | — (keine Refs in REF) | Nur bauen, wenn Endkunden-SEO strategisch gewollt |

> **Achtung Pflicht-Regel:** Fuer Katzenstreu existieren **keine** Referenz-Slugs in REF. Der Ratgeber kann die 2-3-Referenzen-Pflicht nicht erfuellen — daher `luecke`/niedrig. Wenn kein Endkunden-SEO gewollt ist, bleibt der Bereich bei den drei Bereichsabsaetzen.

### Schadensbilder (Problem-First-Strang, quer zu Industrieboden/Sanierung)

| Titel | Typ | Status | Prio | Produkte | Referenzen | Zweck |
|---|---|---|---|---|---|---|
| Boden defekt? Erkennen Sie Ihr Schadensbild (Hub) | Ratgeber | erweitern | hoch | neodur-he-65, neodur-he-60-rapid, rapid-set-mortar-mix | lkw-waschstrasse, helipad-sanierung-polen, kleemann-produktionshalle | Problem-First-Einstieg, verteilt auf 5 Schadensbild-Artikel |
| Risse im Industrieboden: erkennen, einordnen, sanieren | Ratgeber | erweitern | hoch | neodur-he-65-plus, neodur-he-60-rapid, korocrete | helipad-sanierung-polen, kleemann-produktionshalle, monheim-produktionsflaeche | Haeufigstes sichtbares Schadensbild |
| Abrieb und Verschleiss: Spurrillen und abgetragene Oberflaechen | Ratgeber | erweitern | hoch | neodur-he-65, neodur-he-60-rapid, rapid-set-mortar-mix-dur | kleemann-produktionshalle, weag-entsorgungsbetrieb, strandkorbhalle-sylt | DIN-1100-Verschleiss zur Hartstoff-Auswahl |
| Chemischer Angriff: Oele, Treibstoffe, Saeuren | Ratgeber | erweitern | hoch | neodur-he-65-plus, koromineral-li, rapid-set-cement-all | texaco-tankflache-arnheim, klaranlage-nako, fraport-frankfurt | Trennt penetrierende Medien vs. flaechige Saeuren |
| Feuchte und WHG-Flaechen: Nassbereich, Auffang, Gefahrgut | Ratgeber | erweitern | mittel | neodur-he-65-plus, koromineral-li, neodur-vm-basic | lkw-waschstrasse, fraport-frankfurt, naturex-burgdorf | WHG (AwSV) sauber von Trinkwasser (DVGW) abgrenzen |
| Absandung und Festigkeitsverlust: wenn der Boden staubt | Ratgeber | erweitern | mittel | koromineral-li, koromineral-cure, neodur-he-40 | hafen-catania, lkw-waschstrasse, wirtgen-produktionshallen-weltweit | Silikatisierung vs. neue Verschleissschicht |
| Frost- und Tausalzschaeden: Abplatzungen, Kantenausbrueche | Ratgeber | luecke | mittel | dot-europe-concrete-mix, rapid-set-mortar-mix, neodur-he-65-plus | fahrbahnsanierung-wien, strassensanierung-wien, treppenstufen-sanierung | Aussen-Schadensbild, bedient Tag frost-tausalz |
| Bereichsabsatz: Schadensbild-Einstieg auf Bereichsseite | Bereichsabsatz | neu | hoch | neodur-he-60-rapid, rapid-set-mortar-mix, korocrete | kleemann-produktionshalle, monheim-produktionsflaeche, weag-entsorgungsbetrieb | Problem-First-Bruecke zum Schadensbild-Hub |
| Bereichsabsatz: Schaden-zu-Belastung-Logik | Bereichsabsatz | neu | mittel | neodur-he-65, koromineral-li, rapid-set-mortar-mix-dur | lkw-waschstrasse, hafen-catania, strandkorbhalle-sylt | KORODUR-Methodik, Bruecke zum Loesungsfinder (von niedrig auf mittel angehoben) |

### Branchen-Strecke (Sektor-Landingpages, Achse „Use-Case")

| Titel | Typ | Status | Prio | Produkte | Referenzen | Zweck |
|---|---|---|---|---|---|---|
| Industrieboeden fuer Lager und Logistik | Ratgeber | vorhanden-entwurf | hoch | neodur-he-3, neodur-he-65, rapid-set-mortar-mix-dur | amazon-logistikzentrum-bad-hersfeld, strandkorbhalle-sylt, dhl-ueberadebruecken | Sektor-LP, HE-3-Einstreuung als Neubau-Default ergaenzen |
| Industrieboeden fuer Industrie und Produktion | Ratgeber | vorhanden-entwurf | hoch | neodur-he-65, neodur-he-60-rapid, korocrete | borbet-leichtmetallradproduktion-kodersdorf, wirtgen-produktionshallen-weltweit, loosen-werkzeug-klausen | Schwerlast/Schichtbetrieb, Neubau + Sanierung |
| Verkehrsflaechen und Infrastruktur instand setzen | Ratgeber | vorhanden-entwurf | hoch | dot-europe-concrete-mix, rapid-set-mortar-mix, asphalt-repair-mix | fahrbahnsanierung-wien, schachtregulierung-fahrbahn-nittenau, bruckensanierung-amberg | Sektor-Hub Verkehr (groesster Referenz-Pool) |
| Boeden fuer die Lebensmittelindustrie | Ratgeber | erweitern | hoch | tru-pc, neodur-he-60-rapid, koromineral-cure | sanierung-futtertisch-milchhof-beeskow, kuechenbodensanierung-leinfelden, baeckerei-konditorei-schmidtmeier-bochum | HACCP/Nassreinigung, Trinkwasser-Ref ersetzen |
| Boeden fuer Parkdecks und Parkflaechen | Ratgeber | vorhanden-entwurf | mittel | korodur-durop, neodur-he-65-plus, rapid-set-cement-all | parkhaus-flughafen-zuerich, barmenia-parkhaus-wuppertal, parkplatzsanierung-metzingen | Tausalz/Frost-Tau, DUROP als Leitprodukt |
| Boeden fuer Verkaufsraeume und Fachmaerkte | Ratgeber | vorhanden-entwurf | mittel | tru-self-leveling, granidur, neodur-he-65 | balenciaga-flagship-store-miami-usa, porsche-showroom-loerrach, decathlon-dortmund | Zwei Welten: Designboden vs. Nutzschicht |
| Boeden fuer Hangars und Flugbetriebsflaechen | Ratgeber | vorhanden-entwurf | mittel | neodur-he-65-plus, neodur-he-65, rapid-set-cement-all | airbus-a-380-hamburg-finkenwerder, helipad-sanierung-polen, hubschrauber-landeplatz-finnland | Hangar innen + Frost/Tausalz aussen |
| Boeden fuer Brauereien und Getraenkebetriebe | Ratgeber | neu | mittel | tru-pc, dot-europe-concrete-mix, neodur-he-60-rapid | brauerei-bernard-humpolec-tschechien, naturex-burgdorf, suntago-village-swinice-polen | Eigener Sektor, entlastet Lebensmittel-Seite |
| Boeden fuer Tankstellen und Treibstoffflaechen | Ratgeber | neu | mittel | dot-europe-concrete-mix, rapid-set-mortar-mix, neodur-he-65-plus | texaco-tankflache-arnheim, gefaellesanierung-tankstelle-schneeberg, absenksteine-tankstelle | Treibstoff/WHG/Gefaelle, verbindet mit Schadensbild Chemie |

> **Konsolidiert:** „Tankstellen/Treibstoff" lebt hier (nicht doppelt in Infrastruktur). Die separaten Brücken- und Pflaster-Fokus-Artikel unter Branchen sind redundant zu den Infrastruktur-Ratgebern — wir fuehren Bruecke/Pflaster fuehrend in Infrastruktur und verlinken aus der Verkehr-Branchenseite.

---

## 3. Luecken (priorisiert)

**Hoch:**
- **Pflaster als eine fuehrende Tiefen-Seite** statt dreifach flach (Infrastruktur + Spezialmoertel + Branchen). Prods: neodur-pfm-1k-easyfix, neodur-pfm-ze. Refs: hauptbahnhofsvorplatz-landau, pflastersanierung-crailsheim, pflastersanierung-esslingen.
- **Verguss-Ratgeber** (heute kein Artikel, kein eigener Bereichsabschnitt, content-armer Markt, KORODUR-Staerke). Prods: neodur-vm-1, neodur-vm-5, neodur-svm-03. Refs als Kontext: caterpillar-abu-dhabi-dubai, ropa-montagezentrum-herrngiersdorf — echte Vergussprojekte vom Vertrieb nachziehen.
- **Branchen-Hub als Dach** auf hoch heben — traegt die gesamte Sektorlogik, sonst verwaiste Branchenseiten.

**Mittel:**
- **Duenn-/Estrich-Sanierung** als eigener Ratgeber (NEODUR Level/Level AU/Rapid Set LevelFlor) — referenzstark, bisher nirgends. Prods: neodur-level, neodur-level-au, korodur-pc. Refs: guben-produktionshalle, sanierung-einer-sanierung, neodur-level-norderstedt, fertigstellen-eines-zementfussbodens-in-einem-bewohnten-appartment-gdynia-polen.
- **Geschliffene/dekorative Sichtestriche** als Verfahrens-/Designthema inkl. KOROCLEAN-Schleifprozess. Prods: tru-self-leveling, granidur, kcf, koroclean. Refs: balenciaga-flagship-store-miami-usa, escada-muenchen, leica-firmenzentrale-wetzlar, truazzo-isabel-marant-store-wien-oesterreich.
- **Fugentechnik im Industrieboden** (Schein-/Bewegungs-/Sinus-/Trennfugen, Schnittzeitpunkt). Prods: rapid-set-mortar-mix, rapid-set-mortar-mix-dur, korodur-pc. Refs: sinusfugen-sanierung, trennfugen-bohnenkamp, fugensanierung-lyreco.
- **KOROCRETE/Schnellbeton-Verfahren** als eigenstaendiges Pillar (volumetrisch vor Ort gemischt). Prods: korocrete, rapid-set-schnellbeton, korodur-hb-5-rapid. Refs: monheim-produktionsflaeche, lkw-umfahrt-darmstadt, loosen-werkzeug-klausen.
- **Verkehrsbeton-Expositionsklassen** (XF, Luftporen, Abwitterung) als Norm-Tiefe unter dem Frost/Tausalz-Thema. Refs: fahrbahnsanierung-wien, strassensanierung-wien, kreisverkehr-goppingen.
- **Oberflaechenschutz aus der Sanierungs-Perspektive** (silikatische Verfestigung absandender Boeden) — bisher nur Neubau-Nachbehandlung. Prods: koromineral, koromineral-li, korotex.

**Strategisch (Z1/Z3/Z4), eigener Track:**
- **Nachhaltigkeit/CO2** als eigenes Marketing-Thema (HE 3 green ~30% reduziert, FSCem, mineralisch statt Epoxid) — bisher nur TCO-Unterpunkt. Prods: neodur-he-3-green, korodur-fscem, koromineral.
- **Internationalisierung/Export** (Normen-Mapping DIN 1100 / EN 13813 vs. ACI). Refs: caterpillar-abu-dhabi-dubai, logistikzentrum-daimler-guangzhou-china, amazon-logistikzentrum-wroclaw-polen.
- **Planer-/Ausschreibungs-Content** (LV-Texte, Spec-in-Phase) — B2B-Pflichtthema, Anknuepfung an ausschreiben.de-Katalog.

---

## 4. Quellen-Hinweis je Cluster

| Cluster | Aus Repo-Entwuerfen | Aus Bestandswebsite zu heben | Wettbewerber-Input (Quelle 3) |
|---|---|---|---|
| **Industrieboden** | 9 MDX-Entwuerfe (Systemwahl, Einstreuung-vs-Schicht, Normen, Ablauf, Nachbehandlung, Wirtschaftlichkeit, Sichtboden, Sperrzeit, FAQ) — Refs/Prods im Frontmatter nachtragen, Frank-Freigaben | Untergrund-Pillar + Cluster (Pruefen, Vorbereiten), Estricharten — komplett neu aus Bestandswebsite (Briefing liegt vor) | Cluster 4 (Normen/Hartstoff): groesste Themenfuehrer-Chance, Wettbewerb prueft Content-Tiefe |
| **Betonsanierung** | Sperrzeit, TCO, Epoxid-Block, Technologie-Block, Auswahl-Tabelle (rapidSetContent.ts) — FAKTENCHECK-Werte vor Live freigeben | EN-1504-Norm-Content, Wochenend-Story-Ablauf | EN 1504 ist Pflicht-Tischset gegen Sika/MC — Wettbewerbs-Tiefe pruefen |
| **Infrastruktur** | Hub-Entwurf (verkehr-infrastruktur.mdx) — offene Kennwert-Luecken | Frost/Tausalz, Asphalt, Bruecke, Schacht, Pflaster, KOROCRETE-Kennwerte (volumetrisch, belastbarNach) | ZTV-ING/Verkehrsfreigabe — Wettbewerb fuer Norm-Framing |
| **Microtop** | extraktion-microtop.json, LP microtop-tw (docs/website-migration) | DVGW-Texte (W 270/300/347), Systemvergleichstabelle mineralisch/Epoxid/Edelstahl (bewusst noch nicht gehoben) | Edelstahl-/Epoxid-Anbieter fuer Positionierungsvergleich |
| **Spezialmoertel** | duenner Intro-Teaser | Verguss-Querschnittslogik, Pflaster-Verarbeitung, KOROPHALT — Rohcontent + TDS heben; echte Vergussprojekte fehlen ganz | Pagel (Verguss) als einziger ernsthafter Content-Player — hier differenzieren |
| **Katzenstreu** | Variante-B-Mockup, Produktdaten | Private-Label-Detailtiefe (Mindestmengen, Verpackung), Material-/Geruchs-Argumente | Endkunden-SEO nur falls strategisch gewollt |
| **Schadensbilder** | 6 MDX-Entwuerfe (index, risse, abrieb, chemie, feuchte-whg, absandung) — Refs ins Frontmatter, Frank-TODOs zu Diagnose-Schwellen | Riss-Typologie, Medienbestaendigkeit/pH-Grenzen, AwSV/TRwS/abP-Normbezug, WHG-Zulassungsnummern | Riss-Typologie und Schadensbild-Diagnostik — Wettbewerb als Vergleich |
| **Branchen** | 7 MDX Sektor-LPs | Saeurebestaendigkeit/Reinigungsregime (Lebensmittel), Treibstoff/WHG-Aussagen (Tankstelle) | je Sektor Wettbewerbs-Landingpages |

---

## 5. Top-10 zum Sofort-Start

1. **Hartstoffeinstreuung oder Hartstoffschicht? Der technische Vergleich** (Industrieboden, Ratgeber) — Entwurf steht, starker Vertriebsangle, echte Neubau-Refs jetzt vorhanden. Prods: neodur-he-3, neodur-he-65, korodur-diamantbeton.
2. **Normen und Klassen: EN 13813, Boehme, DIN 18560-7** (Industrieboden, Ratgeber) — groesste Themenfuehrer-Chance, Featured-Snippet, Entwurf steht. Prods: neodur-he-65, korodur-wh-metallisch, korodur-diamantbeton.
3. **Trockenspritz oder Nassspritz? Das richtige Verfahren** (Microtop, Ratgeber) — Kern-Entscheidungsfrage, saubere Referenzdeckung (Haidberg/Bad Nauheim/Krottenbach).
4. **Trinkwasserbehaelter sanieren mit dem MICROTOP TW System** (Microtop, Bereichsabsatz) — Pflicht-Lead vor allem Detailcontent, DVGW-Positionierung.
5. **Verkehrsfreigabe in Stunden: Sanieren ohne lange Sperrzeit** (Infrastruktur, Ratgeber) — staerkster Conversion-Angle, echte Aussen-Verkehrsrefs. Prods: rapid-set-schnellbeton, korocrete, dot-europe-concrete-mix.
6. **Sanierung uebers Wochenende: im laufenden Betrieb instand setzen** (Betonsanierung, Ratgeber) — staerkstes KORODUR-Differenzierungsmerkmal, mehrere starke Refs.
7. **Boden defekt? Erkennen Sie Ihr Schadensbild (Hub)** + **Abrieb und Verschleiss** (Schadensbilder) — Problem-First-Einstieg, Abrieb ist das beste Produkt-Referenz-Match im Cluster und nah an Freigabe.
8. **Verguss richtig planen** (Spezialmoertel, Ratgeber) — content-armer Markt, klare KORODUR-Staerke, hoher Hebel; echte Vergussprojekte parallel vom Vertrieb beschaffen.
9. **Bereichseinstieg Industrieboden + Bauweisen-Absatz** (Industrieboden, Bereichsabsaetze) — Kerngeschaeft hat bisher nur Dictionary-Teaser; Rapid Set ist die Blaupause, Industrieboden muss nachziehen.
10. **Private-Label Katzenstreu + Sortiment** (Katzenstreu, Bereichsabsaetze) — Bereich wirkt sonst leer; aus Produktdaten direkt ableitbar, niedriger Aufwand.

**Logik der Auswahl:** Wir starten mit (a) fast fertigen Repo-Entwuerfen mit hohem Sales-Wert (1, 2, 6, 7), (b) Pflicht-Leads fuer Bereiche, die sonst leer wirken (4, 9, 10), und (c) den staerksten Conversion-/Differenzierungs-Angeln, die zugleich content-arme Maerkte adressieren (3, 5, 8).