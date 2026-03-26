const STATIC_CACHE = "portfolio-static-v8";
const RUNTIME_CACHE = "portfolio-runtime-v1";
const IMAGE_CACHE = "portfolio-images-v1";
const MAX_IMAGE_ENTRIES = 50;
const MAX_RUNTIME_ENTRIES = 80;

const CORE_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/css/Idioma.css",
  "/css/certificado.css",
  "/css/contacto.css",
  "/css/formacion.css",
  "/css/home.css",
  "/css/navbar.css",
  "/css/responsive.css",
  "/css/sections.css",
  "/css/skills.css",
  "/css/style.css",
  "/js/baffle.min.js",
  "/js/baffleEffect.js",
  "/js/barraidioma.js",
  "/js/copymailscript.js",
  "/js/i18n.js",
  "/js/main.js",
  "/js/maquinaescribir.js",
  "/js/navbar.js",
  "/js/particles.js",
  "/js/pdfscript.js",
  "/js/popup.js",
  "/js/scrollanimation.js",
  "/js/tema.js",
  "/i18n/es.json",
  "/i18n/en.json",
  "/imagenes/favicon-16.png",
  "/imagenes/favicon-32.png",
  "/imagenes/favicon-192.png",
  "/imagenes/favicon-512.png",
  "/imagenes/apple-touch-icon.png",
  "/imagenes/logo-mrosa-52h.png",
  "/imagenes/logo-mrosa-104h.png",
  "/imagenes/logo-mrosa-220h.png",
  "/imagenes/logo-mrosa-52h.webp",
  "/imagenes/logo-mrosa-104h.webp",
  "/imagenes/logo-mrosa-220h.webp",
  "/imagenes/english-24.png",
  "/imagenes/english-48.png",
  "/imagenes/english-24.webp",
  "/imagenes/english-48.webp",
  "/imagenes/espanol-24.png",
  "/imagenes/espanol-48.png",
  "/imagenes/espanol-24.webp",
  "/imagenes/espanol-48.webp",
  "/imagenes/senor-licenciado-220.jpg",
  "/imagenes/senor-licenciado-220.webp",
  "/imagenes/senor-licenciado-440.jpg",
  "/imagenes/senor-licenciado-440.webp",
];

const trimCache = async (cacheName, maxItems) => {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  while (keys.length > maxItems) {
    const key = keys.shift();
    if (key) await cache.delete(key);
  }
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      await cache.addAll(CORE_ASSETS);
      const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      if (clients.length === 0) {
        self.skipWaiting();
      }
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => ![STATIC_CACHE, RUNTIME_CACHE, IMAGE_CACHE].includes(key))
            .map((key) => caches.delete(key)),
        ),
      ),
  );
  self.clients.claim();
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const isNavigate = request.mode === "navigate";
  const isSameOrigin = new URL(request.url).origin === self.location.origin;
  const isImage = request.destination === "image";

  if (isNavigate) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(STATIC_CACHE).then((cache) => cache.put("/index.html", copy));
          return response;
        })
        .catch(() => caches.match("/index.html")),
    );
    return;
  }

  if (request.method !== "GET") return;

  if (isImage && isSameOrigin) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          if (cached) return cached;
          return fetch(request).then((response) => {
            if (response && response.status === 200) {
              cache
                .put(request, response.clone())
                .then(() => trimCache(IMAGE_CACHE, MAX_IMAGE_ENTRIES));
            }
            return response;
          });
        }),
      ),
    );
    return;
  }

  if (isSameOrigin) {
    event.respondWith(
      caches.open(RUNTIME_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          const fetchPromise = fetch(request)
            .then((response) => {
              if (response && response.status === 200) {
                cache
                  .put(request, response.clone())
                  .then(() => trimCache(RUNTIME_CACHE, MAX_RUNTIME_ENTRIES));
              }
              return response;
            })
            .catch(() => cached);
          return cached || fetchPromise;
        }),
      ),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (!response || response.status !== 200 || !request.url.startsWith(self.location.origin)) {
          return response;
        }
        const copy = response.clone();
        caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
        return response;
      });
    }),
  );
});
