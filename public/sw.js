const DYNAMIC_CACHE = 'dynamic-v2';
// Remove old caches
const staticCache = 'static-v1';


self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((key) => key !== staticCache && key !== DYNAMIC_CACHE).map((key) => caches.delete(key))
      );
      // Force this SW to become active immediately
      await self.skipWaiting();
    })()
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Bypass service worker for localhost during development
  const isLocalhost = request.url.startsWith('http://localhost') || request.url.startsWith('http://127.0.0.1');
  if (isLocalhost) {
    return;
  }

  if (request.method !== 'GET') return;

  const isFirebase = request.url.includes('firebase');

  if (isFirebase) {
    event.respondWith(
      caches.open(DYNAMIC_CACHE).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        return fetch(request)
          .then(async (networkResponse) => {
            if (networkResponse.ok) {
              if (cachedResponse) {
                const [newData, oldData] = await Promise.all([networkResponse.clone().text(), cachedResponse.text()]);
                if (newData !== oldData) {
                  notifyClientOfUpdate();
                }
              }
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => {
            // If fetch fails, fallback to cache
            return cachedResponse;
          });
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
