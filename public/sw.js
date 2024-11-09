// Install event: Cache the static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("static-v1").then((cache) => {
      return cache.addAll([
        "/", // The root HTML file
        "/index.html", // HTML
        "/static/js/main.js", // Main JavaScript bundle
        "/static/css/main.css", // Main CSS bundle
        "/manifest.json", // Manifest file
        "/about-1.jpg",
        "/about-2.jpg",
        "/public/apexlegends.png",
        "/public/biznews.png",
        "/public/CloudoPiya.png",
        "/public/contact.png",
        "/public/Crypto.png",
        "/public/hamleys.png",
        "/public/hero-img.gif",
        "/public/pouseidon.png",
        "/public/sweetshop-dark.png",
        "/public/sweetshop.png",
        "/public/Shanky.png",
        "/public/social-media.png",
        "/public/library.png",
      ]);
    })
  );
});

// Fetch event: Serve cached files if available
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // If a cached response exists, return it
      return cachedResponse || fetch(event.request);
    })
  );
});

// Activate event: Update cache if there are new assets
self.addEventListener("activate", (event) => {
  const cacheWhitelist = ["static-v1"]; // Keep only this cache version
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Delete old caches
          }
        })
      );
    })
  );
});
