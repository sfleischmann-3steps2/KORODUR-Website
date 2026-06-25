/** Polish translations for product data */
export const produktePL: Record<string, {
  kurzbeschreibung?: string;
  beschreibung?: string;
  besonderheiten?: string[];
  technischeDaten?: { label: string; wert: string }[];
  varianten?: { name: string; qualitaetsklasse?: string; hinweis?: string }[];
}> = {
  "neodur-he-60-rapid": {
    kurzbeschreibung: "Wysokowydajny szybkotwardniejący jastrych z posypką utwardzającą",
    besonderheiten: ["Wysoka odporność na ścieranie", "Odporny chemicznie", "Szybkotwardniejący", "Niski skurcz"],
    technischeDaten: [
      { label: "Wytrzymałość na ściskanie", wert: "≥ 60 N/mm²" },
      { label: "Wytrzymałość na zginanie", wert: "≥ 8 N/mm²" },
      { label: "Odporność na ścieranie", wert: "A6 (≤ 6 cm³/50 cm²)" },
      { label: "Ruch pieszy po", wert: "ok. 4–6 h" },
      { label: "Pełna nośność po", wert: "ok. 24 h" },
    ],
    varianten: [
      { name: "NEODUR HE 60 rapid SVS 3", qualitaetsklasse: "CT-C60-F8-A3" },
      { name: "NEODUR HE 60 rapid SVS 1,5", qualitaetsklasse: "CT-C60-F8-A1,5" },
      { name: "NEODUR HE 60 rapid metallisch", qualitaetsklasse: "CT-C60-F8-A3", hinweis: "Grupa kruszywa twardego M" },
    ],
  },
  "neodur-he-65": {
    kurzbeschreibung: "Wysokowydajny jastrych z posypką utwardzającą",
    besonderheiten: ["Najwyższa odporność na zużycie", "System silosowy", "Ekonomiczny na dużych powierzchniach", "Mocne połączenie"],
    technischeDaten: [
      { label: "Wytrzymałość na ściskanie", wert: "≥ 70 N/mm²" },
      { label: "Wytrzymałość na zginanie", wert: "≥ 9 N/mm²" },
      { label: "Odporność na ścieranie", wert: "A6 (≤ 6 cm³/50 cm²)" },
      { label: "Zastosowanie", wert: "System silosowy / technologia pompowa" },
      { label: "Pełna nośność po", wert: "ok. 3 dni" },
    ],
    varianten: [
      { name: "NEODUR HE 65 SVS 3", qualitaetsklasse: "CT-C70-F9-A3" },
      { name: "NEODUR HE 65 SVS 1,5", qualitaetsklasse: "CT-C70-F9-A1,5", hinweis: "Grupa kruszywa twardego KS" },
      { name: "NEODUR HE 65 SVS 1,5 extra", qualitaetsklasse: "CT-C70-F9-A1,5" },
      { name: "NEODUR HE 65 metallisch", qualitaetsklasse: "CT-C80-F11-A3", hinweis: "Grupa kruszywa twardego M" },
    ],
  },
  "neodur-he-65-plus": {
    kurzbeschreibung: "Wysokowydajny jastrych z posypką utwardzającą",
    besonderheiten: ["Bez mostka sczepnego", "Odporny na mróz i sole odladzające", "Zgodny z WHG", "Modyfikowany polimerami i zbrojony włóknami"],
    technischeDaten: [
      { label: "Wytrzymałość na ściskanie", wert: "≥ 70 N/mm²" },
      { label: "Wytrzymałość na zginanie", wert: "≥ 9 N/mm²" },
      { label: "Odporność na ścieranie", wert: "A6 (≤ 6 cm³/50 cm²)" },
      { label: "Odporność na mróz i sole", wert: "Tak" },
      { label: "Mostek sczepny wymagany", wert: "Nie" },
    ],
    varianten: [
      { name: "NEODUR HE 65 plus SVS 3", qualitaetsklasse: "CT-C70-F9-A3" },
    ],
  },
  "neodur-he-40": {
    kurzbeschreibung: "Wysokowydajny jastrych z posypką utwardzającą",
    besonderheiten: ["Wysoka odporność na zużycie", "Mocne połączenie (DIN 18560-7)", "Ekonomiczne rozwiązanie z posypką utwardzającą", "Zastosowanie wewnętrzne"],
    technischeDaten: [
      { label: "Wytrzymałość na ściskanie", wert: "≥ 40 N/mm²" },
      { label: "Wytrzymałość na zginanie", wert: "≥ 6 N/mm²" },
      { label: "Odporność na ścieranie", wert: "A6 (≤ 6 cm³/50 cm²)" },
      { label: "Pełna nośność po", wert: "ok. 3 dni" },
    ],
    varianten: [
      { name: "NEODUR HE 40/8", qualitaetsklasse: "CT-C40-F7-A6" },
    ],
  },
  "neodur-level": {
    kurzbeschreibung: "Samorozlewny, szybkotwardniejący jastrych cienkościenny",
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
    kurzbeschreibung: "Samorozlewny, polerowany dekoracyjny jastrych pokazowy",
    beschreibung: "Rapid Set TRU Self-Leveling to oparty na specjalnej technologii cementowej, samorozlewny, mineralny, szlifowany jastrych dekoracyjny. Idealny, gdy wymagane są wysoka wytrzymałość wczesna, trwałość i twardnienie o niskim skurczu: czas obróbki do 20 minut, ruch pieszy po 2 do 3 godzinach, a już 24 godziny po wbudowaniu możliwość szlifowania aż do uzyskania wysokiego połysku. Dostępny w różnych wariantach kolorystycznych, z możliwością indywidualnej aranżacji z posypką dekoracyjną (np. szkło, marmur).",
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
    kurzbeschreibung: "Uniwersalna szybka zaprawa naprawcza",
    beschreibung: "Rapid Set CEMENT ALL to oparta na specjalnej technologii cementowej, mineralna, wielofunkcyjna szybka zaprawa naprawcza z wysokowydajnego cementu Rapid Set i drobnoziarnistego piasku. Szybko twardnieje, jest trwała i neutralna skurczowo; początek wiązania po ok. 15 minutach, pełna nośność po ok. 1 h. Wystarczy wymieszać z wodą, wytrzymałość konstrukcyjna w ciągu godziny. Optycznie porównywalna z materiałami na bazie cementu portlandzkiego i podobna w obróbce.",
    besonderheiten: ["Ultraszybki czas wiązania", "Wysoka wytrzymałość wczesna", "Do stosowania wewnątrz i na zewnątrz", "Kompensacja skurczu"],
    technischeDaten: [
      { label: "Jakość", wert: "C55/67" },
      { label: "Wytrzymałość na ściskanie (1 h)", wert: "≥ 21 N/mm²" },
      { label: "Wytrzymałość na ściskanie (24 h)", wert: "≥ 42 N/mm²" },
      { label: "Ruch pieszy po", wert: "ok. 15 min" },
      { label: "Pełna nośność po", wert: "ok. 1 h" },
    ],
    varianten: [
      { name: "Rapid Set CEMENT ALL Plus", qualitaetsklasse: "C55/67" },
    ],
  },
  "rapid-set-mortar-mix": {
    kurzbeschreibung: "Uniwersalna szybka zaprawa naprawcza",
    beschreibung: "Rapid Set MORTAR MIX to mieszanka wysokowydajnego cementu Rapid Set z piaskiem kwarcowym o dobranym uziarnieniu. Szybko twardnieje, jest trwała i neutralna skurczowo; można ją stosować poziomo, pionowo i nad głową. Wystarczy wymieszać z wodą, wytrzymałość konstrukcyjna w ciągu godziny. Do stosowania wewnątrz i na zewnątrz, również w strefach mokrych.",
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
    kurzbeschreibung: "Szybka zaprawa naprawcza z kruszywem twardym DIN 1100 A",
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
    kurzbeschreibung: "Szybki materiał naprawczy do nawierzchni asfaltowych",
    beschreibung: "Rapid Set ASPHALT REPAIR MIX to cementowy, modyfikowany polimerami materiał naprawczy: wysokowytrzymały, o niskich naprężeniach i szybkotwardniejący. Łączy szybkość mieszanki na zimno z trwałością asfaltu na gorąco: otworzyć worek, dodać wodę, wymieszać, wbudować. Bez frezarki, bez walca, bez mostka sczepnego; po ok. 30 minutach nośny, po ok. 1 godzinie w pełni nośny, również pod ruchem ciężkim.",
    besonderheiten: [
      "Do nawierzchni asfaltowych",
      "Bez mostka sczepnego",
      "Łatwa aplikacja",
      "Dopuszczenie do ruchu po 30 minutach",
      "Mrozoodporny, odporny na sole odladzające i siarczany",
      "Pompowalny, do stosowania poziomo i pionowo",
      "Ok. 30 % mniej CO₂ niż konwencjonalny cement portlandzki",
      "Dostępny w handlu materiałami budowlanymi",
    ],
    technischeDaten: [
      { label: "Wytrzymałość na ściskanie (30 min)", wert: "ok. 15 N/mm²" },
      { label: "Wytrzymałość na ściskanie (1 h)", wert: "ok. 22 N/mm²" },
      { label: "Wytrzymałość na ściskanie (28 d)", wert: "ok. 38 N/mm²" },
      { label: "Grubość warstwy", wert: "30–600 mm" },
      { label: "Dopuszczenie do ruchu po", wert: "ok. 30 min" },
      { label: "Mostek sczepny", wert: "Nie wymagany" },
      { label: "Wytrzymałość na zginanie (28 d)", wert: "ok. 6,4 N/mm²" },
      { label: "Moduł sprężystości", wert: "ok. 22 000 N/mm²" },
      { label: "Uziarnienie", wert: "0–8 mm" },
      { label: "Kolor", wert: "czarny" },
      { label: "Dodatek wody", wert: "ok. 3,80 l na worek 25 kg" },
      { label: "Zużycie materiału", wert: "ok. 20 kg/m² na cm grubości warstwy" },
      { label: "Temperatura obróbki", wert: "+5 °C do +30 °C" },
    ],
  },
  "dot-europe-concrete-mix": {
    kurzbeschreibung: "Uniwersalny szybki beton naprawczy, DIN EN 1504-3",
    beschreibung: "DOT Europe CONCRETE MIX to wysokowydajny, modyfikowany polimerami, szybkowiążący, zbrojony włóknami szybki beton do stosowania wewnątrz i na zewnątrz. Zgodnie z DIN EN 1504-3 nadaje się zarówno do napraw istotnych, jak i nieistotnych statycznie, idealny tam, gdzie wymagane są szybkie wytrzymałości, trwałość i twardnienie o niskim skurczu. Możliwość wbudowania w grubościach 50–600 mm, pełna nośność już po 1 godzinie; do stosowania również w strefach mokrych.",
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
    kurzbeschreibung: "Szybki beton mieszany wolumetrycznie (baza FSCem)",
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
    kurzbeschreibung: "Szybki beton mieszany wolumetrycznie (Rapid Set), TL BEB-StB",
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
    beschreibung: "Dla ochrony młodego betonu zgodnie z DIN EN 13670 w połączeniu z DIN 1045-3 wymagane są pośrednie zabiegi pielęgnacyjne: pielęgnacja pośrednia chroni zawartą w betonie wodę przed odparowaniem, aby cement mógł w pełni hydratyzować. Przy zastosowaniu jako grunt pod późniejsze warstwy z kruszywem twardym KOROCURE nakłada się bezpośrednio po osiągnięciu przez beton zdolności do ruchu pieszego.",
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
    beschreibung: "Zgodnie z DIN 18353 (roboty jastrychowe) i DIN 18560 (jastrychy w budownictwie) jastrychy muszą być chronione przed nierównomiernym i zbyt szybkim wysychaniem. Pielęgnacja KOROTEX jest szczególnie ważna przy podwyższonych temperaturach, niskiej wilgotności powietrza i silnych przeciągach; natrysk to najbardziej racjonalna metoda na świeżo ułożonych powierzchniach jastrychowych.",
    besonderheiten: ["Kontrolowana pielęgnacja", "Redukcja pęknięć skurczowych", "Aplikacja natryskowa"],
    technischeDaten: [
      { label: "Efekt", wert: "Zatrzymanie wilgoci / pielęgnacja" },
      { label: "Zastosowanie", wert: "Aplikacja natryskowa" },
    ],
  },
  "neodur-he-3": {
    kurzbeschreibung: "Cementowy suchy materiał budowlany do posadzek przemysłowych metodą posypki utwardzającej",
    beschreibung: "NEODUR HE 3 zgodnie z DIN 18557 (zaprawy fabryczne) i DIN EN 13813, na bazie kruszyw twardych zgodnie z DIN 1100: gotowy do użycia, cementowy suchy materiał budowlany do wykonywania posadzek przemysłowych metodą posypki utwardzającej. Dostępny również w wersjach barwionych.",
    technischeDaten: [
      { label: "Grupa kruszywa twardego (DIN 1100)", wert: "A" },
      { label: "Ścieralność", wert: "≤ 5 cm³/50 cm²" },
    ],
    besonderheiten: [
      "Posypka utwardzająca (na sucho na świeże powierzchnie jastrychowe/betonowe)",
      "Dostępny również w wersjach barwionych",
      "Dostępna środowiskowa deklaracja produktowa (EPD grupowa)",
    ],
    varianten: [
      { name: "NEODUR HE 3 SVS 3", qualitaetsklasse: "CT-C70-F9-A3" },
      { name: "NEODUR HE 3 SVS 1,5", qualitaetsklasse: "CT-C70-F9-A1,5", hinweis: "Grupa kruszywa twardego KS" },
      { name: "NEODUR HE 3 SVS 1,5 extra", qualitaetsklasse: "CT-C70-F9-A1,5" },
      { name: "NEODUR HE 3 metallisch", qualitaetsklasse: "CT-C80-F11-A3", hinweis: "Grupa kruszywa twardego M" },
    ],
  },
  "neodur-he-3-green": {
    kurzbeschreibung: "Zasobooszczędny wariant NEODUR HE 3 z redukcją emisji CO₂ do 30 %",
    beschreibung: "Dzięki zasobooszczędnemu wariantowi NEODUR HE 3 green emisję CO₂ w produkcji można zredukować nawet o 30 procent. Dla inwestorów, architektów, projektantów i firm budowlanych dostępne są odpowiednie środowiskowe deklaracje produktowe (EPD).",
    technischeDaten: [
      { label: "Grupa kruszywa twardego (DIN 1100)", wert: "A" },
      { label: "Ścieralność", wert: "≤ 5 cm³/50 cm²" },
      { label: "Redukcja CO₂", wert: "do 30 %" },
    ],
    besonderheiten: [
      "Redukcja CO₂ w produkcji do 30 %",
      "Dostępna EPD produktowa",
      "Posypka utwardzająca",
    ],
  },
  "neodur-he-2": {
    kurzbeschreibung: "Cementowy suchy materiał budowlany do posadzek przemysłowych metodą posypki utwardzającej",
    beschreibung: "NEODUR HE 2 zgodnie z DIN 18557 (zaprawy fabryczne) i DIN EN 13813: gotowy do użycia, cementowy suchy materiał budowlany do wykonywania posadzek przemysłowych metodą posypki utwardzającej. Dostępny również w wersjach barwionych.",
    technischeDaten: [
      { label: "Uziarnienie", wert: "0–3 mm" },
      { label: "Wytrzymałość na ściskanie", wert: "70 N/mm²" },
      { label: "Wytrzymałość na zginanie", wert: "9 N/mm²" },
      { label: "Ścieralność", wert: "≤ 8 cm³/50 cm²" },
    ],
    besonderheiten: [
      "Posypka utwardzająca",
      "Dostępny również w wersjach barwionych",
    ],
  },
  "korodur-0-4": {
    kurzbeschreibung: "Kruszywo twarde KORODUR (bez spoiwa) grupy A wg DIN 1100",
    beschreibung: "Kruszywo twarde do wykonywania posadzek przemysłowych o wysokich obciążeniach, np. parkingi wielopoziomowe, hale przemysłowe, hale montażowe, hangary lotnicze, warsztaty i magazyny wysokiego składowania. Do wnętrz i na zewnątrz.",
    technischeDaten: [
      { label: "Grupa kruszywa twardego (DIN 1100)", wert: "A" },
      { label: "Ścieralność", wert: "≤ 5 cm³/50 cm²" },
    ],
    besonderheiten: [
      "Kruszywo twarde bez spoiwa",
    ],
  },
  "korodur-vs-0-5": {
    kurzbeschreibung: "Kruszywo twarde KORODUR (bez spoiwa) grupy A wg DIN 1100, baza m.in. dla NEODUR HE 65",
    beschreibung: "Kruszywo twarde KORODUR bez spoiwa zgodnie z DIN 1100. Służy jako baza kruszywa twardego dla NEODUR HE 65 oraz jako dodatek kruszywa twardego do odpornych na zużycie jastrychów użytkowych, np. z KORODUR FSCem.",
    technischeDaten: [
      { label: "Grupa kruszywa twardego (DIN 1100)", wert: "A" },
      { label: "Ścieralność", wert: "≤ 5 cm³/50 cm²" },
    ],
    besonderheiten: [
      "Kruszywo twarde bez spoiwa",
      "Baza kruszywa twardego dla NEODUR HE 65",
    ],
  },
  "korodur-wh-spezial": {
    kurzbeschreibung: "Kruszywo twarde KORODUR (bez spoiwa) grupy A wg DIN 1100 do posadzek przemysłowych o wysokich obciążeniach",
    beschreibung: "Kruszywo twarde do wykonywania posadzek przemysłowych o wysokich obciążeniach. Baza kruszywa twardego dla NEODUR HE 65 SVS 3 i NEODUR HE 65 plus SVS 3. Do wnętrz i na zewnątrz.",
    technischeDaten: [
      { label: "Grupa kruszywa twardego (DIN 1100)", wert: "A" },
      { label: "Ścieralność", wert: "≤ 3 cm³/50 cm²" },
    ],
    besonderheiten: [
      "Kruszywo twarde bez spoiwa",
    ],
  },
  "korodur-wh-metallisch": {
    kurzbeschreibung: "Metaliczne kruszywo twarde KORODUR (grupa M wg DIN 1100) do jastrychów pancernych i ciężkiego ruchu kół stalowych",
    beschreibung: "Metaliczne kruszywo twarde do posadzek przemysłowych o wysokich obciążeniach, szczególnie odpowiednie przy ciężkim ruchu kół stalowych, kołogniotach i twardym odstawianiu ostrokrawędziowych elementów, do wykonywania tzw. jastrychów pancernych. Baza dla NEODUR HE 3 metallisch i NEODUR HE 65 metallisch. Do wnętrz i na zewnątrz.",
    technischeDaten: [
      { label: "Grupa kruszywa twardego (DIN 1100)", wert: "M" },
      { label: "Ścieralność", wert: "≤ 3 cm³/50 cm²" },
    ],
    besonderheiten: [
      "Metaliczne kruszywo twarde",
      "Do tzw. jastrychów pancernych",
    ],
  },
  "korodur-diamantbeton": {
    kurzbeschreibung: "Kruszywo twarde KORODUR grupy KS wg DIN 1100 o najwyższej możliwej odporności na zużycie",
    beschreibung: "Kruszywo twarde do wykonywania posadzek przemysłowych o wysokich obciążeniach przy najwyższej możliwej odporności na zużycie. Baza kruszywa twardego dla NEODUR HE 65 SVS 1,5. Do wnętrz i na zewnątrz.",
    technischeDaten: [
      { label: "Grupa kruszywa twardego (DIN 1100)", wert: "KS" },
      { label: "Ścieralność", wert: "≤ 1,5 cm³/50 cm²" },
    ],
    besonderheiten: [
      "Najwyższa możliwa odporność na zużycie (grupa KS)",
    ],
  },
  "korodur-fscem": {
    kurzbeschreibung: "Cementowe, stabilne objętościowo, niskoskurczowe spoiwo do szybkich jastrychów na bazie trójskładnikowej",
    beschreibung: "KORODUR FSCem to cementowe, stabilne objętościowo, niskoskurczowe spoiwo do szybkich jastrychów na bazie trójskładnikowej, do wykonywania wysokoobciążalnych, szybko użytkowych i gotowych do układania okładzin jastrychów zgodnie z DIN 18560 i EN 13813. Do szybko okładanych jastrychów cementowych zespolonych, na warstwie rozdzielającej, na warstwie izolacyjnej oraz jako jastrych grzewczy, wewnątrz i na zewnątrz. Nadaje się również do napraw i sanacji starych posadzek betonowych.",
    technischeDaten: [
      { label: "Proporcje mieszania (CT-C50-F7)", wert: "1:4 części wagowe (75 kg FSCem : 300 kg piasku jastrychowego A8–B8), w/c ok. 0,42" },
      { label: "Proporcje mieszania (CT-C40-F6)", wert: "1:5 części wagowe (60 kg FSCem : 300 kg piasku jastrychowego A8–B8), w/c ok. 0,40" },
      { label: "Wilgotność resztkowa (pomiar CM)", wert: "ok. 5,9 % po 24 h, ok. 1,9 % po 3 dniach, ok. 1,3 % po 28 dniach" },
      { label: "Klasa skurczu (DIN 18560-1)", wert: "SW 1, niskoskurczowy (< 0,2 mm/m)" },
    ],
    besonderheiten: [
      "Spoiwo trójskładnikowe (piasek jastrychowy po stronie budowy)",
      "Szybka gotowość do układania okładzin",
      "Możliwość wykonania odpornych na zużycie jastrychów użytkowych z dodatkiem kruszywa twardego KORODUR VS 0/5",
    ],
  },
  "korodur-fscem-screed": {
    kurzbeschreibung: "Stabilna objętościowo, niskoskurczowa sucha zaprawa do szybkich jastrychów, gotowość do okładzin po 3 dniach",
    beschreibung: "KORODUR FSCem Screed to stabilna objętościowo, niskoskurczowa sucha zaprawa do szybkich jastrychów na bazie trójskładnikowej, do wykonywania szybko gotowych do układania okładzin jastrychów o grubości warstwy do 120 mm zgodnie z DIN 18560 i DIN EN 13813. Gotowość do okładzin już po 3 dniach; zasadniczo wymaga okładziny. Nadaje się również do napraw i sanacji starych posadzek betonowych.",
    technischeDaten: [
      { label: "Uziarnienie", wert: "0–6 mm" },
      { label: "Wytrzymałość na ściskanie (DIN EN 13892-2)", wert: "ok. 20 N/mm² po 1 dniu, ok. 40 N/mm² po 28 dniach" },
      { label: "Wytrzymałość na zginanie (DIN EN 13892-2)", wert: "ok. 4 N/mm² po 1 dniu, ok. 6 N/mm² po 28 dniach" },
      { label: "Klasa skurczu (DIN 18560-1)", wert: "SW 1, niskoskurczowy (< 0,2 mm/m)" },
      { label: "Gotowość do okładzin", wert: "po 3 dniach" },
    ],
    besonderheiten: [
      "Gotowa do użycia sucha zaprawa",
      "Zasadniczo wymaga okładziny",
      "Dostępna środowiskowa deklaracja produktowa (EPD grupowa)",
    ],
  },
  "neodur-level-au": {
    kurzbeschreibung: "Szybkotwardniejąca, modyfikowana polimerami masa wyrównująca do podłóg, 5 do 50 mm",
    beschreibung: "NEODUR Level AU to cementowa, mineralna, szybkotwardniejąca, modyfikowana polimerami, cienkowarstwowa masa wyrównująca do podłóg o grubości warstwy od 5 do 50 mm. Stosowana zespolona na podłożu cementowym; idealne podłoże pod linoleum, wykładziny tekstylne i PVC, laminat, ceramikę i kamień naturalny.",
    technischeDaten: [
      { label: "Czas zachowania właściwości roboczych", wert: "ok. 30 minut przy +20 °C" },
      { label: "Ruch pieszy po", wert: "ok. 3–4 h" },
      { label: "Wytrzymałość na ściskanie", wert: "≥ 33 N/mm² po 28 dniach" },
      { label: "Zużycie", wert: "ok. 1,7 kg/mm/m²" },
    ],
    besonderheiten: [
      "Warstwa wyrównująca pod NEODUR Level",
      "Gruntowanie z KORODUR PC",
    ],
  },
  "rapid-set-levelflor": {
    kurzbeschreibung: "Szybkotwardniejąca, samorozlewna masa wyrównująca na technologii cementowej Rapid Set, do wnętrz i na zewnątrz",
    beschreibung: "Rapid Set LevelFlor to oparta na specjalnej technologii cementowej, samorozlewna masa wyrównująca do wnętrz i na zewnątrz w budownictwie mieszkaniowym i przemysłowym. Finalną warstwę wierzchnią można nakładać po 6 do 16 godzinach (przy +20 °C). Nadaje się do nowego budownictwa i sanacji; zasadniczo wymaga okładziny.",
    technischeDaten: [
      { label: "Czas zachowania właściwości roboczych", wert: "30 min" },
      { label: "Czas rozpływu", wert: "15 min" },
      { label: "Wytrzymałość na ściskanie (ASTM C-109 mod.)", wert: "ok. 20 N/mm² po 25 h, ok. 24 N/mm² po 7 dniach, ok. 34 N/mm² po 28 dniach" },
      { label: "Wytrzymałość na zginanie (ASTM C-348)", wert: "ok. 7,9 N/mm² po 7 dniach" },
      { label: "Warstwa wierzchnia", wert: "po 6–16 godzinach (przy +20 °C)" },
    ],
    besonderheiten: [
      "Technologia cementowa Rapid Set",
      "Samorozlewna",
      "Zasadniczo wymaga okładziny",
    ],
  },
  "korodur-hb-5": {
    kurzbeschreibung: "Cementowa warstwa sczepna do mocnego połączenia jastrychów z kruszywem twardym ze stwardniałym betonem",
    beschreibung: "KORODUR HB 5 to gotowa do użycia, cementowa warstwa sczepna do mocnego połączenia jastrychów z kruszywem twardym KORODUR oraz jastrychów cementowych wszystkich klas jakości ze stwardniałym betonem. Szczególnie sprawdzona w systemie posadzek przemysłowych KORODUR-KOROTAN, niewrażliwa na wilgoć podłoża.",
    technischeDaten: [
      { label: "Zużycie", wert: "ok. 2 kg/m²" },
    ],
    besonderheiten: [
      "Niewrażliwa na wilgoć podłoża",
      "Do techniki układania świeżej i z przesunięciem czasowym",
    ],
  },
  "korodur-txpk": {
    kurzbeschreibung: "Dwuskładnikowy specjalny grunt epoksydowy do powłok samorozlewnych",
    beschreibung: "Specjalny grunt epoksydowy, dwuskładnikowy, do powłok samorozlewnych takich jak TRU Self-Leveling, LevelFlor i NEODUR Level oraz do gruntowania powierzchni betonowych i jastrychowych, na których należy liczyć się z późniejszym oddziaływaniem wilgoci od strony podłoża.",
    technischeDaten: [
      { label: "Zużycie", wert: "ok. 400–500 g/m² w zależności od szorstkości podłoża" },
    ],
    besonderheiten: [
      "Dwuskładnikowy",
      "Odpowiedni przy oddziaływaniu wilgoci od strony podłoża",
    ],
  },
  "korodur-durop": {
    kurzbeschreibung: "Syntetyczne kruszywo twarde jako materiał wypełniający i posypkowy do powłok i jastrychów z żywic syntetycznych",
    beschreibung: "Syntetyczne kruszywa twarde systemu produktowego KORODUR DUROP stosowane są przeważnie jako materiał wypełniający i posypkowy do powłok i jastrychów z żywic syntetycznych. DUROP poprawia przyczepność powierzchni i redukuje hałas toczenia; w budownictwie drogowym wykonano już ponad 1,5 mln m² odcinków autostrad jako cienkie powłoki na bazie żywic syntetycznych z DUROP.",
    technischeDaten: [
      { label: "Twardość w skali Mohsa", wert: "8" },
    ],
    besonderheiten: [
      "Odporne na zużycie, antypoślizgowe, odporne na polerowanie",
    ],
    varianten: [
      { name: "DUROP 0,5/1", hinweis: "Uziarnienie 0,5–1 mm" },
      { name: "DUROP 1/2", hinweis: "Uziarnienie 1–2 mm" },
      { name: "DUROP 2/3", hinweis: "Uziarnienie 2–3 mm" },
      { name: "DUROP 2/5", hinweis: "Uziarnienie 2–5 mm" },
    ],
  },
  "korodur-robust": {
    kurzbeschreibung: "Syntetyczne kruszywo twarde (uziarnienie 0–3 mm) jako materiał wypełniający i posypkowy do systemów żywic syntetycznych",
    beschreibung: "Z systemami produktowymi KORODUR DUROP i KORODUR Robust dostępne są odpowiednie materiały wypełniające i posypkowe do wysokiej jakości powłok i jastrychów z żywic syntetycznych.",
    technischeDaten: [
      { label: "Uziarnienie", wert: "0–3 mm" },
      { label: "Twardość w skali Mohsa", wert: "7" },
    ],
  },
  "korodur-silosystem": {
    kurzbeschreibung: "Silos budowlany z techniką mieszania i pompowania do ekonomicznego układania warstw z kruszywem twardym",
    beschreibung: "System silosowy KORODUR umożliwia ekonomiczne układanie warstw z kruszywem twardym KORODUR dzięki racjonalnej technice pracy: materiał w silosie (np. NEODUR HE 65), zamocowana przy silosie technika mieszania i pompowania oraz obsługa maszynowa. Bez urządzania stanowisk mieszania, bez utylizacji opakowań, stała jakość zaprawy.",
    technischeDaten: [
      { label: "Jednostka silosowa", wert: "22,5 m³" },
      { label: "Wydajność pompowania", wert: "ok. 100 l/min (ok. 600 m² w ok. 1 h)" },
      { label: "Wydajność dzienna", wert: "ok. 1.000–2.000 m² (źródło podaje też 1.000–1.500 m²)" },
      { label: "Odległość tłoczenia", wert: "do 80 m" },
    ],
    besonderheiten: [
      "Jakości do układania: NEODUR HE 65, HE 65 SVS 3, HE 65 SVS 1,5, HE 40",
      "Stała jakość zaprawy, ważna przy wykonaniach barwionych",
    ],
  },
  "korodur-easyfinish": {
    kurzbeschreibung: "Płynny, bezrozpuszczalnikowy, gotowy do użycia środek ułatwiający zacieranie dla NEODUR HE 60 rapid i KOROCRETE",
    beschreibung: "KORODUR easyFinish natryskuje się i wprowadza w powierzchnię NEODUR HE 60 rapid lub KOROCRETE po zatarciu wstępnym, przed pierwszym zacieraniem łopatkowym. Proces zacierania jest ułatwiony, powierzchnia dodatkowo uszlachetniona, szczelność zwiększona, a ochrona przed agresją chemiczną poprawiona.",
    technischeDaten: [
      { label: "Postać", wert: "płynna" },
      { label: "Barwa", wert: "niebieskawa" },
      { label: "Zużycie materiału", wert: "ok. 150 g/m²" },
    ],
    besonderheiten: [
      "Bezrozpuszczalnikowy i gotowy do użycia",
      "Ułatwia proces zacierania",
      "Zwiększa szczelność i ochronę przed agresją chemiczną",
    ],
  },
  "korodur-nanofinish": {
    kurzbeschreibung: "Płynna, gotowa do użycia nanokrzemionka do uszlachetniania posadzek przemysłowych KORODUR",
    beschreibung: "KORODUR nanoFinish spowalnia utratę wilgoci i wydłuża czas obróbki: obróbka powierzchni przy zacieraniu jest ułatwiona również w gorących, suchych i wietrznych warunkach. Technologia nanokrzemionki zamyka wilgoć podczas obróbki powierzchni i umożliwia w ten sposób pełną hydratację z maksymalnym rozwojem wytrzymałości; wykwity i rysy od wczesnego skurczu są zredukowane.",
    technischeDaten: [
      { label: "Postać", wert: "płynna" },
      { label: "Barwa", wert: "mlecznie mętna" },
      { label: "Wartość pH", wert: "5" },
      { label: "Zużycie materiału", wert: "ok. 100 g/m²" },
    ],
    besonderheiten: [
      "Technologia nanokrzemionki",
      "Wydłuża czas obróbki przy zacieraniu",
      "Redukuje wykwity i rysy od wczesnego skurczu",
    ],
  },
  "korodur-uniprimer": {
    kurzbeschreibung: "Bezrozpuszczalnikowy, jednoskładnikowy grunt uniwersalny na bazie kopolimeru akrylowego i krzemianów",
    beschreibung: "KORODUR uniPrimer gruntuje chłonne podłoża betonowe przed wykonaniem cementowych jastrychów z kruszywem twardym i redukuje chłonność suchych podłoży: odpada czasochłonne wstępne nawilżanie przy sanacjach posadzek przemysłowych. Odparowywanie warstwy sczepnej KORODUR HB 5 lub HB 5 rapid jest zminimalizowane, a hydratacja systemu zespolonego bardziej równomierna.",
    technischeDaten: [
      { label: "Postać", wert: "płynna" },
      { label: "Barwa", wert: "mlecznobiała" },
      { label: "Wartość pH", wert: "11,6" },
    ],
    besonderheiten: [
      "Bezrozpuszczalnikowy, jednoskładnikowy, gotowy do użycia",
      "Zastępuje czasochłonne wstępne nawilżanie przy sanacjach",
      "Minimalizuje odparowywanie warstwy sczepnej",
    ],
  },
  "koromineral": {
    kurzbeschreibung: "Płynna, transparentna impregnacja na bazie krzemianów do krzemianowania powierzchni mineralnych materiałów budowlanych",
    beschreibung: "KOROMINERAL impregnuje powierzchnie betonowe i jastrychowe w pomieszczeniach magazynowych i produkcyjnych lub chłodniach. Nadaje się specjalnie do podłoży mineralnych, takich jak jastrychy, cementowe posadzki przemysłowe, beton, zaprawa murarska i tynk cementowy; zwiększa szczelność i działa hydrofobowo.",
    technischeDaten: [
      { label: "Barwa", wert: "transparentna" },
      { label: "Gęstość", wert: "ok. 1,12 g/cm³" },
      { label: "Wartość pH", wert: "ok. 11,3" },
      { label: "Temperatura obróbki", wert: "+5 °C do +35 °C" },
      { label: "Zużycie", wert: "ok. 100–200 g/m² (w zależności od chłonności)" },
    ],
    besonderheiten: [
      "Krzemianowanie powierzchni mineralnych materiałów budowlanych",
      "Zwiększa szczelność, działa hydrofobowo",
    ],
  },
  "koromineral-li": {
    kurzbeschreibung: "Płynna, transparentna impregnacja na bazie hybrydowego krzemianu litu ze zintegrowaną podstawową ochroną przed plamami",
    technischeDaten: [
      { label: "Zużycie", wert: "ok. 40–100 g/m² (w zależności od chłonności)" },
    ],
    besonderheiten: [
      "Hybrydowy krzemian litu",
      "Zintegrowana podstawowa ochrona przed plamami",
    ],
  },
  "koroclean": {
    kurzbeschreibung: "Metoda szlifowania do optycznego uszlachetniania cementowych posadzek przemysłowych (szlif czyszczący)",
    beschreibung: "KOROCLEAN to specjalnie opracowana metoda szlifowania do optycznego uszlachetniania posadzek przemysłowych KORODUR i innych cementowych posadzek przemysłowych. Po obróbce posadzka jest łatwiejsza w czyszczeniu i pielęgnacji, a różnice kolorystyczne zredukowane: technicznie i ekonomicznie sensowna alternatywa dla tradycyjnego czyszczenia końcowego budowy przed oddaniem do użytku.",
    technischeDaten: [
      { label: "Metoda", wert: "Mechaniczny szlif czyszczący (system MKS Funke Schleiftechnik)" },
    ],
    besonderheiten: [
      "Poprawia optykę, bezpieczeństwo i antypoślizgowość",
      "Bezpyłowa, łatwa w czyszczeniu powierzchnia",
      "Zalecane również do posadzek dekoracyjnych KORODUR",
    ],
  },
  "system-korodur-korotan": {
    kurzbeschreibung: "System posadzek przemysłowych: jastrych z kruszywem twardym jednowarstwowo zespolony z warstwą sczepną, grubość nominalna śr. 15 mm",
    beschreibung: "Posadzka przemysłowa KORODUR-KOROTAN to cementowy jastrych z kruszywem twardym KORODUR, układany jednowarstwowo w zespoleniu z warstwą sczepną na stwardniałym betonie nośnym o grubości nominalnej śr. 15 mm. Układanie odbywa się w znacznym stopniu bez spoin; w połączeniu z warstwą sczepną KORODUR HB 5 powstaje mocne połączenie. Jeden z trzech systemów sanacyjnych KORODUR dla posadzek przemysłowych.",
    technischeDaten: [
      { label: "Budowa", wert: "jednowarstwowo w zespoleniu z warstwą sczepną (KORODUR HB 5) na stwardniałym betonie nośnym" },
    ],
    besonderheiten: [
      "Czysto mineralny",
      "W znacznym stopniu bezspoinowy",
      "System sanacyjny dla posadzek przemysłowych",
    ],
  },
  "granidur": {
    kurzbeschreibung: "Szlifowany jastrych dekoracyjny w optyce granitu lub lastryko",
    beschreibung: "GRANIDUR 05 i GRANIDUR 08 to wytwarzane fabrycznie, gotowe do użycia, barwione suche materiały budowlane do wykonywania szlifowanych, dekoracyjnych jastrychów o grubości warstwy od 15 do maks. 70 mm, w zależności od konstrukcji. Finalna optyka granitu lub lastryko może sięgać od matowej do błyszczącej. Układanie jedno- lub dwuwarstwowe zgodnie z DIN 18560-2, -3 (zespolenie z warstwą sczepną KORODUR HB 5) i -4.",
    technischeDaten: [
      { label: "Wytrzymałość na ściskanie (GRANIDUR 05)", wert: "45 N/mm²" },
      { label: "Wytrzymałość na zginanie (GRANIDUR 05)", wert: "6 N/mm²" },
      { label: "Wytrzymałość na ściskanie (GRANIDUR 08)", wert: "35 N/mm²" },
      { label: "Wytrzymałość na zginanie (GRANIDUR 08)", wert: "5 N/mm²" },
    ],
    besonderheiten: [
      "Dostępne kolory: szary cementowy, jasnoszary, szary bazaltowy, antracyt, beż, czerwień, oliwka",
      "Optyka szlifowana od matowej do błyszczącej",
      "Dostępna środowiskowa deklaracja produktowa (EPD grupowa)",
    ],
    varianten: [
      { name: "GRANIDUR 05", qualitaetsklasse: "CT-C45-F6", hinweis: "Uziarnienie 0–5 mm, grubość warstwy 15–25 mm" },
      { name: "GRANIDUR 08", qualitaetsklasse: "CT-C35-F5", hinweis: "Uziarnienie 0–8 mm, grubość warstwy 25–50 mm" },
    ],
  },
  "granidur-bianco-nero": {
    kurzbeschreibung: "Szlifowany jastrych dekoracyjny w bieli (BIANCO) lub czerni (NERO), średnia grubość warstwy 15 mm",
    beschreibung: "GRANIDUR BIANCO i GRANIDUR NERO to wytwarzane fabrycznie, gotowe do użycia suche materiały budowlane do wykonywania szlifowanych, dekoracyjnych jastrychów o średniej grubości warstwy 15 mm. Układanie jednowarstwowe zgodnie z DIN 18560-3 jako jastrych zespolony z warstwą sczepną KORODUR HB 5.",
    technischeDaten: [
      { label: "Uziarnienie", wert: "0–5 mm" },
      { label: "Wytrzymałość na ściskanie", wert: "45 N/mm²" },
      { label: "Wytrzymałość na zginanie", wert: "6 N/mm²" },
    ],
    besonderheiten: [
      "Czysto biała lub głęboko czarna szlifowana optyka",
      "Dostępna środowiskowa deklaracja produktowa (EPD grupowa)",
    ],
    varianten: [
      { name: "GRANIDUR BIANCO" },
      { name: "GRANIDUR NERO" },
    ],
  },
  "kcf": {
    kurzbeschreibung: "Zacierany jastrych dekoracyjny o chmurkowej, marmurkowej optyce",
    beschreibung: "KCF 05 i KCF 08 to wytwarzane fabrycznie, gotowe do użycia, barwione suche materiały budowlane do wykonywania zacieranych, dekoracyjnych jastrychów o grubości warstwy od 15 do maks. 70 mm, w zależności od konstrukcji. Cementowy, zacierany jastrych dekoracyjny opracowany został pod koniec lat 90. wspólnie z włoskim architektem i designerem Alessandro Copettim. Układanie jedno- lub dwuwarstwowe zgodnie z DIN 18560-2, -3 (zespolenie z warstwą sczepną KORODUR HB 5) i -4.",
    technischeDaten: [
      { label: "Ścieralność", wert: "≤ 5 cm³/50 cm²" },
      { label: "Wytrzymałość na ściskanie (KCF 05)", wert: "45 N/mm²" },
      { label: "Wytrzymałość na zginanie (KCF 05)", wert: "6 N/mm²" },
      { label: "Wytrzymałość na ściskanie (KCF 08)", wert: "35 N/mm²" },
      { label: "Wytrzymałość na zginanie (KCF 08)", wert: "5 N/mm²" },
    ],
    besonderheiten: [
      "Dostępne kolory: szary cementowy, jasnoszary, szary bazaltowy, antracyt, beż, czerwień, oliwka",
      "Obróbka powierzchni z KOROCLEAN",
      "Dostępna środowiskowa deklaracja produktowa (EPD grupowa)",
    ],
    varianten: [
      { name: "KCF 05", qualitaetsklasse: "CT-C45-F6-A5", hinweis: "Uziarnienie 0–5 mm, grubość warstwy 15–25 mm" },
      { name: "KCF 08", qualitaetsklasse: "CT-C35-F5-A5", hinweis: "Uziarnienie 0–8 mm, grubość warstwy 25–50 mm" },
      { name: "KCF 05 rapid", hinweis: "szybkotwardniejący, stabilne objętościowo spoiwo na bazie trójskładnikowej" },
    ],
  },
  "tru-pc": {
    kurzbeschreibung: "Samorozlewny, mineralny jastrych dekoracyjny w optyce szlifowanego betonu (technologia Rapid Set)",
    beschreibung: "Rapid Set TRU PC to oparty na specjalnej technologii cementowej, samorozlewny, mineralny jastrych dekoracyjny, opracowany w celu odwzorowania optyki szlifowanego betonu. Idealny, gdy wymagane są wysoka wytrzymałość wczesna, trwałość i twardnienie o niskim skurczu: czas obróbki do 20 minut, ruch pieszy po 2 do 3 godzinach. Posypka dekoracyjna (do 2,5 mm) jest już zawarta.",
    technischeDaten: [
      { label: "Wytrzymałość na ściskanie (ASTM C-109 mod.)", wert: "ok. 19 N/mm² po 4 h, ok. 34 N/mm² po 1 dniu, ok. 48 N/mm² po 28 dniach" },
      { label: "Czas zachowania właściwości roboczych", wert: "ok. 20 minut" },
      { label: "Czas rozpływu", wert: "ok. 15 minut" },
      { label: "Zużycie materiału", wert: "ok. 1,8 kg na m² i mm grubości warstwy" },
      { label: "Barwa", wert: "szary naturalny" },
    ],
    besonderheiten: [
      "Optyka szlifowanego betonu, posypka dekoracyjna do 2,5 mm w zestawie",
      "Możliwość aranżacji w różnych wariantach kolorystycznych",
      "Do wnętrz i na zewnątrz, również w strefach mokrych",
    ],
  },
  "tru-sp": {
    kurzbeschreibung: "Samorozlewny, mineralny jastrych dekoracyjny w optyce sól-pieprz (technologia Rapid Set)",
    beschreibung: "Rapid Set TRU SP to oparty na specjalnej technologii cementowej, samorozlewny, mineralny jastrych dekoracyjny, opracowany w celu odwzorowania optyki szlifowanego betonu w wersji sól-pieprz. Idealny, gdy wymagane są wysoka wytrzymałość wczesna, trwałość i twardnienie o niskim skurczu: czas obróbki do 20 minut, ruch pieszy po 2 do 3 godzinach.",
    technischeDaten: [
      { label: "Wytrzymałość na ściskanie (ASTM C-109 mod.)", wert: "ok. 13 N/mm² po 4 h, ok. 27 N/mm² po 1 dniu, ok. 44 N/mm² po 28 dniach" },
      { label: "Czas zachowania właściwości roboczych", wert: "ok. 20 minut" },
      { label: "Czas rozpływu", wert: "ok. 15 minut" },
      { label: "Zużycie materiału", wert: "ok. 1,8 kg na m² i mm grubości warstwy" },
      { label: "Barwa", wert: "szary naturalny" },
    ],
    besonderheiten: [
      "Optyka sól-pieprz",
      "Możliwość aranżacji w różnych wariantach kolorystycznych",
      "Do wnętrz i na zewnątrz, również w strefach mokrych",
    ],
  },
  "microtop-tw-3": {
    kurzbeschreibung: "Cementowa zaprawa natryskowa w metodzie natrysku suchego do reprofilacji i powlekania w obszarze wody pitnej",
    beschreibung: "MICROTOP TW 3 jest nakładany metodą natrysku suchego i służy do reprofilacji i powlekania powierzchni oraz do zwiększania otuliny betonowej i wykończenia w obszarze wody pitnej. Materiały nakłada się jednowarstwowo, można je bez problemu zacierać packą i wygładzać; małe prace możliwe są ręcznie.",
    technischeDaten: [
      { label: "Uziarnienie", wert: "0–3 mm" },
      { label: "Wytrzymałość na ściskanie (28 d)", wert: "≥ 45 N/mm²" },
      { label: "Porowatość całkowita (90 d)", wert: "≤ 10 % obj." },
    ],
    besonderheiten: [
      "Czysto mineralna, uszlachetniona mikrokrzemionką",
      "Niska porowatość, wodonieprzepuszczalna",
      "Możliwość zacierania i wygładzania",
      "Dostępna środowiskowa deklaracja produktowa (EPD grupowa)",
    ],
  },
  "microtop-tw-5": {
    kurzbeschreibung: "Uszlachetniona mikrokrzemionką cementowa zaprawa natryskowa w metodzie natrysku suchego do zbiorników wody pitnej",
    beschreibung: "MICROTOP TW 5 to czysto mineralna, wiążąca hydraulicznie, uszlachetniona mikrokrzemionką cementowa zaprawa natryskowa do reprofilacji, wyrównywania i powlekania powierzchni w zbiornikach wody pitnej. Nakładanie metodą natrysku suchego (transport rzadkostrumieniowy), również do zwiększania otuliny betonowej i wykończenia. Spełnia wymagania arkuszy roboczych DVGW W 270, W 300 i W 347.",
    technischeDaten: [
      { label: "Uziarnienie", wert: "0–5 mm" },
      { label: "Wytrzymałość na ściskanie", wert: "≥ 45 N/mm²" },
      { label: "Gęstość", wert: "2,25 kg/dm³" },
      { label: "Porowatość całkowita (90 d)", wert: "≤ 10 % obj." },
    ],
    besonderheiten: [
      "Czysto mineralna, wiążąca hydraulicznie, uszlachetniona mikrokrzemionką",
      "Nakładanie jednowarstwowe, możliwość zacierania i wygładzania",
      "Małe prace możliwe ręcznie",
    ],
  },
  "microtop-tw-8": {
    kurzbeschreibung: "Uszlachetniony mikrokrzemionką cementowy beton natryskowy (C30/37) w metodzie natrysku suchego do obszaru wody pitnej",
    beschreibung: "MICROTOP TW 8 to wiążący hydraulicznie, uszlachetniony mikrokrzemionką cementowy beton natryskowy do obszaru wody pitnej, nakładanie zgodnie z DIN 18551. Beton klasy wytrzymałości C30/37 stosowany jest do wykonywania betonu natryskowego metodą natrysku suchego, do reprofilacji ubytków i zwiększania otuliny betonowej. Spełnia wymagania arkuszy roboczych DVGW W 270, W 300 i W 347.",
    technischeDaten: [
      { label: "Uziarnienie", wert: "0–8 mm" },
      { label: "Wytrzymałość na ściskanie", wert: "≥ 45 N/mm²" },
      { label: "Gęstość", wert: "2,27 kg/dm³" },
      { label: "Porowatość całkowita (90 d)", wert: "≤ 10 % obj." },
    ],
    besonderheiten: [
      "Klasa wytrzymałości C30/37",
      "Uszlachetniony mikrokrzemionką, wiążący hydraulicznie",
      "Możliwość zacierania i wygładzania, małe prace ręcznie",
    ],
  },
  "microtop-tw-nsm": {
    kurzbeschreibung: "Zaprawa natryskowa w metodzie natrysku mokrego do reprofilacji i powlekania w obszarze wody pitnej",
    beschreibung: "MICROTOP TW NSM jest nakładany metodą natrysku mokrego i służy do reprofilacji i powlekania powierzchni oraz do zwiększania otuliny betonowej i wykończenia w obszarze wody pitnej. Materiały można bez problemu zacierać packą i wygładzać; małe prace możliwe są ręcznie w połączeniu z warstwą sczepną.",
    technischeDaten: [
      { label: "Uziarnienie", wert: "0–3 mm" },
      { label: "Grubość warstwy", wert: "ok. 20 mm, jednowarstwowo" },
      { label: "Dodatek wody", wert: "ok. 3,6 l na opakowanie 25 kg" },
      { label: "Kolory", wert: "naturalny, biały, niebieski" },
      { label: "Metoda", wert: "natrysk mokry (transport gęstostrumieniowy, niewielkie pylenie)" },
    ],
    besonderheiten: [
      "Możliwość zacierania i wygładzania",
      "Ręczne wykonanie małych prac możliwe z warstwą sczepną",
    ],
    varianten: [
      { name: "MICROTOP TW NSM blau" },
    ],
  },
  "microtop-tw-02": {
    kurzbeschreibung: "Zaprawa natryskowa w metodzie natrysku mokrego gęstostrumieniowego o wyjątkowo niskiej zawartości porów",
    beschreibung: "MICROTOP TW 02 jest nakładany metodą natrysku mokrego gęstostrumieniowego i służy do powlekania powierzchni oraz do zwiększania otuliny betonowej i wykończenia w obszarze wody pitnej. Produkt ma wyjątkowo niską zawartość porów i może być stosowany również jako ochrona antykorozyjna i warstwa sczepna.",
    technischeDaten: [
      { label: "Uziarnienie", wert: "0–0,2 mm" },
      { label: "Grubość warstwy", wert: "ok. 2–5 mm" },
      { label: "Dodatek wody", wert: "ok. 5–6,25 l na opakowanie 25 kg" },
      { label: "Metoda", wert: "nakładanie odśrodkowe, natrysk, szpachlowanie, nakładanie ręczne" },
    ],
    besonderheiten: [
      "Wyjątkowo niska zawartość porów",
      "Do zastosowania również jako ochrona antykorozyjna i warstwa sczepna",
    ],
  },
  "microtop-tw-vsm": {
    kurzbeschreibung: "Zaprawa natrysku wstępnego (warstwa sczepna) do wykładania od wewnątrz i napraw zbiorników wody pitnej oraz muru",
    beschreibung: "MICROTOP TW VSM służy do wykładania od wewnątrz i napraw nowych oraz starych zbiorników wody pitnej, a także muru. Dzięki specjalnemu składowi ma znakomite właściwości robocze i użytkowe; można go bez problemu zacierać packą i wygładzać.",
    technischeDaten: [
      { label: "Uziarnienie", wert: "0–2 mm" },
      { label: "Grubość warstwy", wert: "ok. 15–20 mm" },
      { label: "Dodatek wody", wert: "ok. 3,75 l na opakowanie 25 kg" },
      { label: "Wydajność", wert: "ok. 14 l na opakowanie 25 kg" },
      { label: "Metoda", wert: "natrysk, nakładanie ręczne" },
    ],
    besonderheiten: [
      "Odpowiedni również do muru",
      "Możliwość zacierania i wygładzania",
    ],
  },
  "microtop-tw-bm": {
    kurzbeschreibung: "Zaprawa specjalna do powlekania od wewnątrz rur i zbiorników wody pitnej, również jako warstwa sczepna",
    beschreibung: "MICROTOP TW BM to wytwarzana fabrycznie, gotowa do użycia zaprawa specjalna do powlekania od wewnątrz rur i zbiorników wody pitnej oraz innych obiektów. Można ją bez problemu nakładać metodą odśrodkową, natryskiem i ręcznie; nadaje się również jako warstwa sczepna pod powłoki podłogowe i jako ochrona antykorozyjna, dostarczana w kolorze naturalnym i białym. Spełnia wymagania arkuszy roboczych DVGW W 270, W 300 i W 347.",
    technischeDaten: [
      { label: "Uziarnienie", wert: "0–1 mm" },
      { label: "Wytrzymałość na ściskanie", wert: "35 N/mm²" },
      { label: "Wytrzymałość na zginanie", wert: "6,3 N/mm²" },
      { label: "Kolory", wert: "naturalny, biały" },
      { label: "Grubość warstwy (wykładanie rur/zbiorników)", wert: "5–8 mm" },
      { label: "Grubość warstwy (ochrona antykorozyjna/warstwa sczepna)", wert: "2–5 mm" },
    ],
    besonderheiten: [
      "Nakładanie odśrodkowe, natryskowe i ręczne",
      "Do zastosowania również jako warstwa sczepna i ochrona antykorozyjna",
      "Dostępna w kolorze naturalnym i białym",
    ],
    varianten: [
      { name: "MICROTOP TW BM weiß" },
      { name: "MICROTOP TW BM blau" },
    ],
  },
  "microtop-tw-mineral": {
    kurzbeschreibung: "Płynny środek ochrony budowli na bazie krzemianów do wzmacniania i uszczelniania powierzchni",
    beschreibung: "MICROTOP TW Mineral powoduje wzmocnienie mineralnych materiałów budowlanych i porowatych podłoży poprzez reakcję chemiczną ze spoiwami i kruszywami podłoża (reakcja krzemianowania) oraz poprawia strukturę przy jednoczesnym uszczelnieniu powierzchni. Służy jako impregnacja w systemie MICROTOP.",
    technischeDaten: [
      { label: "Postać", wert: "płynna" },
      { label: "Barwa", wert: "transparentna" },
      { label: "Gęstość", wert: "ok. 1,14 g/cm³" },
      { label: "Wartość pH", wert: "ok. 11,3" },
    ],
    besonderheiten: [
      "Reakcja krzemianowania z podłożem",
      "Wzmocnienie i uszczelnienie w jednym cyklu roboczym",
      "Impregnacja do wszystkich zapraw MICROTOP TW",
    ],
  },
  "neodur-vm-1": {
    kurzbeschreibung: "Zaprawa do podlewek o przekroju podlewki od 5 do 20 mm",
    beschreibung: "Zaprawy montażowe i do podlewek łączą beton w sposób przenoszący siły ze stalowymi elementami wbudowanymi. NEODUR VM 1 jest przeznaczony do przekrojów podlewki od 5 do 20 mm.",
    technischeDaten: [
      { label: "Przekrój podlewki", wert: "5–20 mm" },
    ],
    besonderheiten: [
      "Mocne połączenie betonu ze stalowymi elementami wbudowanymi",
      "Dostępna środowiskowa deklaracja produktowa (EPD grupowa)",
    ],
  },
  "neodur-vm-3": {
    kurzbeschreibung: "Zaprawa do podlewek o przekroju podlewki od 10 do 50 mm",
    beschreibung: "Zaprawy montażowe i do podlewek łączą beton w sposób przenoszący siły ze stalowymi elementami wbudowanymi. NEODUR VM 3 jest przeznaczony do przekrojów podlewki od 10 do 50 mm.",
    technischeDaten: [
      { label: "Przekrój podlewki", wert: "10–50 mm" },
    ],
    besonderheiten: [
      "Mocne połączenie betonu ze stalowymi elementami wbudowanymi",
    ],
  },
  "neodur-vm-5": {
    kurzbeschreibung: "Beton do podlewek (C80/95) o przekroju podlewki do 200 mm, badany wg DIN EN 1504-3 (R4)",
    beschreibung: "Beton montażowy i do podlewek do dużych przekrojów podlewki do 200 mm. Badany według DIN EN 1504-3 (klasa R4) oraz wytycznej DAfStb dla cementowych betonów i zapraw do podlewek.",
    technischeDaten: [
      { label: "Przekrój podlewki", wert: "do 200 mm" },
    ],
    besonderheiten: [
      "Do zastosowań istotnych statycznie (R4)",
      "Wytyczna DAfStb (SKVB I)",
    ],
  },
  "neodur-vb-8": {
    kurzbeschreibung: "Beton do podlewek o przekroju podlewki powyżej 50 mm",
    beschreibung: "Beton montażowy i do podlewek do przekrojów podlewki powyżej 50 mm. Łączy beton w sposób przenoszący siły ze stalowymi elementami wbudowanymi.",
    technischeDaten: [
      { label: "Przekrój podlewki", wert: "powyżej 50 mm" },
    ],
    besonderheiten: [
      "Mocne połączenie betonu ze stalowymi elementami wbudowanymi",
    ],
  },
  "neodur-vm-basic": {
    kurzbeschreibung: "Mineralny, wysokopłynny ekspansywny beton do podlewek, badany przez DVGW do obszarów wody pitnej",
    beschreibung: "NEODUR VM basic to mineralny, wysokopłynny ekspansywny beton do podlewek, przeznaczony do przenoszących siły prac podlewkowych i montaży wszelkiego rodzaju, np. podlewania rur w instalacjach wody pitnej. Badany zgodnie z arkuszem roboczym DVGW W 347 pod kątem wymagań higienicznych w obszarach wody pitnej.",
    technischeDaten: [
      { label: "Uziarnienie", wert: "0–5 mm" },
      { label: "Obróbka", wert: "mieszanie + pompowanie / zalewanie" },
      { label: "Forma dostawy", wert: "opakowania 25 kg" },
    ],
    besonderheiten: [
      "Niski skurcz, normalnie wiążący",
      "Mrozoodporny i odporny na sole odladzające",
      "Wodonieprzepuszczalny, bez chlorków",
      "Wytyczna DAfStb (SKVB II)",
    ],
  },
  "neodur-svm-03": {
    kurzbeschreibung: "Szybka zaprawa do podlewek o przekroju podlewki od 5 do 20 mm",
    beschreibung: "Szybkotwardniejąca zaprawa do podlewek o przekroju podlewki od 5 do 20 mm. Łączy beton w sposób przenoszący siły ze stalowymi elementami wbudowanymi, gdy wymagane jest szybkie ponowne oddanie do użytku.",
    technischeDaten: [
      { label: "Przekrój podlewki", wert: "5–20 mm" },
    ],
    besonderheiten: [
      "Szybkotwardniejąca",
      "Dostępna środowiskowa deklaracja produktowa (EPD grupowa)",
    ],
  },
  "neodur-msm-3": {
    kurzbeschreibung: "Zaprawa natryskowa do napraw betonu, uziarnienie 0 do 3 mm",
    beschreibung: "Naprawa betonu obejmuje technologie odtwarzania elementów konstrukcji z betonu. NEODUR MSM 3 to mineralna zaprawa natryskowa o uziarnieniu 0 do 3 mm, nakładanie zgodnie z DIN 18551 w połączeniu z DIN EN 14487.",
    technischeDaten: [
      { label: "Uziarnienie", wert: "0–3 mm" },
    ],
    besonderheiten: [
      "Dostępna środowiskowa deklaracja produktowa (EPD grupowa)",
    ],
  },
  "neodur-msm-5": {
    kurzbeschreibung: "Zaprawa natryskowa do napraw betonu, uziarnienie 0 do 5 mm",
    beschreibung: "Naprawa betonu obejmuje technologie odtwarzania elementów konstrukcji z betonu. NEODUR MSM 5 to mineralna zaprawa natryskowa o uziarnieniu 0 do 5 mm.",
    technischeDaten: [
      { label: "Uziarnienie", wert: "0–5 mm" },
    ],
  },
  "neodur-msb-8": {
    kurzbeschreibung: "Beton natryskowy do napraw betonu, uziarnienie 0 do 8 mm",
    beschreibung: "Naprawa betonu obejmuje technologie odtwarzania elementów konstrukcji z betonu. NEODUR MSB 8 to mineralny beton natryskowy o uziarnieniu 0 do 8 mm.",
    technischeDaten: [
      { label: "Uziarnienie", wert: "0–8 mm" },
    ],
  },
  "rapid-set-concrete-mix": {
    kurzbeschreibung: "Szybkotwardniejący szybki beton do grubości wbudowania od 50 do 600 mm, pełna nośność po 1 godzinie",
    beschreibung: "CONCRETE MIX to szybkotwardniejąca, łatwa w obróbce zaprawa naprawcza na bazie cementu Rapid Set ze specjalnie dobranymi kruszywami mineralnymi. Idealna tam, gdzie wymagane są szybkie wytrzymałości, trwałość i twardnienie o niskim skurczu. Możliwość wbudowania w grubościach od 50 do 600 mm, również w pomieszczeniach mokrych; niemetaliczna i bez dodatków chlorków.",
    technischeDaten: [
      { label: "Uziarnienie", wert: "0–8 mm" },
      { label: "Początek wiązania", wert: "po 15 min" },
      { label: "Pełna nośność", wert: "po 60 min" },
      { label: "Wytrzymałość na ściskanie", wert: "19 N/mm² po 60 min, 41 N/mm² po 28 dniach" },
      { label: "Wytrzymałość na zginanie", wert: "4,5 N/mm² po 60 min, 7 N/mm² po 28 dniach" },
      { label: "Odporność na mróz i sole odladzające", wert: "tak" },
      { label: "Odporność na siarczany", wert: "tak" },
    ],
    besonderheiten: [
      "Grubości wbudowania do 600 mm w jednym cyklu roboczym",
      "Niemetaliczny, bez dodatków chlorków",
      "Odpowiedni w pomieszczeniach mokrych",
    ],
  },
  "rapid-set-concrete-pharmacy": {
    kurzbeschreibung: "System dodatków do sterowania właściwościami roboczymi produktów Rapid Set",
    beschreibung: "CONCRETE PHARMACY obejmuje trzy dodatki do sterowania właściwościami roboczymi produktów Rapid Set: SET Control opóźnia czas wiązania i wydłuża czas zachowania właściwości roboczych, FLOW Control poprawia płynność i redukuje zapotrzebowanie na wodę zarobową o 20 do 40 procent, FAST przyspiesza czas wiązania CEMENT ALL, MORTAR MIX i CONCRETE MIX, idealny przy niskich temperaturach.",
    besonderheiten: [
      "Działa na CEMENT ALL, MORTAR MIX i CONCRETE MIX",
      "FLOW Control: 20–40 % mniej wody zarobowej przy tym samym rozpływie",
    ],
    varianten: [
      { name: "SET Control", hinweis: "Opóźniacz wydłużający czas zachowania właściwości roboczych" },
      { name: "FLOW Control", hinweis: "Upłynniacz, zwiększa wytrzymałości" },
      { name: "FAST Control", hinweis: "Przyspieszacz do niskich temperatur" },
    ],
  },
  "koromineral-lasur": {
    kurzbeschreibung: "Specjalna impregnacja z barwnym uszlachetnieniem powierzchni na bazie krzemianu litu",
    beschreibung: "KOROMINERAL Lasur stosuje się do impregnacji powierzchni jastrychowych i betonowych na bazie cementu, a specjalnie jastrychów KORODUR. Dzięki pigmentacji powstaje barwne uszlachetnienie powierzchni. Obróbka wałkiem nylonowym o krótkim włosiu w dwóch przejściach na krzyż.",
    technischeDaten: [
      { label: "Forma", wert: "płynna" },
      { label: "Kolory", wert: "szary kamienny, szary mysi (bez kolorów RAL)" },
      { label: "Temperatura powierzchni", wert: "+10 °C do +25 °C" },
      { label: "Czas schnięcia między przejściami", wert: "1–3 godziny (w zależności od temperatury)" },
    ],
    besonderheiten: [
      "Barwne uszlachetnienie powierzchni na bazie krzemianu litu",
      "Dwa przejścia na krzyż",
    ],
  },
  "neodur-pfm-1k-easyfix": {
    kurzbeschreibung: "Gotowa do użycia, 1-składnikowa zaprawa do fugowania kostki brukowej do stref pieszych",
    beschreibung: "NEODUR PFM 1K Easyfix służy do fugowania i renowacji nawierzchni brukowych przy lekkim obciążeniu, np. tarasów i chodników. Do szerokości fug od 5 mm i głębokości fug od 30 mm.",
    technischeDaten: [
      { label: "Kolory", wert: "naturalny, szary kamienny, bazalt" },
      { label: "Gęstość stwardniałej zaprawy", wert: "ok. 1,37 kg/dm³" },
      { label: "Wytrzymałość na ściskanie", wert: "≥ 4,0 N/mm²" },
      { label: "Wytrzymałość na zginanie", wert: "≥ 2,2 N/mm²" },
      { label: "Czas obróbki", wert: "ok. 20–30 minut" },
      { label: "Temperatura", wert: "podłoże > 8 °C, obróbka > 10 °C" },
      { label: "Ruch pieszy", wert: "po 24 godzinach" },
    ],
    besonderheiten: [
      "Gotowa do użycia, 1-składnikowa",
      "Szerokość fugi od 5 mm, głębokość fugi od 30 mm",
      "Tylko strefy piesze (lekkie obciążenie)",
    ],
  },
  "neodur-pfm-ze": {
    kurzbeschreibung: "Zaprawa do fugowania kostki brukowej na bazie cementu do nawierzchni brukowych i płytowych w konstrukcji sztywnej",
    beschreibung: "NEODUR PFM-ZE i PFM-ZE Flex to fabrycznie produkowane zaprawy suche na bazie cementu i piasku naturalnego (0–2 mm) do nowego fugowania kostki kamiennej i betonowej lub płyt betonowych w konstrukcji sztywnej, klasa budowlana IV do VI. Szerokość fugi powinna wynosić co najmniej 8 mm.",
    technischeDaten: [
      { label: "Baza", wert: "baza cementowo-piaskowa (piasek naturalny), uziarnienie 0–2 mm" },
      { label: "Czas obróbki", wert: "ok. 40 minut" },
      { label: "Temperatura obróbki", wert: "+5 °C do +25 °C" },
      { label: "Obciążalność", wert: "samochodami osobowymi po 7 dniach" },
      { label: "Forma dostawy", wert: "specjalne opakowanie papierowe 25 kg" },
    ],
    besonderheiten: [
      "Konstrukcja sztywna, klasa budowlana IV do VI",
      "Pielęgnacja: 7 dni przykrycia folią",
    ],
    varianten: [
      { name: "NEODUR PFM-ZE", hinweis: "Nawierzchnie brukowe · szary/jasnoszary · wytrzymałość na ściskanie ≥ 50 N/mm²" },
      { name: "NEODUR PFM-ZE Flex", hinweis: "Nawierzchnie płytowe · szary · wytrzymałość na ściskanie ≥ 40 N/mm²" },
    ],
  },
};
