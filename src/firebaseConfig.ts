import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent, setUserProperties } from "firebase/analytics";

const {API_KEY,REACT_APP_API_KEY,REACT_APP_AUTH_DOMAIN,REACT_APP_DATABASE_URL,REACT_APP_PROJECT_ID,REACT_APP_STORAGE_BUCKET,REACT_APP_MESSAGING_SENDER_ID,REACT_APP_APP_ID} = process.env
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
console.log(API_KEY)
console.log(REACT_APP_AUTH_DOMAIN)
console.log(REACT_APP_DATABASE_URL)
console.log(REACT_APP_PROJECT_ID)
console.log(REACT_APP_STORAGE_BUCKET)
console.log(REACT_APP_MESSAGING_SENDER_ID)
console.log(REACT_APP_APP_ID)
console.log(REACT_APP_API_KEY)

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const analytics = getAnalytics(app);

export { db, analytics, logEvent, setUserProperties };
