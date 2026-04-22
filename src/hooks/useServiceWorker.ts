const isLocalhost = () => {
  if (typeof window === 'undefined') return false;
  return (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  );
};

interface ServiceWorkerConfig {
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
}

export function registerServiceWorker(config?: ServiceWorkerConfig) {
  if (typeof window === 'undefined') return;
  if (!('serviceWorker' in navigator)) return;

  // Disable SW in dev: stale chunks from `next dev` HMR are painful, and an
  // installed SW would outlive the dev session and serve old code on the
  // next visit. Set NEXT_PUBLIC_ENABLE_SW=1 to opt in (e.g. when testing
  // the update flow against a local production build via `next start`).
  const swForceEnabled = process.env.NEXT_PUBLIC_ENABLE_SW === '1';
  if (!swForceEnabled && (process.env.NODE_ENV === 'development' || isLocalhost())) {
    unregister();
    return;
  }

  // Reload exactly once when the new SW takes control. Guarded so a refresh
  // initiated by another tab doesn't trigger an infinite reload loop.
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });

  const start = () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        // A waiting worker may already exist if the user dismissed the toast
        // on a previous visit. Surface it again so they can update now.
        if (registration.waiting && navigator.serviceWorker.controller) {
          config?.onUpdate?.(registration);
        }

        registration.addEventListener('updatefound', () => {
          const installingWorker = registration.installing;
          if (!installingWorker) return;

          installingWorker.addEventListener('statechange', () => {
            if (
              installingWorker.state === 'installed' &&
              navigator.serviceWorker.controller
            ) {
              config?.onUpdate?.(registration);
            }
          });
        });
      })
      .catch((err) => console.error('SW registration failed:', err));
  };

  // `useEffect` (which calls this) runs after hydration. On a fast cached
  // refresh the `load` event may have already fired, so registering inside a
  // `load` listener would silently no-op. Handle both cases.
  if (document.readyState === 'complete') {
    start();
  } else {
    window.addEventListener('load', start, { once: true });
  }
}

function unregister() {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => registration.unregister());
  });
}

export function initServiceWorker() {
  registerServiceWorker({
    onUpdate: (registration) => {
      window.dispatchEvent(
        new CustomEvent('update-available', { detail: registration })
      );
    },
  });
}

// Tell the waiting worker to take over. The SW responds by calling
// self.skipWaiting(), which fires `controllerchange` above and reloads the page.
export function activateUpdate(registration: ServiceWorkerRegistration) {
  if (registration.waiting) {
    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
  }
}
