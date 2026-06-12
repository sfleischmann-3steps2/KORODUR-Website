const CACHE_NAME = "korodur-v5";

// Install: cache app shell.
// Pfade RELATIV zum SW-Scope ("./de/" statt "/de/"), damit der
// GitHub-Pages-basePath mitkommt — absolute Pfade liefen dort auf 404,
// addAll rejectete und die SW-Installation schlug in Production fehl.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll([
        "./",
        "./de/",
        "./en/",
        "./fr/",
        "./pl/",
        "./images/brand/hero-keyvisual.jpg",
        "./images/brand/logo-korodur.png",
      ])
    )
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

// Fetch-Strategie:
// - Unveränderliche Assets (content-gehashte /_next/static/, Bilder, Fonts):
//   cache-first. Bei Hash-Wechsel ändert sich die URL, also nie stale.
// - Alles andere (HTML, NICHT gehashte JS/CSS): network-first mit Cache nur als
//   Offline-Fallback. Verhindert, dass nach einem Deploy alter Code hängen bleibt.
//   (Der frühere cache-first auf alle .js war genau dieser Bug.)
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET
  if (request.method !== "GET") return;

  // Skip external
  if (url.origin !== self.location.origin) return;

  const p = url.pathname; // enthält ggf. den GitHub-Pages-basePath

  // Unveränderliche, gehashte Assets + Medien: cache-first
  const istUnveraenderlich =
    p.includes("/_next/static/") ||
    p.includes("/images/") ||
    /\.(jpg|jpeg|png|webp|svg|woff2?)$/.test(p);

  if (istUnveraenderlich) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // Alles andere (HTML, nicht gehashte JS/CSS): network-first, Cache als Fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});
