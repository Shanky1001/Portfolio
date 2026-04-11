const isLocalhost = () => {
  if (typeof window === 'undefined') return false;
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
};

interface ServiceWorkerConfig {
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
}

export function registerServiceWorker(config?: ServiceWorkerConfig) {
  if (typeof window === 'undefined') return;

  if (process.env.NODE_ENV === 'development' || isLocalhost()) {
    // Disable SW completely in dev
    unregister();
    return;
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (!installingWorker) return;

            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                config?.onUpdate?.(registration);
              }
            };
          };
        })
        .catch((err) => console.error('SW registration failed:', err));
    });
  }
}

function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister();
      });
    });
  }
}

export function initServiceWorker() {
  registerServiceWorker({
    onUpdate: (registration) => {
      window.dispatchEvent(
        new CustomEvent('update-available', {
          detail: registration,
        })
      );
    },
  });
}
