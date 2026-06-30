# Reconcile App-Referenzen ↔ WXR-Export

_Erzeugt 2026-06-30 · App `data/referenzen.ts` (132) ↔ WXR-Extrakt `referenzen-wxr.json` (147 Gruppen / 410 Items, Harvest 2026-06-11)._

Matching-Schluessel (reconcileKey): normalisierter Slug (Umlaut-Transliteration, alnum-only) primaer; sekundaer Projektname/Titel + Ort-Token + Produkt-Fingerabdruck. 120 Auto-/Fuzzy-Treffer manuell gegen die ACF-Tabelle verifiziert (7 Overrides ergaenzt, 1 Kollision `strassensanierung-wien`/`fahrbahnsanierung-wien` aufgeloest).

## Zusammenfassung

| Kategorie | Anzahl |
|---|---|
| (1) In BEIDEN (App ∩ Export) | **120** |
| (2) Nur im Export — DB-Erweiterungskandidaten | **27** (davon 12 echte neue Refs + 15 Sprach-Twins) |
| (3) Nur in der App | **12** |
| (4) Export REICHER (Felder fehlen in App) | verarbeiter 73 · bauherr/builder 69 · client 8 · architekt 5 · dimension 3 · **jahr 65 nachfuellbar** · flaeche 2 |

App-Modell (`data/types.ts`) hat **keine** Felder fuer `verarbeiter`, `bauherr`, `client`, `architekt`, `dimension`, `verleger` — fuer #380 Eckdaten-Block neu anzulegen. Achtung #380: ACF `ref_verleger` und `ref_renovierungsjahr` sind im GESAMTEN Export leer (0 Werte) — als Eckdaten-Feld nicht belegbar.

## (2a) Nur im Export — ECHTE neue Referenzen (DB-Erweiterungskandidaten)

| Export-Gruppe | Projekt | Ort | Land | Sprachabdeckung |
|---|---|---|---|---|
| `3d-gedrucktes-haus-in-paremoremo` | 3D-gedrucktes Haus in Paremoremo | Paremoremo | Neuseeland | voll-triple |
| `baufachhaendler-linnenbecker-aussenlager-bad-oeynhausen` | Baufachhändler Linnenbecker - Außenlager | Bad Oeynhausen | Deutschland | voll-triple |
| `betriebszufahrt-lackiererei-schmidt-versmold` | Betriebszufahrt Lackiererei Schmidt | Versmold | Deutschland | voll-triple |
| `farbiger-beton-fuer-feinbrennerei` | Farbiger Beton für Feinbrennerei | Schöppingen, Deutschla | Deutschland | voll-triple |
| `hochbehalter-racknitz` | Trinkwasserhochbehälter Räcknitz | Räcknitz, Stadtbezirk  | Deutschland | voll-triple |
| `lagerflaeche-strassenbau-dieckmann-versmold` | Lagerfläche Straßenbau Dieckmann | Versmold | Deutschland | voll-triple |
| `lkw-ausfahrt-wueseke-baustoffwerke-gmbh` | LKW Ausfahrt Wüseke Baustoffwerke GmbH | Sassenberg-Füchtorf | Deutschland | voll-triple |
| `produktionsstaette-fiorini` | Neue Produktionsstätte | Trecastelli (AN) | Italien | de+en |
| `sanierung-der-fugen-wurstttaegerbrunnen-versmold` | Wurstträgerbrunnen | Versmold | Deutschland | voll-triple |
| `sanierung-werksstrasse-bochum` | Sanierung Werksstraße | Bochum-Wattenscheid | Deutschland | voll-triple |
| `treppensanierung-check-up-6-jahre-spater` | Treppensanierung | Esslingen a. Neckar | Deutschland | voll-triple |
| `verfugung-von-natursteinplatten` | Das Weitblick Allgäu | Marktoberdorf | Deutschland | voll-triple |

