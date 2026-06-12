import type { Metadata } from "next";
import { getDictionary, hasLocale } from "../dictionaries";
import { LOCALES } from "../../../lib/i18n";
import { notFound } from "next/navigation";
import { alternatesFor } from "../../../lib/seo";
import { KORODUR_FIRMA, KORODUR_ZENTRALE } from "../../../lib/kontaktDaten";

// Basis: Datenschutzerklärung von korodur.de (Stand 5.2.2025, Wayback-Snapshot
// 2026-01-31). Pflichtinformationen wörtlich übernommen; Dienste-Abschnitte an
// die neue statische Site angepasst: entfallen sind WordPress-Funktionen
// (Kommentare, Newsletter/Rapidmail, YouTube-Embeds, Google Maps, Font Awesome,
// UNN-Zählpixel), ergänzt sind GitHub Pages (Hosting bis zum Domain-Cutover)
// und Cloudflare Web Analytics (cookieless). Launch-Plan M2/B3.
// BEIM CUTOVER: Hosting-Abschnitt auf den finalen Hoster umstellen (M4).

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.footer.datenschutz,
    alternates: alternatesFor(lang, "/datenschutz/"),
  };
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="m-0 mt-10 mb-3 text-[22px]" style={{ fontWeight: 900 }}>
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="m-0 mt-6 mb-2 text-[17px]" style={{ fontWeight: 800 }}>
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="m-0 mb-3">{children}</p>;
}

