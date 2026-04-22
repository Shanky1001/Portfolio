'use client';

import React, { useEffect } from 'react';

type IdleWindow = Window &
  typeof globalThis & {
    requestIdleCallback?: (cb: () => void, options?: { timeout?: number }) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

const Firebase = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const init = async () => {
      // Dynamically import firebaseConfig so the firebase/analytics SDK
      // (~40 KB gzipped) is split into its own chunk and never blocks
      // first paint.
      const { analytics, logEvent } = await import('./firebaseConfig.ts');
      if (cancelled || !analytics) return;

      // Log scroll depth — fire only once when the user passes 50% of the page.
      // Tied to a real user action (scroll), not page mount, so it doesn't
      // pollute analytics with synthetic events on every load.
      const hasLoggedScroll = { current: false };
      const handleScroll = () => {
        if (hasLoggedScroll.current) return;
        const scrollPercentage = (window.scrollY / document.documentElement.scrollHeight) * 100;
        if (scrollPercentage > 50) {
          logEvent(analytics, 'scroll_depth', { percentage: 50 });
          hasLoggedScroll.current = true;
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });

      cleanup = () => {
        window.removeEventListener('scroll', handleScroll);
      };
    };

    const idleWindow = typeof window !== 'undefined' ? (window as IdleWindow) : undefined;
    let idleHandle: number | undefined;
    let timeoutHandle: ReturnType<typeof setTimeout> | undefined;

    const schedule = () => {
      void init();
    };

    if (idleWindow?.requestIdleCallback) {
      idleHandle = idleWindow.requestIdleCallback(schedule, { timeout: 2000 });
    } else {
      timeoutHandle = setTimeout(schedule, 1);
    }

    return () => {
      cancelled = true;
      if (idleHandle !== undefined && idleWindow?.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle !== undefined) {
        clearTimeout(timeoutHandle);
      }
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
};

export default Firebase;
