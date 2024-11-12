import React, { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent, setUserProperties } from "firebase/analytics";

// Firebase config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics
const analytics = getAnalytics(app);

const Firebase = ({ children }) => {
  useEffect(() => {
    // Example: Log an event when a user clicks a button
    logEvent(analytics, "button_click");

    logEvent(analytics, "social_media_click", {
      platform: "LinkedIn",
    });

    // Log event when a user clicks on GitHub link
    logEvent(analytics, "social_media_click", {
      platform: "GitHub",
    });

    logEvent(analytics, "resume_download", {
      action: "download",
      file_type: "PDF",
    });
    setUserProperties(analytics, { first_visit: true });

    // Log event when a user scrolls past 50% of the page
    const handleScroll = () => {
      const scrollPercentage =
        (window.scrollY / document.documentElement.scrollHeight) * 100;
      if (scrollPercentage > 50) {
        logEvent(analytics, "scroll_depth", {
          percentage: 50,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      logEvent(analytics, "sign_out");
    };
  }, []);

  return <>{children}</>;
};

export default Firebase;