Cluster-Hinweis: 4 Versmold-Refs (`betriebszufahrt-lackiererei-schmidt`, `lagerflaeche-strassenbau-dieckmann`, `sanierung-der-fugen-wursttraegerbrunnen`, plus gematchte). `hochbehalter-racknitz` ist ein ZWEITER Raecknitz-Eintrag neben dem bereits gematchten `sanierung-trinkwasserspeicher-racknitzhohe` — Dublette-oder-neu pruefen. `treppensanierung-check-up-6-jahre-spater` ist das Follow-up zur gematchten `treppensanierung-esslingen`. `sanierung-werksstrasse-bochum` ggf. == App `korodur-demo-bochum` (siehe (3)).

## (2b) Nur im Export — Sprach-Twins (KEINE neuen Refs, WPML-Join unvollstaendig)

Diese EN/FR-only-Gruppen sind die nicht-gejointe andere Sprachhaelfte einer bereits gematchten DE-Referenz. Fuer DB-Erweiterung IGNORIEREN; relevant nur als Uebersetzungsquelle.

| Export-Gruppe (Twin) | Sprache | = gleiche Ref wie App |
|---|---|---|
| `amazon-centre-logistique-bad-hersfeld` | fr | `amazon-logistikzentrum-bad-hersfeld` |
| `amazon-centres-logistiques-wroclaw-pologne` | fr | `amazon-logistikzentrum-wroclaw-polen` |
| `aunn-cafe-shanghai` | fr | `aunn-cafe-shanghai-china` |
| `balenciaga-magasin-phare-a-miami` | fr | `balenciaga-flagship-store-miami-usa` |
| `boulangerie-patisserie-schmidtmeier-bochum` | fr | `baeckerei-konditorei-schmidtmeier-bochum` |
| `brasserie-en-cz-centre-de-visiteurs` | fr | `brauerei-bernard-humpolec-tschechien` |
| `couloirs-souterrains-sncf-gare-de-bordeaux` | fr | `sncf-bordeaux` |
| `floor-renovation-between-the-holidays` | en,fr | `monheim-produktionsflaeche` |
| `joint-repair-with-rapid-set` | en,fr | `sinusfugen-sanierung` |
| `paves-accessibles-crailsheim` | fr | `pflastersanierung-crailsheim` |
| `refection-de-sols-industriels-a-couche-mince-guben` | fr | `guben-produktionshalle` |
| `revetement-durop-parking-souterrain-freiburg` | en,fr | `parkhaus-freiburger-munster-freiburg` |
| `salon-dexposition-bmw-krefeld` | fr | `bmw-austellungshalle-krefeld` |
| `sportano-retail-outlet` | en | `sportano-polen` |
| `weag-disposal-and-recycling-plant-koengen` | en,fr | `weag-entsorgungsbetrieb` |

## (3) Nur in der App (kein Export-Pendant)

| App-Slug | Titel | Ort | Begruendung |
|---|---|---|---|
| `fertigstellen-eines-zementfussbodens-in-einem-bewohnten-appartment-gdynia-polen` | Fertigstellung eines Zementfußbode | Gdynia | Gdynia/Polen — kein Export-Eintrag |
| `helipad-sanierung-polen` | Helipad Sanierung Polen | Płock | Plock/Polen — Export hat nur Mikkeli/Finnland (anderes Projekt) |
| `korodur-demo-bochum` | KORODUR Demo, Bochum-Wattenscheid  | Bochum-Wattenscheid | moeglicher Export-Twin `sanierung-werksstrasse-bochum` (Bochum-Wattenscheid) — Produkt weicht ab (Rapid Set CONCRETE MIX vs. Werksstrasse), unbestaetigt |
| `lkw-umfahrt-darmstadt` | LKW-Umfahrt Darmstadt | Darmstadt | kein Export-Eintrag (Darmstadt nicht im Export; Wueseke=Sassenberg ist anderes Projekt) |
| `lkw-waschstrasse` | LKW Waschstraße | Deutschland | kein Export-Eintrag (Algorithmus-Falschtreffer Neutraubling ausgeschlossen) |
| `neodur-level-norderstedt` | Wenn die erste Sanierung versagt | Norderstedt | 2026er-Pilot, post-dates Export-Harvest (2026-06-11) |
| `obstplantage-ibbenbueren` | Obstplantage Ibbenbüren | Ibbenbüren | kein Export-Eintrag (Ibbenbueren nicht im Export) |
| `parkhaus-flughafen-zuerich` | Parkhaus Flughafen Zürich | Zürich | kein Export-Eintrag (Zuerich nicht im Export) |
| `sanierung-einer-sanierung` | Sanierung einer Sanierung | Deutschland | generischer Ort; kein eindeutiger Twin (Guben ist bereits via guben-produktionshalle gematcht) |
| `sanierung-lkw-zufahrt-logistikzentrum-sankt` | Sanierung LKW-Zufahrt Logistikzent | Sankt Marienkirchen bei Schärding | Sankt Marienkirchen/AT — kein Export-Eintrag |
| `strassensanierung-wien` | Straßensanierung Wien | Wien | distinkte Wien-Strassensanierung; Export `fahrbahnsanierung-wien` ist bereits exakt gematcht (anderes Projekt) |
| `theodor-heuss-bruecke` | Theodor-Heuss-Brücke | Mainz / Wiesbaden | kein Export-Eintrag (Mainz/Wiesbaden nicht im Export) |

