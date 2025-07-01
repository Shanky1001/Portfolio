import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent, setUserProperties, setAnalyticsCollectionEnabled, Analytics } from "firebase/analytics";

// Firebase config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const analytics:Analytics  = getAnalytics(app);
if (process.env.NODE_ENV === 'development') {
  setAnalyticsCollectionEnabled(analytics, false);
} 

export { db, analytics, logEvent, setUserProperties };
