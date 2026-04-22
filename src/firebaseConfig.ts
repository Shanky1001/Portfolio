import { initializeApp } from 'firebase/app';
import {
  getAnalytics,
  logEvent,
  setUserProperties,
  Analytics,
} from 'firebase/analytics';

// Firebase config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY ?? process.env.REACT_APP_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN ?? process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL ?? process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID ?? process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET ?? process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID ?? process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID ?? process.env.REACT_APP_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID ?? process.env.REACT_APP_MEASUREMENT_ID,
};

// Skip Firebase entirely in development — the literal NODE_ENV check
// tree-shakes away in production builds, leaving a zero-cost branch.
const isDev = process.env.NODE_ENV === 'development';

const canInitializeFirebase =
  !isDev &&
  Boolean(
    firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId && firebaseConfig.databaseURL
  );

const app = canInitializeFirebase ? initializeApp(firebaseConfig) : null;

let analytics: Analytics | null = null;
if (app && typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
  } catch {
    // Analytics may be blocked by the browser, an extension, or unsupported
    // environments (e.g. some private modes). Fall back to a no-op so the
    // chunk doesn't crash the rest of the app.
    analytics = null;
  }
}

export { analytics, logEvent, setUserProperties };