## (4) Export REICHER — Felddeltas je gematchter Referenz

Felder, die der Export liefert und die App (noch) nicht hat. `jahr<=` / `flaeche<=` = App-Feld leer, Export-Wert nachfuellbar. **Warnung:** `bauherr`/`client` enthalten Quell-Copy-Paste-Fehler (s. Validierung) — vor Import pruefen.

| App-Slug | → Export | verarbeiter | bauherr (builder) | weitere |
|---|---|---|---|---|
| `absenksteine-tankstelle` | `schnelle-verlegung-von-absenksteinen` |  |  | jahr<=2021 |
| `airbus-a-380-hamburg-finkenwerder` | `airbus-a-380-hamburg-finkenwerder` |  | Airbus Deutschland GmbH |  |
| `amazon-logistikzentrum-bad-hersfeld` | `amazon-logistikzentrum-bad-hersfeld` |  | Amazon EU S.a.r.l. |  |
| `amazon-logistikzentrum-wroclaw-polen` | `amazon-logistikzentrum-wroclaw-polen` | PPP Posadzki Przemyslowe Polska |  |  |
| `antolin-wochenend-sanierung` | `wochenendsanierung-antolin-werk-osterreich` |  | Antolin Ebergassing GmbH | jahr<=2018 |
| `artofchocolate-schwarzach-u-wertheim` | `artofchocolate` | Condulith - Deutsche Industriebode | Aczél GmbH – ARTofCHOCOLATE | jahr<=2010 |
| `aunn-cafe-shanghai-china` | `aunn-cafe-shanghai-china` | Shanghai Hong Qiao Century Enterpr |  |  |
| `autohaus-versmold` | `sanierung-von-asphaltschaeden-autohaus-versmold` | Bauunternehmung F + G Bau GmbH in  |  | jahr<=2024 |
| `balenciaga-flagship-store-miami-usa` | `balenciaga-flagship-store` |  |  | client=Balenciaga S. A., USA |
| `barmenia-parkhaus-wuppertal` | `parkhaus-barmenia-versicherungen-wuppertal` | M.+O. Zarges GmbH & Co. KG, Wupper | Barmenia Versicherungen, Wuppertal | jahr<=2015 |
| `betonwerk-lintel-rheda-wiedenbrueck` | `hochverschleissfeste-pflastersteine` | Betonwerk Lintel | Kraemer Baumaschinen | jahr<=2011 |
| `bmw-austellungshalle-krefeld` | `bmw-ausstellungshalle-krefeld` | Aslan Industrieboden GmbH | Auto Becker Klausmann |  |
| `bmw-logistikzentrum-wallersdorf` | `neubau-bmw-logistikzentrum-wallersdorf` | CBL Chemobau Industrieboden GmbH,  | Münchner DIBAG Industriebau AG, Mü |  |
| `bomag-shanghai-china` | `bomag-china` |  | BOMAG China Construction Machinery |  |
| `borbet-leichtmetallradproduktion-kodersdorf` | `neubau-borbet-leichtmetallradproduktion` |  | BORBET Sachsen GmbH, Hallenburg |  |
| `brauerei-bernard-humpolec-tschechien` | `brauerei-in-tschechien-besucherzentrum` | PROVAS Plzeň s.r.o. CZ | Brauerei Bernard | client=Brauerei Bernard; jahr<=2021 |
| `bruckensanierung-amberg` | `sanierung-nabburger-tor-brucke-amberg` | Mickan General-Bau-Gesellschaft Am | Stadt Amberg | jahr<=2012 |
| `burger-king-munster` | `schnelle-sanierung-im-schnell-restaurant` |  |  | jahr<=2021 |
| `caterpillar-abu-dhabi-dubai` | `caterpillar-abu-dhabi` |  | Mohamed Abdulrahman Al-Bahar | jahr<=2010 |
| `decathlon-dortmund` | `decathlon-fachmarkt-dortmund-aplerbeck` | Nieladur Industrieböden GmbH |  | jahr<=2023 |
| `dhl-ueberadebruecken` | `sanierung-dhl-uberladebrucken` |  |  | jahr<=2017 |
| `escada-muenchen` | `escada-headquarter-munchen` | Zebo Fussbodenbau GmbH | ESCADA Gruppe, München | jahr<=2008 |
| `fahrbahnsanierung-wien` | `fahrbahnsanierung-wien` | Mörtinger & Co GmbH, Wien |  | jahr<=2020 |
| `fazer-besucherzentrum-vantaa-finnland` | `fazer-besucherzentrum-finnland` | Neliskulma Oy, Finnland | Brauerei Bernard | client=Oy Karl Fazer AB, Finnla; architekt=Arkkitehtitoimisto K2S O |
| `fh-lichtschacht-nurnberg` | `sanierung-lichtschaft-nurnberg` |  | Georg-Simon-Ohm-Fachhochschule Nür | jahr<=2012 |
| `flughafen-zagreb` | `instandsetzung-flughafen-zagreb` | STRABAG Großprojekte GmbH, München |  |  |
| `fraport-frankfurt` | `sanierung-containerstellplatz-fraport-ag` | Wiedemann und Sohn GmbH, Wiesbaden | Fraport AG Frankfurt | jahr<=2012 |
| `fugensanierung-lyreco` | `fugensanierung-schweiz` | Weiss+Appetito AG, Bern / Synovate | Lyreco Switzerland AG | jahr<=2016 |
| `gefaellesanierung-tankstelle-schneeberg` | `gefallsanierung-an-zapfsaule-schneeberg` |  |  | jahr<=2016 |
| `guben-produktionshalle` | `bodensanierung-im-laufenden-betrieb` | Unger Bau GmbH, Guben | MEGAFLEX Schaumstoff GmbH, Guben | jahr<=2020 |
| `gut-lippesee-paderborn` | `gut-lippesee-paderborn` | Gorlo Industrieboden GmbH & Co. KG | Familie Hülsemann |  |
| `hafen-catania` | `sanierung-einer-zufahrt-am-faehrhafen-catania` | Deltapav | Hafen Catania | dimension=2.500; jahr<=2024 |
| `hauptbahnhofsvorplatz-landau` | `verfugung-hauptbahnhofsvorplatz-landau` | Grötz GmbH & Co. KG, Gaggenau | Stadt Landau / Pfalz |  |
| `heidelberger-cement-ag-heidelberg` | `konzernzentrale-heidelberg-cement-ag` | Günter Schlag GmbH, Mehring |  |  |
| `hochbehaelter-krottenbach` | `hochbehalter-krottenbach-nurnberg` | Rödl GmbH, Nürnberg | WFW Wasserversorgung Fränkischer W |  |
| `hochbehaelter-puchheim` | `hochbehalter-puchheim` | Fritz Wiedemann und Sohn GmbH, Wie | WVA Zweckverband zur Wasserversorg |  |
| `hora-zentrale-schloss-holte-stuckenbrock` | `hora-zentrale-schloss-holte-stukenbrock` | Fa. Gorlo Industrieboden GmbH & Co | HORA - Holter Regelarmaturen GmbH  | jahr<=2007 |
| `hornbach-baumarkt-bruenn-cz` | `hornbach-baumarkt-brunn-tschechien` | Largo Spol s.r.o., Vsetin, Tschech | Hornbach-Baumarkt-AG | jahr<=1999 |
| `hotel-puro-krakow-polen` | `hotel-puro-krakow-altstadt` | Concrete System Ostrzeszów |  |  |
| `hubschrauber-landeplatz-finnland` | `sanierung-hubschrauberlandeplatz-in-mikkeli-finnland` |  |  | dimension=250; jahr<=2018 |
| `john-lewis-lager-stevenage` | `lagerhalle-john-lewis-stevenage-uk` |  | John Lewis PLC | jahr<=2013 |
| `jura-werkstaetten-amberg` | `neubau-jura-werkstatten-amberg` | CBL Chemobau - Industrieboden GmbH | Jura Werkstätten Amberg-Sulzbach e |  |
| `kaiserhof-koeln` | `kaiserhof-koln` | Günter Schlag GmbH, Föhren |  |  |
| `kanalsanierung-im-schlosspark-muenchen` | `kanalsanierung-im-schlosspark-munchen` | Holzer Tiefbau GmbH, Degerndorf |  | jahr<=2013 |
| `klaranlage-nako` | `sanierung-klaranlagebecken-polen` | POS-BUD bis Sp. z.o.o., Bydgoszcz, |  | jahr<=2014 |
| `kleemann-produktionshalle` | `rapid-sanierung-kleemann` |  | Kleemann GmbH | jahr<=2010 |
| `kongresszentrum-dipoli-espoo-finnland` | `kongresszentrum-dipoli-finnland` | Neliskulma Oy, Finnland | Aalto-Universität, Finnland | architekt=Reima & Raili Pietilä Ar |
| `kraftwerk-bergamo` | `kraftwerk-bergamo` | SIPRA SPA, Borgosatollo | Società Transformazione Energie Ri | jahr<=2011 |
| `kreisverkehr-goppingen` | `pflastersanierung-eines-kreisverkehrs` | Blessing GmbH, Bau- und Umwelttech | Tiefbauamt Stadt Göppingen | jahr<=2021 |
| `kuechenarbeitsplatte-berlin` | `kuchenarbeitsplatte-berlin` |  |  | jahr<=2016 |
| `kuechenbodensanierung-leinfelden` | `schnelle-kuchenbodensanierung-leinfelden` |  |  | jahr<=2019 |
| `kunstdepot-muenchen` | `neubau-kunstdepot-munchen` | CBL Chemobau Industrieboden GmbH,  | IMMO ART |  |
| `leica-firmenzentrale-wetzlar` | `leica-firmenzentrale-wetzlar` | Günter Schlag GmbH, Mehring | Leica Camera AG, Wetzlar | jahr<=2014 |
| `libeskind-villa-datteln` | `libeskind-villa-datteln` | Bräuner GmbH & Co. KG | Rheinzink GmbH & Co. KG | jahr<=2009 |
| `lidl-zentrallager-graben` | `lidl-zentrallager-graben` |  | LIDL Stiftung & Co. KG |  |
| `lkw-einstellplatz-berlin` | `scheinwerfer-einstellplatze-berlin` |  |  | jahr<=2018 |
| `logistikzentrum-daimler-guangzhou-china` | `logistikzentrum-guangzhou-china` | Vokor Paint, KunShan | Daimler AG, Peking | jahr<=2014 |
| `loosen-werkzeug-klausen` | `bodensanierung-mit-schnellbeton` | Mörtel Mich GmbH, Estrich Schlag G | Loosen Werkzeug GmbH | jahr<=2021; flaeche<=70 |
| `martensbro-schule-espoo-finnland` | `martensbro-skola-espoo` | Neliskulma Oy, Finnland | City of Espoo |  |
| `mensa-hochschule-weiden` | `mensa-hochschule-weiden` | Asphalt- und Isolierbau Weiden Gmb | Hochschule Amberg-Weiden | architekt=Brückner & Brückner Arch |
| `metro-grossmarkt-wien-oesterreich` | `umbau-metro-grossmarkt-wien` | Swietelsky Baugesellschaft mbH, Ös | METRO Cash & Carry Österreich GmbH | dimension=approx. 6.000 m2 |
| `moebelhaus-hoeffner-hamburg` | `mobelhaus-hoffner-hamburg` | Käser GmbH, Remshalden | Möbel Höffner |  |
| `monheim-produktionsflaeche` | `bodensanierung-zwischen-den-feiertagen` | WEST Industrieboden GmbH |  | jahr<=2021 |
| `moxy-hotel` | `moxy-hotels` |  |  | jahr<=2017 |
| `nationalarchiv-tartu-estland` | `nationalarchiv-estland` |  | YIT Ehitus AS, Estland |  |
| `naturex-burgdorf` | `sanierung-kaltspruhturm-burgdorf` | SIB, Frankreich | Naturex AG | jahr<=2013 |
| `nike-shop-kaunas-litauen` | `nike-store-kaunas` | UAB Betona Zona / UAB Svaros lyder |  |  |
| `nike-store-polen` | `nike-store-szczecin-polen` | POLER SYSTEM, Polen |  | client=Adrenaline.pl, Polen - o; jahr<=2018; flaeche<=ca. 300 |
| `obi-baumaerkte` | `obi-baumarkte` |  | OBI GmbH & Co. KG, Wermelskirchen |  |
| `oelie-saur-saint` | `gehwegsanierung-in-saint-etienne` | Trema, Saint-Didier-en-Velay, Fran | Oélie/Saur, L’eau de Saint Étienne | jahr<=2024 |
| `olympiastadion-berlin` | `olympiastadion-berlin` | Estrich Bossert GmbH (inkl. Schlei | Olympiastadion Berlin GmbH | jahr<=2005 |
| `parkhaus-freiburger-munster-freiburg` | `durop-beschichtung-tiefgarage-freiburg` | R.S.I Revêtements de sols industri | Betriebsgesellschaft Karlsbau Frei | jahr<=2012 |
| `parkplatzsanierung-metzingen` | `sanierung-parkplatz-metzingen` |  |  | jahr<=2017 |
| `pflastersanierung-esslingen` | `pflastersanierung-bringt-barrierefreiheit` | Blessing GmbH Notzingen | Tiefbauamt Esslingen |  |
| `phoenix-media-mall-suzhou-china` | `phoenix-media-mall-china` | Wuxi En Fu Te Decoration Co., Ltd, | Phoenix Media Group | client=Oy Karl Fazer AB, Finnla |
| `restaurant-haerg-tallinn-estland` | `restaurant-harg-estland` |  | Enn Tobreluts, Hanno Kuul und Andr |  |
| `restaurant-mueli-muelligen-schweiz` | `restaurant-muli-mulligen` | Peter Kramer AG | Tess Schneider, Restaurant Müli | jahr<=2011 |
| `ropa-montagezentrum-herrngiersdorf` | `neubau-montagezentrum-herrngiersdorf` | BM Industrieboden GmbH, Altenstadt | ROPA Fahrzeug- und Maschinenbau Gm |  |
| `sanierung-futtertisch-milchhof-beeskow` | `sanierung-futtertisch-milchhof-beeskow` | Mel-Fö Anlagenbau & Service, Fried |  | jahr<=2019 |
| `schachtregulierung-fahrbahn-nittenau` | `schachtregulierung-im-bayerischen-wald` | Josef Rädlinger Bauunternehmen Gmb |  | jahr<=2019 |
| `showroom-bonsai-group-guernsey-uk` | `showroom-bonsai-interiors-uk` |  | Bonsai Interiors |  |
| `showroom-oldtimer-kalifornien-usa` | `showroom-oldtimer-usa` |  |  | client=Doctor Detail, USA |
| `sic-processing-zhenjiang-china` | `sic-processing-zhenjiang-china` | Shanghai Xiao Jie | SiC Processing, Dienhof, Deutschla |  |
| `sinusfugen-sanierung` | `einfache-sinusfugensanierung-mit-rapid-set` |  |  | jahr<=2021 |
| `sncf-bordeaux` | `bahnhof-bordeaux-frankreich` | SIBA AQUITAINE | SNCF, Frankreich | jahr<=2016 |
| `sportano-polen` | `sportano-sportgeschaeft-in-polen` | Concrete, Polen |  |  |
| `stefan-andreas-schulzentrum-schweich` | `stefan-andres-gymnasium-schweich` | Günter Schlag GmbH, Mehring | Landkreis Trier-Saarburg |  |
| `strandhaus-bahia-de-kino-mexico` | `strandhaus-bahia-de-kino` | Construction World de Mexico |  | jahr<=2018 |
| `strandkorbhalle-sylt` | `strandkorbhalle-wenningstedt-sylt` |  |  | jahr<=2015 |
| `suntago-village-swinice-polen` | `suntago-village-park-of-poland` | Concrete System, Ostrzeszów | Global City Holdings B.V., Warszaw | jahr<=2020 |
| `texaco-tankflache-arnheim` | `texaco-tankstelle-arnheim` |  | TEXACO Group | jahr<=2018 |
| `torschwelle-lagerhalle` | `sanierung-torschwelle` |  |  | jahr<=2017 |
| `trennfugen-bohnenkamp` | `trennfugensanierung-essenbach` |  |  | jahr<=2019 |
| `treppensanierung-gehweg-esslingen` | `treppensanierung-esslingen` |  |  | jahr<=2015 |
| `treppenstufen-sanierung` | `treppenstufensanierung` |  |  | jahr<=2016 |
| `trinkwasserbehaelter-bad-nauheim` | `trinkwasserbehalter-bad-nauheim` | Fritz Wiedemann und Sohn GmbH, Wie | Stadtwerke Bad Nauheim |  |
| `trinkwasserbehaelter-haidberg` | `sanierung-trinkwasser-hochbehalter-haidberg` | Rödl GmbH, Nürnberg | EWAG Nürnberg |  |
| `trinkwasserspeicher-raecknitz-dresden` | `sanierung-trinkwasserspeicher-racknitzhohe` | Fritz Wiedemann Niederlassung Dres |  |  |
| `trinkwasserturm-budapest` | `trinkwasserturm-budapest` |  | Stadtwerke Budapest |  |
| `truazzo-isabel-marant-store-wien-oesterreich` | `truazzo-fur-modeboutique-in-wien` | Concrete System Ostrzeszów |  | client=Nicole Doleh, Inhaberin ; jahr<=2021 |
| `u-bahnhof-koeln` | `u-bahnhof-breslauer-platz-koln` | Estrich Bossert GmbH, Kernen | Kölner Verkehrs-Betriebe AG | jahr<=2011 |
| `under-armoure-store-wisconsin-usa` | `under-armour-store-usa` |  |  | client=Under Armour, Inc.; jahr<=2016 |
| `verwaltungsgebaeude-laehitapiola-espoo` | `verwaltungsgebaude-lahitapiola` | Neliskulma Oy, Finnland | LÄHITAPIOLA Group | architekt=SARC Architects |
| `verwaltungsgebaeude-moedel-amberg` | `verwaltungsgebaude-moedel-amberg` |  | Moedel GmbH | architekt=Harth + Flierl; jahr<=2009 |
| `wago-stanzerei-minden` | `neubau-wago-stanzerei-minden` | Condulith® Deutsche Industrieboden | WAGO Kontakttechnik GmbH & Co. KG, | jahr<=2014 |
| `weag-entsorgungsbetrieb` | `sanierung-weag-entsorgungsbetrieb-kongen` |  | WEAG GmbH & Co. KG | jahr<=2020 |
| `weingut-am-nil-kallstadt` | `weingut-am-nil-kallstadt-pfalz` | Bau- u. Industriebodentechnik Joac | Deutsche Vermögensverwaltung, Marb |  |
| `wellpappenfabrik-gross-versmold` | `sanierung-wellpappenfabrik-gross-versmold` | H. Bau-Team GmbH Baugesellschaft,  |  | jahr<=2013 |
| `wirtgen-produktionshallen-weltweit` | `produktionsstatten-der-wirtgen-group` |  | Wirtgen GmbH, Windhagen |  |
| `wochenend-sanierung-werkstatt` | `sanierung-mit-neodur-he-60-rapid` | BM |  | jahr<=2022 |
| `zalando-bygodszcz-polen` | `zalando-bydgoszcz` | PPP |  |  |

---

## Validierungs-Verdikt (adversarial, Stichproben gegen Roh-XML)

**VERDIKT: TAUGLICH.** Extraktion ist quelltreu; keine Erfindung; Joins korrekt; Translation-Paare additiv & valide. Maengel liegen in den QUELLDATEN (WP-ACF), nicht in der Extraktion.

**Geprueft & OK:**
- *Prosa:* 392 Bloecke, echter Fliesstext (Stichproben DE/EN/FR). Kein HTML/JSON/CDATA/wp:meta, keine undecodierten Entities, 0 literale `\n`-Artefakte. Residuen: 23 Bloecke mit inline-Markdown-Links (echte WP-Body-Links, z.B. Fachartikel-PDFs), 8 mit `**Bold**` (Produktnamen) — beides faithful, kein Muell.
- *Sprach-Join:* 0 vertauschte Sprachen. Querprobe ueber sprach-invariante ACF: `ref_area` weicht in 23 Gruppen nur als Lokalisierung ab (ca./approx./env., gleicher Zahlwert); `small-square-image` in 5 Gruppen = legitime per-Sprache-Thumbnails. Einzige echte Inkonsistenz: `artofchocolate` Baujahr {2008,2010} = Doppelstandort-Quellfehler (Schwarzach+Wertheim), kein Join-Fehler.
- *Translation-JSONL:* alle 3 Dateien parsen zeilenweise sauber. de_en 320 / de_fr 231 / review 466 (= Reportzahlen). Alignment block-genau verifiziert (3D-Haus, Airbus A380). 0 leere Seiten; 1 identische DE==EN-Zeile = Marken-Claim `AUNN Café – All U Need Now` (legitim). Git: alle Outputs `??` (untracked, additiv — nichts ueberschrieben).
- *Stale-Flags:* KORREKT. 0 Treffer fuer KOROPOX / NEODUR AM Super / AM Plus / MICROTOP TW NSD / KOROTAN-Additiv in allen 410 `referenzen`-Items. Die 591 KOROPOX-Treffer im Gesamt-Export liegen auf attachment(50)/product(66)/page(6)/tablepress(3).

**Maengel (Datei:Befund) — QUELLDATEN, nicht Extraktion:**
- `referenzen-wxr.json` › `fazer-besucherzentrum-finnland` › `acf.*.ref_builder` = "Brauerei Bernard" — FALSCH (Copy-Paste aus Brauerei-Ref). Im Roh-XML identisch → quelltreu extrahiert, aber Quelle ist dreckig. NICHT als Bauherr importieren.
- `referenzen-wxr.json` › `phoenix-media-mall-china` › `acf.*.ref_client` = "Oy Karl Fazer AB, Finnland" — FALSCH (Leak aus Fazer-Ref). Quelltreu, Quelle dreckig.
- `referenzen-wxr.json` › `brasserie-en-cz-centre-de-visiteurs` (FR) › `ref_builder` = "PROVAS Plzeň" (= verarbeiter), waehrend DE-Twin `ref_builder`="Brauerei Bernard" — Bauherr/Verarbeiter quellseitig vertauscht in der FR-Sprachfassung. → `bauherr`/`client` generell vor #380-Import manuell verifizieren.
- #380-Designhinweis (kein Extraktionsfehler): `ref_verleger` und `ref_renovierungsjahr` sind im gesamten Export leer — als Eckdaten-Feld nicht nutzbar; `verarbeiter` (73) + `bauherr` (69, fehlerbehaftet) + `jahr` (65) sind die tragfaehigen Deltas.
