import React, { useEffect } from "react";
import { analytics, logEvent, setUserProperties } from "./firebaseConfig.ts";

const Firebase = ({ children }) => {
  // Initialize Firebase Analytics
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
