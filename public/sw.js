self.addEventListener('install', event => {
  // Install new SW but don't activate immediately
  console.log('[SW] Installed');
});

self.addEventListener('activate', event => {
  console.log('[SW] Activated');
  event.waitUntil(self.clients.claim());
});

// Listen for SKIP_WAITING message from app
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') {
    console.log('[SW] Skipping waiting');
    self.skipWaiting();
  }
});
