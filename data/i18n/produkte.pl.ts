/** Polish translations for product data */
export const produktePL: Record<string, {
  kurzbeschreibung?: string;
  besonderheiten?: string[];
  technischeDaten?: { label: string; wert: string }[];
}> = {
  "neodur-he-60-rapid": {
    kurzbeschreibung: "Wysokowydajny szybkotwardniejący jastrych z posypką utwardzającą – pełna nośność po 24 h",
    besonderheiten: ["Wysoka odporność na ścieranie", "Odporny chemicznie", "Szybkotwardniejący", "Niski skurcz"],
    technischeDaten: [
      { label: "Wytrzymałość na ściskanie", wert: "≥ 60 N/mm²" },
      { label: "Wytrzymałość na zginanie", wert: "≥ 8 N/mm²" },
      { label: "Odporność na ścieranie", wert: "A6 (≤ 6 cm³/50 cm²)" },
      { label: "Ruch pieszy po", wert: "ok. 4–6 h" },
      { label: "Pełna nośność po", wert: "ok. 24 h" },
    ],
  },
  "neodur-he-65": {
    kurzbeschreibung: "Wysokowydajny jastrych z posypką utwardzającą do najwyższych obciążeń przemysłowych z technologią silosową",
    besonderheiten: ["Najwyższa odporność na zużycie", "System silosowy", "Ekonomiczny na dużych powierzchniach", "Mocne połączenie"],
    technischeDaten: [
      { label: "Wytrzymałość na ściskanie", wert: "≥ 70 N/mm²" },
      { label: "Wytrzymałość na zginanie", wert: "≥ 9 N/mm²" },
      { label: "Odporność na ścieranie", wert: "A6 (≤ 6 cm³/50 cm²)" },
      { label: "Zastosowanie", wert: "System silosowy / technologia pompowa" },
      { label: "Pełna nośność po", wert: "ok. 3 dni" },
    ],
  },
  "neodur-he-65-plus": {
    kurzbeschreibung: "Wysokowydajny jastrych z posypką utwardzającą do stosowania wewnątrz i na zewnątrz – bez mostka sczepnego, zgodny z WHG",
    besonderheiten: ["Bez mostka sczepnego", "Odporny na mróz i sole odladzające", "Zgodny z WHG", "Modyfikowany polimerami i zbrojony włóknami"],
    technischeDaten: [
      { label: "Wytrzymałość na ściskanie", wert: "≥ 70 N/mm²" },
      { label: "Wytrzymałość na zginanie", wert: "≥ 9 N/mm²" },
      { label: "Odporność na ścieranie", wert: "A6 (≤ 6 cm³/50 cm²)" },
      { label: "Odporność na mróz i sole", wert: "Tak" },
      { label: "Mostek sczepny wymagany", wert: "Nie" },
    ],
  },
  "neodur-he-40": {
    kurzbeschreibung: "Wysokowydajny jastrych z posypką utwardzającą do silnie obciążonych posadzek przemysłowych",
    besonderheiten: ["Wysoka odporność na zużycie", "Mocne połączenie (DIN 18560-7)", "Ekonomiczne rozwiązanie z posypką utwardzającą", "Zastosowanie wewnętrzne"],
    technischeDaten: [
      { label: "Wytrzymałość na ściskanie", wert: "≥ 40 N/mm²" },
      { label: "Wytrzymałość na zginanie", wert: "≥ 6 N/mm²" },
      { label: "Odporność na ścieranie", wert: "A6 (≤ 6 cm³/50 cm²)" },
      { label: "Pełna nośność po", wert: "ok. 3 dni" },
    ],
  },
  "neodur-level": {
    kurzbeschreibung: "Samorozlewny, szybkotwardniejący jastrych cienkościenny z posypką utwardzającą do precyzyjnej renowacji posadzek",
    besonderheiten: ["Samorozlewny – doskonała płaskość", "Szybkie użytkowanie", "Zintegrowana warstwa ścieralna", "Aplikacja maszynowa"],
    technischeDaten: [
      { label: "Wytrzymałość na ściskanie", wert: "≥ 40 N/mm²" },
      { label: "Wytrzymałość na zginanie", wert: "≥ 10 N/mm²" },
      { label: "Samorozlewny", wert: "Tak" },
      { label: "Płaskość", wert: "DIN 18202, Wiersz 3" },
      { label: "Lekkie obciążenie po", wert: "ok. 24 h" },
      { label: "Pełna nośność po", wert: "ok. 3 dni" },
    ],
  },
  "tru-self-leveling": {
    kurzbeschreibung: "Samorozlewny, polerowany dekoracyjny jastrych pokazowy do estetycznych rozwiązań posadzkowych",
    besonderheiten: ["Designerski wygląd betonu", "Bezspoinowa powierzchnia", "Bez mostka sczepnego", "Polerowanie do wysokiego połysku", "Higieniczny i łatwy w utrzymaniu"],
    technischeDaten: [
      { label: "Wytrzymałość na ściskanie", wert: "≥ 40 N/mm²" },
      { label: "Wytrzymałość na zginanie", wert: "≥ 10 N/mm²" },
      { label: "Wygląd", wert: "Betonopodobna powierzchnia jastrychowa" },
      { label: "Zastosowanie", wert: "Samorozlewny" },
      { label: "Mostek sczepny", wert: "Nie wymagany" },
      { label: "Ruch pieszy po", wert: "ok. 2–3 h" },
      { label: "Pełna nośność po", wert: "ok. 24 h" },
    ],
  },
  "korodur-hb-5-rapid": {
    kurzbeschreibung: "Szybkotwardniejący mostek sczepny do mocnego połączenia z podłożem",
    besonderheiten: ["Szybkotwardniejący", "Wysoka przyczepność", "Aplikacja mokre na mokre"],
    technischeDaten: [
      { label: "Wytrzymałość na odrywanie", wert: "≥ 1,5 N/mm²" },
      { label: "Czas zachowania właściwości roboczych", wert: "ok. 15 min" },
      { label: "Pokrywalny po", wert: "mokre na mokre" },
    ],
  },
  "korodur-pc": {
    kurzbeschreibung: "Dyspersyjny grunt na bazie żywic syntetycznych do systemów jastrychów cienkościennych",
    besonderheiten: ["Specjalnie do systemów jastrychów cienkościennych", "Modyfikowany polimerami"],
    technischeDaten: [
      { label: "Wytrzymałość na odrywanie", wert: "≥ 1,0 N/mm²" },
      { label: "Zastosowanie", wert: "Do NEODUR Level" },
      { label: "Zużycie", wert: "50–200 g/m²" },
    ],
  },
  "rapid-set-cement-all": {
    kurzbeschreibung: "Uniwersalna szybka zaprawa naprawcza – nośność po 1 h, wewnątrz i na zewnątrz",
    besonderheiten: ["Ultraszybki czas wiązania", "Wysoka wytrzymałość wczesna", "Do stosowania wewnątrz i na zewnątrz", "Kompensacja skurczu"],
    technischeDaten: [
      { label: "Jakość", wert: "C55/67" },
      { label: "Wytrzymałość na ściskanie (1 h)", wert: "≥ 21 N/mm²" },
      { label: "Wytrzymałość na ściskanie (24 h)", wert: "≥ 42 N/mm²" },
      { label: "Ruch pieszy po", wert: "ok. 15 min" },
      { label: "Pełna nośność po", wert: "ok. 1 h" },
    ],
  },
  "rapid-set-mortar-mix": {
    kurzbeschreibung: "Uniwersalna szybka zaprawa naprawcza do dylatacji, reprofilacji i montażu profili",
    besonderheiten: ["Bez skurczu", "Bez mostka sczepnego", "Regulowana konsystencja od pastowej do sztywnej", "Tylko mieszanie z wodą"],
    technischeDaten: [
      { label: "Jakość", wert: "C45/55" },
      { label: "Wytrzymałość na ściskanie (1 h)", wert: "≥ 21 N/mm²" },
      { label: "Wytrzymałość na ściskanie (24 h)", wert: "≥ 42 N/mm²" },
      { label: "Konsystencja", wert: "pastowa do plastycznej" },
      { label: "Pełna nośność po", wert: "ok. 1 h" },
    ],
  },
  "rapid-set-mortar-mix-dur": {
    kurzbeschreibung: "Szybka zaprawa naprawcza z kruszywem twardym DIN 1100 A do dylatacji pod dużym obciążeniem",
    besonderheiten: ["Zintegrowane kruszywo twarde DIN 1100 A", "Do dylatacji pod dużym obciążeniem", "Bez skurczu", "Regulowana konsystencja pastowa"],
    technischeDaten: [
      { label: "Jakość", wert: "C45/55 + DIN 1100 A" },
      { label: "Wytrzymałość na ściskanie (1 h)", wert: "≥ 21 N/mm²" },
      { label: "Wytrzymałość na ściskanie (24 h)", wert: "≥ 42 N/mm²" },
      { label: "Konsystencja", wert: "pastowa do plastycznej" },
      { label: "Pełna nośność po", wert: "ok. 1 h" },
    ],
  },
  "asphalt-repair-mix": {
    kurzbeschreibung: "Szybki materiał naprawczy do nawierzchni asfaltowych – dopuszczenie do ruchu po 30 minutach",
    besonderheiten: ["Do nawierzchni asfaltowych", "Bez mostka sczepnego", "Łatwa aplikacja", "Dopuszczenie do ruchu po 30 minutach"],
    technischeDaten: [
      { label: "Wytrzymałość na ściskanie", wert: "ok. 22 N/mm²" },
      { label: "Grubość warstwy", wert: "30–600 mm" },
      { label: "Dopuszczenie do ruchu po", wert: "ok. 30 min" },
      { label: "Mostek sczepny", wert: "Nie wymagany" },
    ],
  },
  "dot-europe-concrete-mix": {
    kurzbeschreibung: "Uniwersalny szybki beton naprawczy zgodny z DIN EN 1504-3 – do mostów, pasów startowych i posadzek przemysłowych",
    besonderheiten: ["Zastosowanie wielofunkcyjne", "Mrozoodporny / odporny na sole", "Odporny na siarczany, bez chlorków", "Doskonała przyczepność bez mostka", "Do mostów, pasów startowych, posadzek przemysłowych", "30 % mniej CO₂ niż cement portlandzki"],
    technischeDaten: [
      { label: "Jakość", wert: "C35/45" },
      { label: "Uziarnienie", wert: "0–8 mm" },
      { label: "Wytrzymałość na ściskanie (60 min)", wert: "> 19 N/mm²" },
      { label: "Wytrzymałość na ściskanie (28 d)", wert: "> 41 N/mm²" },
      { label: "Wytrzymałość na zginanie (28 d)", wert: "> 7 N/mm²" },
      { label: "Pełna nośność po", wert: "ok. 1 h" },
      { label: "Mrozoodporny / odporny na sole", wert: "Tak" },
      { label: "Odporny na siarczany", wert: "Tak" },
    ],
  },
  "korocrete": {
    kurzbeschreibung: "Szybki beton mieszany wolumetrycznie na bazie FSCem (trójskładnikowe spoiwo specjalne) – dopuszczenie do ruchu po 6 h",
    besonderheiten: ["Mieszanie wolumetryczne na budowie (Cemen Tech M-Series)", "Stabilny objętościowo, bez skurczu/napięć, twardnieje bez pęknięć", "Wodoodporny, do pomieszczeń mokrych", "Pompowalny", "Zastosowanie na dużych powierzchniach", "Bez resztek betonu"],
    technischeDaten: [
      { label: "Spoiwo", wert: "KORODUR FSCem (trójskładnikowe)" },
      { label: "Jakość", wert: "C35/45 – C50/60" },
      { label: "Wytrzymałość na ściskanie (6 h)", wert: "ok. 18 N/mm²" },
      { label: "Wytrzymałość na ściskanie (8 h)", wert: "ok. 25 N/mm²" },
      { label: "Wytrzymałość na ściskanie (16 h)", wert: "ok. 35 N/mm²" },
      { label: "Wytrzymałość na ściskanie (28 d)", wert: "ok. 65 N/mm²" },
      { label: "Dopuszczenie do ruchu po", wert: "ok. 6 h (≥ 20 MPa)" },
      { label: "Mieszanie", wert: "wolumetryczne na budowie" },
    ],
  },
  "rapid-set-schnellbeton": {
    kurzbeschreibung: "Szybki beton mieszany wolumetrycznie na bazie Rapid-Set zgodny z TL BEB-StB – dopuszczenie do ruchu po 2 h",
    besonderheiten: ["Mieszanie wolumetryczne na budowie", "TL BEB-StB (najwyższa klasa ruchu dla prac utrzymaniowych)", "2-godzinne dopuszczenie do ruchu", "Mrozoodporny / odporny na sole", "Zastosowanie na dużych powierzchniach", "Bez resztek betonu"],
    technischeDaten: [
      { label: "Spoiwo", wert: "Rapid Set (cement siarczanowo-glinianowy)" },
      { label: "Jakość", wert: "C40/50" },
      { label: "Wytrzymałość na ściskanie (60 min)", wert: "> 19 N/mm²" },
      { label: "Wytrzymałość na ściskanie (28 d)", wert: "> 41 N/mm²" },
      { label: "Dopuszczenie do ruchu po", wert: "ok. 2 h" },
      { label: "Mieszanie", wert: "wolumetryczne na budowie" },
    ],
  },
  "korocure": {
    kurzbeschreibung: "Środek pielęgnacyjny do kontrolowanej pielęgnacji powierzchni jastrychowych",
    besonderheiten: ["Kontrolowana pielęgnacja", "Do powierzchni zewnętrznych", "Redukcja pęknięć skurczowych"],
    technischeDaten: [
      { label: "Efekt", wert: "Zatrzymanie wilgoci / pielęgnacja" },
      { label: "Zastosowanie", wert: "Natrysk lub aplikacja wałkiem" },
    ],
  },
  "koromineral-cure": {
    kurzbeschreibung: "Ochrona powierzchni poprzez obróbkę silikatową",
    besonderheiten: ["Zwiększa twardość powierzchni", "Redukuje pylenie", "Poprawia odporność chemiczną"],
    technischeDaten: [
      { label: "Efekt", wert: "Obróbka silikatowa / impregnacja" },
      { label: "Zastosowanie", wert: "Na świeży jastrych" },
    ],
  },
  "korotex": {
    kurzbeschreibung: "Środek pielęgnacyjny do kontrolowanego twardnienia",
    besonderheiten: ["Kontrolowana pielęgnacja", "Redukcja pęknięć skurczowych", "Aplikacja natryskowa"],
    technischeDaten: [
      { label: "Efekt", wert: "Zatrzymanie wilgoci / pielęgnacja" },
      { label: "Zastosowanie", wert: "Aplikacja natryskowa" },
    ],
  },
};
