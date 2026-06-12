// Cloudflare Web Analytics (cookieless, kein Consent-Banner nötig).
// Rendert nur, wenn NEXT_PUBLIC_CF_BEACON_TOKEN zur Build-Zeit gesetzt ist
// (Repo-Variable CF_BEACON_TOKEN im Deploy-Workflow). Launch-Plan M2:
// Tag-1-Messung ab Cutover, Datenschutzerklärung nennt den Dienst.
export default function Analytics() {
  const token = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;
  if (!token) return null;
  return (
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
    />
  );
}
