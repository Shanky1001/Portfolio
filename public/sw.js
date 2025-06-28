const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/fallback.png',

  // Static assets
  '/about-1.jpg',
  '/apexlegends.png',
  '/biznews.png',
  '/CloudoPiya.png',
  '/contact.png',
  '/Crypto.png',
  '/hamleys.png',
  '/hero-img.gif',
  '/pouseidon.png',
  '/sweetshop-dark.png',
  '/sweetshop.png',
  '/Shanky.png',
  '/social-media.png',
  '/library.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key !== STATIC_CACHE && key !== DYNAMIC_CACHE).map((key) => caches.delete(key))
        )
      )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;

  const isFirebase = request.url.includes('firebase');

  if (isFirebase) {
    event.respondWith(
      caches.open(DYNAMIC_CACHE).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse.ok) {
              if (cachedResponse) {
                networkResponse
                  .clone()
                  .text()
                  .then((newData) => {
                    cachedResponse?.text().then((oldData) => {
                      if (newData !== oldData) {
                        notifyClientOfUpdate();
                      }
                    });
                  });
              }
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => {});

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // Static files - cache-first
  event.respondWith(
    caches.match(request).then((cached) => {
      return (
        cached ||
        fetch(request)
          .then((res) =>
            caches.open(DYNAMIC_CACHE).then((cache) => {
              if (res.status === 200) cache.put(request, res.clone());
              return res;
            })
          )
          .catch(() => {
            if (request.destination === 'image') return caches.match('/fallback.png');
            if (request.mode === 'navigate') return caches.match('/index.html');
          })
      );
    })
  );
});

// 🔔 Notifies all clients (open tabs) about update
function notifyClientOfUpdate() {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({ type: 'UPDATE_AVAILABLE' });
    });
  });
}