export default async function DatenschutzPage({ params }: { params: Params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <section style={{ padding: "48px 32px 88px" }}>
      <div className="mx-auto text-navy text-[15px] leading-[1.7]" style={{ maxWidth: 760 }}>
        <h1 className="mb-6" style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 900 }}>
          Datenschutzerklärung
        </h1>
        {lang !== "de" && (
          <p className="text-navy/60 text-[14px] mb-8 italic">
            {dict.rechtliches.sprachhinweis}
          </p>
        )}

        <H2>1. Datenschutz auf einen Blick</H2>
        <H3>Allgemeine Hinweise</H3>
        <P>
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
          personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
          Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
          Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem
          Text aufgeführten Datenschutzerklärung.
        </P>
        <H3>Datenerfassung auf dieser Website</H3>
        <P>
          <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>
          <br />
          Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
          Kontaktdaten können Sie dem Abschnitt „Hinweis zur verantwortlichen Stelle" in dieser
          Datenschutzerklärung entnehmen.
        </P>
        <P>
          <strong>Wie erfassen wir Ihre Daten?</strong>
          <br />
          Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei
          kann es sich z.&nbsp;B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
          Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website
          durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.&nbsp;B.
          Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser
          Daten erfolgt automatisch, sobald Sie diese Website betreten.
        </P>
        <P>
          <strong>Wofür nutzen wir Ihre Daten?</strong>
          <br />
          Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu
          gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet
          werden. Sofern über die Website Verträge geschlossen oder angebahnt werden können,
          werden die übermittelten Daten auch für Vertragsangebote, Bestellungen oder sonstige
          Auftragsanfragen verarbeitet.
        </P>
        <P>
          <strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong>
          <br />
          Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und
          Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein
          Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine
          Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung
          jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten
          Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu
          verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen
          Aufsichtsbehörde zu. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie
          sich jederzeit an uns wenden.
        </P>

        <H2>2. Hosting und Content Delivery Networks (CDN)</H2>
        <H3>Externes Hosting</H3>
        <P>
          Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser
          Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann
          es sich v.&nbsp;a. um IP-Adressen, Meta- und Kommunikationsdaten, Websitezugriffe und
          sonstige Daten, die über eine Website generiert werden, handeln.
        </P>
        <P>
          Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren
          potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse
          einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots
          durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO). Unser Hoster wird
          Ihre Daten nur insoweit verarbeiten, wie dies zur Erfüllung seiner Leistungspflichten
          erforderlich ist, und unsere Weisungen in Bezug auf diese Daten befolgen.
        </P>
        <P>
          Wir setzen folgenden Hoster ein: GitHub Inc., 88 Colin P. Kelly Jr. Street, San
          Francisco, CA 94107, USA (GitHub Pages). GitHub verfügt über eine Zertifizierung nach
          dem „EU-US Data Privacy Framework" (DPF).
        </P>
        <H3>Cloudflare</H3>
        <P>
          Wir nutzen den Service „Cloudflare". Anbieter ist die Cloudflare Inc., 101 Townsend
          St., San Francisco, CA 94107, USA (im Folgenden „Cloudflare").
        </P>
        <P>
          Cloudflare bietet ein weltweit verteiltes Content Delivery Network mit DNS an. Dabei
          wird technisch der Informationstransfer zwischen Ihrem Browser und unserer Website
          über das Netzwerk von Cloudflare geleitet. Das versetzt Cloudflare in die Lage, den
          Datenverkehr zwischen Ihrem Browser und unserer Website zu analysieren und als Filter
          zwischen unseren Servern und potenziell bösartigem Datenverkehr aus dem Internet zu
          dienen. Hierbei kann Cloudflare auch Cookies oder sonstige Technologien zur
          Wiedererkennung von Internetnutzern einsetzen, die jedoch allein zum hier
          beschriebenen Zweck verwendet werden.
        </P>
        <P>
          Der Einsatz von Cloudflare beruht auf unserem berechtigten Interesse an einer
          möglichst fehlerfreien und sicheren Bereitstellung unseres Webangebotes (Art. 6 Abs.
          1 lit. f DSGVO). Cloudflare verfügt über eine Zertifizierung nach dem „EU-US Data
          Privacy Framework" (DPF). Der DPF ist ein Übereinkommen zwischen der Europäischen
          Union und den USA, der die Einhaltung europäischer Datenschutzstandards bei
          Datenverarbeitungen in den USA gewährleisten soll. Jedes nach dem DPF zertifizierte
          Unternehmen verpflichtet sich, diese Datenschutzstandards einzuhalten. Informationen
          zum Thema Sicherheit und Datenschutz bei Cloudflare finden Sie hier:{" "}
          <a
            href="https://www.cloudflare.com/privacypolicy/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan"
          >
            https://www.cloudflare.com/privacypolicy/
          </a>
          .
        </P>

        <H2>3. Allgemeine Hinweise und Pflichtinformationen</H2>
        <H3>Datenschutz</H3>
        <P>
          Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
          Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den
          gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
        </P>
        <P>
          Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben.
          Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden
          können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und
          wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
        </P>
        <P>
          Wir weisen darauf hin, dass die Datenübertragung im Internet (z.&nbsp;B. bei der
          Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz
          der Daten vor dem Zugriff durch Dritte ist nicht möglich.
        </P>
        <H3>Hinweis zur verantwortlichen Stelle</H3>
        <P>
          Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
        </P>
        <P>
          {KORODUR_FIRMA}
          <br />
          Nikola Heckmann
          <br />
          {KORODUR_ZENTRALE.strasse}
          <br />
          {KORODUR_ZENTRALE.plzOrt}
          <br />
          Deutschland
        </P>
        <P>
          Telefon: {KORODUR_ZENTRALE.telefon}
          <br />
          E-Mail: <a href={`mailto:${KORODUR_ZENTRALE.email}`} className="text-cyan">{KORODUR_ZENTRALE.email}</a>
        </P>
        <P>
          Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder
          gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von
          personenbezogenen Daten (z.&nbsp;B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
        </P>
        <H3>Speicherdauer</H3>
        <P>
          Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt
          wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die
          Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen
          oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht,
          sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer
          personenbezogenen Daten haben (z.&nbsp;B. steuer- oder handelsrechtliche
          Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall
          dieser Gründe.
        </P>
        <H3>Datenschutzbeauftragter</H3>
        <P>Wir haben einen Datenschutzbeauftragten benannt:</P>
        <P>
          DataCo GmbH
          <br />
          Kivanç Semen
          <br />
          Dachauer Straße 65
          <br />
          80803 München
          <br />
          Deutschland
          <br />
          E-Mail:{" "}
          <a href="mailto:datenschutz@dataguard.de" className="text-cyan">
            datenschutz@dataguard.de
          </a>
        </P>
        <H3>Hinweis zur Datenweitergabe in die USA und sonstige Drittstaaten</H3>
        <P>
          Wir verwenden unter anderem Tools von Unternehmen mit Sitz in den USA. Eine
          Datenübertragung in die USA ist zulässig, wenn der Empfänger eine Zertifizierung
          unter dem „EU-US Data Privacy Framework" (DPF) besitzt oder über geeignete
          zusätzliche Garantien verfügt. Informationen zu Übermittlungen an Drittstaaten
          einschließlich der Datenempfänger finden Sie in dieser Datenschutzerklärung.
        </P>
        <H3>Empfänger von personenbezogenen Daten</H3>
        <P>
          Im Rahmen unserer Geschäftstätigkeit arbeiten wir mit verschiedenen externen Stellen
          zusammen. Dabei ist teilweise auch eine Übermittlung von personenbezogenen Daten an
          diese externen Stellen erforderlich. Wir geben personenbezogene Daten nur dann an
          externe Stellen weiter, wenn dies im Rahmen einer Vertragserfüllung erforderlich ist,
          wenn wir gesetzlich hierzu verpflichtet sind (z.&nbsp;B. Weitergabe von Daten an
          Steuerbehörden), wenn wir ein berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO
          an der Weitergabe haben oder wenn eine sonstige Rechtsgrundlage die Datenweitergabe
          erlaubt. Beim Einsatz von Auftragsverarbeitern geben wir personenbezogene Daten
          unserer Kunden nur auf Grundlage eines gültigen Vertrags über Auftragsverarbeitung
          weiter.
        </P>
        <H3>Widerruf Ihrer Einwilligung zur Datenverarbeitung</H3>
        <P>
          Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung
          möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die
          Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf
          unberührt.
        </P>
        <H3>
          Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen
          Direktwerbung (Art. 21 DSGVO)
        </H3>
        <P>
          WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO
          ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN
          SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH
          EINZULEGEN; DIES GILT AUCH FÜR EIN AUF DIESE BESTIMMUNGEN GESTÜTZTES PROFILING. DIE
          JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE DIESER
          DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE BETROFFENEN
          PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE
          SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND
          FREIHEITEN ÜBERWIEGEN ODER DIE VERARBEITUNG DIENT DER GELTENDMACHUNG, AUSÜBUNG ODER
          VERTEIDIGUNG VON RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).
        </P>
        <P>
          WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, SO
          HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER
          PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH FÜR
          DAS PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN SIE
          WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT MEHR ZUM
          ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO).
        </P>
        <H3>Beschwerderecht bei der zuständigen Aufsichtsbehörde</H3>
        <P>
          Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei
          einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen
          Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das
          Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder
          gerichtlicher Rechtsbehelfe.
        </P>
        <H3>Recht auf Datenübertragbarkeit</H3>
        <P>
          Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in
          Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in
          einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die
          direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt
          dies nur, soweit es technisch machbar ist.
        </P>
        <H3>Auskunft, Berichtigung und Löschung</H3>
        <P>
          Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf
          unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren
          Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf
          Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema
          personenbezogene Daten können Sie sich jederzeit an uns wenden.
        </P>
        <H3>Recht auf Einschränkung der Verarbeitung</H3>
        <P>
          Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten
          zu verlangen. Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf
          Einschränkung der Verarbeitung besteht in folgenden Fällen:
        </P>
        <ul className="m-0 mb-3 pl-5 flex flex-col gap-2">
          <li>
            Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten
            bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer
            der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer
            personenbezogenen Daten zu verlangen.
          </li>
          <li>
            Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht,
            können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.
          </li>
          <li>
            Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur
            Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben
            Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer
            personenbezogenen Daten zu verlangen.
          </li>
          <li>
            Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine
            Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch
            nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die
            Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
          </li>
        </ul>
        <P>
          Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen
          diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur
          Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der
          Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines
          wichtigen öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats
          verarbeitet werden.
        </P>
        <H3>SSL- bzw. TLS-Verschlüsselung</H3>
        <P>
          Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung
          vertraulicher Inhalte, wie zum Beispiel Anfragen, die Sie an uns als Seitenbetreiber
          senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen
          Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt
          und an dem Schloss-Symbol in Ihrer Browserzeile. Wenn die SSL- bzw.
          TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln,
          nicht von Dritten mitgelesen werden.
        </P>

        <H2>4. Datenerfassung auf dieser Website</H2>
        <H3>Cookies</H3>
        <P>
          Diese Website setzt selbst keine Cookies und keine Tracking-Technologien mit
          Personenbezug ein. Unser CDN-Dienstleister Cloudflare kann technisch notwendige
          Cookies zur Sicherheit und Lastverteilung setzen (siehe Abschnitt „Cloudflare").
          Zur Offline-Fähigkeit speichert die Website Seiteninhalte im lokalen Cache Ihres
          Browsers (Service Worker); dabei werden keine personenbezogenen Daten erfasst oder
          übertragen.
        </P>
        <H3>Server-Log-Dateien</H3>
        <P>
          Der Provider der Seiten erhebt und speichert automatisch Informationen in so
          genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies
          sind: Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL,
          Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse. Eine
          Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die
          Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der
          Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien
          Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files
          erfasst werden.
        </P>
        <H3>Kontaktformular</H3>
        <P>
          Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus
          dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks
          Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
          Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Das Formular übermittelt
          Ihre Anfrage als E-Mail an {KORODUR_ZENTRALE.email}.
        </P>
        <P>
          Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO,
          sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur
          Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen
          beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven
          Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf
          Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), sofern diese abgefragt wurde; die
          Einwilligung ist jederzeit widerrufbar.
        </P>
        <P>
          Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns
          zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck
          für die Datenspeicherung entfällt (z.&nbsp;B. nach abgeschlossener Bearbeitung Ihrer
          Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen –
          bleiben unberührt.
        </P>
        <H3>Anfrage per E-Mail, Telefon oder Telefax</H3>
        <P>
          Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage
          inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum
          Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese
          Daten geben wir nicht ohne Ihre Einwilligung weiter.
        </P>
        <P>
          Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO,
          sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur
          Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen
          beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven
          Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf
          Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), sofern diese abgefragt wurde; die
          Einwilligung ist jederzeit widerrufbar.
        </P>
        <P>
          Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis
          Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder
          der Zweck für die Datenspeicherung entfällt (z.&nbsp;B. nach abgeschlossener
          Bearbeitung Ihres Anliegens). Zwingende gesetzliche Bestimmungen – insbesondere
          gesetzliche Aufbewahrungsfristen – bleiben unberührt.
        </P>

        <H2>5. Analyse-Tools</H2>
        <H3>Cloudflare Web Analytics</H3>
        <P>
          Diese Website nutzt Cloudflare Web Analytics, einen Webanalysedienst der Cloudflare
          Inc., 101 Townsend St., San Francisco, CA 94107, USA. Cloudflare Web Analytics
          arbeitet ohne Cookies, ohne LocalStorage und ohne geräteübergreifende Identifier;
          IP-Adressen werden nicht zur Nutzerverfolgung gespeichert. Erfasst werden aggregierte
          Zugriffsdaten (z.&nbsp;B. aufgerufene Seiten, Referrer, Browsertyp, Land). Die
          Nutzung erfolgt auf Grundlage unseres berechtigten Interesses an der Analyse und
          Optimierung unseres Webangebots (Art. 6 Abs. 1 lit. f DSGVO). Cloudflare verfügt
          über eine Zertifizierung nach dem „EU-US Data Privacy Framework" (DPF).
        </P>

        <H2>6. Plugins und Tools</H2>
        <H3>Schriftarten (lokales Hosting)</H3>
        <P>
          Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten die Schriftart
          Gabarito. Die Schriftdateien sind lokal auf unserem Server installiert. Eine
          Verbindung zu Servern von Google oder anderen Drittanbietern findet dabei nicht
          statt.
        </P>

        <p className="mt-10 mb-0 text-[13px] text-navy/50">
          Stand: Juni 2026. Diese Erklärung basiert auf der Datenschutzerklärung von
          korodur.de (Stand 5.&nbsp;Februar 2025) und wurde an den technischen Stand dieser
          Website angepasst.
        </p>
      </div>
    </section>
  );
}
