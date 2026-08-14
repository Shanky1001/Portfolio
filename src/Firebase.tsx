'use client';

import React, { useEffect } from 'react';
import { useReportWebVitals } from 'next/web-vitals';

const FIRST_VISIT_KEY = 'portfolio_first_visit_at';
const LAST_VISIT_KEY = 'portfolio_last_visit_at';
const SCROLL_MILESTONES = [25, 50, 75, 90, 100] as const;
const SECTION_IDS = [
  'home',
  'socials',
  'about',
  'experience',
  'skills',
  'projects',
  'certifications',
  'contact',
] as const;

// ----- Lazy Firebase SDK singleton ----------------------------------------
// We kick off the dynamic import as soon as this module is evaluated so the
// SDK starts downloading in the background immediately, rather than waiting
// until the first useEffect runs.
let firebaseModulePromise: Promise<typeof import('./firebaseConfig.ts')> | null = null;

const loadFirebaseModule = () => {
  if (!firebaseModulePromise) {
    firebaseModulePromise = import('./firebaseConfig.ts');
  }
  return firebaseModulePromise;
};

// Pre-fetch the analytics module immediately at module evaluation time so it is ready (or nearly ready) by the time the first event fires.
if (typeof window !== 'undefined') {
  void loadFirebaseModule();
}

// ----- Event queue ----------------------------------------------------------
// Events that fire before the Firebase SDK resolves are buffered here and
// flushed once analytics is available. This eliminates the race where scroll /
// section-view events are missed during the async SDK load.
type QueuedEvent = { name: string; params: Record<string, unknown> };
let eventQueue: QueuedEvent[] | null = [];

const queueOrLog = (
  analytics: import('firebase/analytics').Analytics | null | undefined,
  logEventFn: typeof import('firebase/analytics').logEvent | null | undefined,
  name: string,
  params: Record<string, unknown>
) => {
  if (analytics && logEventFn) {
    logEventFn(analytics, name, params);
  } else if (eventQueue) {
    eventQueue.push({ name, params });
  }
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const getDeviceType = () => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

const classifyTrafficSource = () => {
  if (!document.referrer) {
    return { sourceType: 'direct', sourceHost: 'none' };
  }

  try {
    const referrerUrl = new URL(document.referrer);
    const sourceHost = referrerUrl.hostname.replace(/^www\./, '');
    const currentHost = window.location.hostname.replace(/^www\./, '');

    if (sourceHost === currentHost) {
      return { sourceType: 'internal', sourceHost };
    }

    const isSearch = /(google\.|bing\.|duckduckgo\.|yahoo\.|baidu\.)/i.test(sourceHost);
    if (isSearch) {
      return { sourceType: 'search', sourceHost };
    }

    const isSocial = /(facebook\.|instagram\.|x\.com|twitter\.|linkedin\.|reddit\.|threads\.|youtube\.)/i.test(
      sourceHost
    );
    if (isSocial) {
      return { sourceType: 'social', sourceHost };
    }

    return { sourceType: 'referral', sourceHost };
  } catch {
    return { sourceType: 'unknown', sourceHost: 'unknown' };
  }
};

const getScrollDepthPercentage = () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollableHeight <= 0) return 100;
  return clamp((window.scrollY / scrollableHeight) * 100, 0, 100);
};

const Firebase = ({ children }: { children: React.ReactNode }) => {
  useReportWebVitals((metric) => {
    void (async () => {
      const { analytics, logEvent } = await loadFirebaseModule();
      if (!analytics) return;

      logEvent(analytics, 'web_vital', {
        path: window.location.pathname,
        metric_name: metric.name,
        metric_id: metric.id,
        rating: metric.rating ?? 'unknown',
        value: Number(metric.value.toFixed(2)),
        delta: Number(metric.delta.toFixed(2)),
        navigation_type: metric.navigationType ?? 'unknown',
      });
    })();
  });

  useEffect(() => {
    // ---- Mutable state shared between sync listeners and async flush --------
    let analyticsRef: import('firebase/analytics').Analytics | null = null;
    let logEventRef: typeof import('firebase/analytics').logEvent | null = null;
    let setUserPropertiesRef: typeof import('firebase/analytics').setUserProperties | null = null;

    const sessionStartedAt = Date.now();
    const firedMilestones = new Set<number>();
    const viewedSections = new Set<string>();
    let maxDepth = 0;
    let hasTrackedSessionEnd = false;

    // Helpers that are safe to call before the SDK is ready — events are
    // buffered and flushed once analytics resolves.
    const log = (name: string, params: Record<string, unknown>) => queueOrLog(analyticsRef, logEventRef, name, params);

    // ---- Traffic / visit context -------------------------------------------
    const url = new URL(window.location.href);
    const utmSource = url.searchParams.get('utm_source') ?? 'none';
    const utmMedium = url.searchParams.get('utm_medium') ?? 'none';
    const utmCampaign = url.searchParams.get('utm_campaign') ?? 'none';
    const traffic = classifyTrafficSource();

    const now = Date.now();
    let firstVisitAtRaw: string | null = null;
    let lastVisitAtRaw: string | null = null;
    try {
      firstVisitAtRaw = localStorage.getItem(FIRST_VISIT_KEY);
      lastVisitAtRaw = localStorage.getItem(LAST_VISIT_KEY);
    } catch {
      /* private mode */
    }

    const firstVisitAt = firstVisitAtRaw ? Number(firstVisitAtRaw) : null;
    const lastVisitAt = lastVisitAtRaw ? Number(lastVisitAtRaw) : null;
    const isFirstVisit = !firstVisitAt || Number.isNaN(firstVisitAt);

    try {
      if (isFirstVisit) localStorage.setItem(FIRST_VISIT_KEY, String(now));
      localStorage.setItem(LAST_VISIT_KEY, String(now));
    } catch {
      /* private mode */
    }

    const daysSinceLastVisit =
      lastVisitAt && !Number.isNaN(lastVisitAt) ? Math.floor((now - lastVisitAt) / (1000 * 60 * 60 * 24)) : null;

    // ---- Scroll depth listener (starts immediately) ------------------------
    const handleScroll = () => {
      const scrollDepth = getScrollDepthPercentage();
      maxDepth = Math.max(maxDepth, scrollDepth);

      for (const milestone of SCROLL_MILESTONES) {
        if (scrollDepth >= milestone && !firedMilestones.has(milestone)) {
          firedMilestones.add(milestone);
          log('scroll_milestone', { path: window.location.pathname, milestone });
        }
      }
    };

    // ---- Session end -------------------------------------------------------
    const trackSessionEnd = () => {
      if (hasTrackedSessionEnd) return;
      hasTrackedSessionEnd = true;
      log('engagement_summary', {
        path: window.location.pathname,
        time_on_page_sec: Math.floor((Date.now() - sessionStartedAt) / 1000),
        max_scroll_depth: Math.round(maxDepth),
      });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') trackSessionEnd();
    };
    const handlePageHide = () => trackSessionEnd();

    // ---- Outbound + project-interaction click listener --------------------
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;

      const analyticsElement = target?.closest<HTMLElement>('[data-analytics-event]');
      if (analyticsElement) {
        const eventName = analyticsElement.dataset.analyticsEvent;
        if (eventName) {
          log(eventName, {
            path: window.location.pathname,
            project_name: analyticsElement.dataset.projectName ?? 'unknown',
            project_category: analyticsElement.dataset.projectCategory ?? 'unknown',
            interaction_type: analyticsElement.dataset.interactionType ?? 'click',
          });
        }
      }

      const link = target?.closest('a[href]');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href) return;
      try {
        const destination = new URL(href, window.location.href);
        if (destination.hostname !== window.location.hostname) {
          log('outbound_click', {
            source_path: window.location.pathname,
            destination_host: destination.hostname,
            destination_path: destination.pathname,
          });
        }
      } catch {
        /* malformed URL */
      }
    };

    // ---- Section IntersectionObserver (starts immediately) -----------------
    const sectionObserver =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                const sectionId = (entry.target as HTMLElement).id;
                if (!sectionId || viewedSections.has(sectionId)) continue;

                viewedSections.add(sectionId);
                log('section_view', { path: window.location.pathname, section_id: sectionId });
                sectionObserver?.unobserve(entry.target);
              }
            },
            { threshold: 0.25 } // lowered: 35% could miss tall sections on small screens
          )
        : null;

    const observeAvailableSections = () => {
      if (!sectionObserver) return;
      for (const sectionId of SECTION_IDS) {
        const el = document.getElementById(sectionId);
        if (el) sectionObserver.observe(el);
      }
    };

    const domObserver = typeof MutationObserver !== 'undefined' ? new MutationObserver(observeAvailableSections) : null;

    // Observe immediately so sections already in view are captured right away.
    observeAvailableSections();
    domObserver?.observe(document.body, { childList: true, subtree: true });

    // Register all listeners immediately — no idle/timeout delay.
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pagehide', handlePageHide);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('click', handleDocumentClick, { passive: true });

    // Run once immediately to capture scroll position on first paint.
    handleScroll();

    // ---- Async: load Firebase SDK, set user properties, flush queue --------
    void loadFirebaseModule().then(({ analytics, logEvent: logFn, setUserProperties }) => {
      if (!analytics) {
        // Analytics unavailable (dev mode or blocked) — drain the queue silently.
        eventQueue = null;
        return;
      }

      analyticsRef = analytics;
      logEventRef = logFn;
      setUserPropertiesRef = setUserProperties;

      setUserProperties(analytics, {
        user_type: isFirstVisit ? 'first_time' : 'returning',
        traffic_source_type: traffic.sourceType,
        traffic_source_host: traffic.sourceHost,
        utm_source: utmSource,
        utm_medium: utmMedium,
      });

      logFn(analytics, 'landing_context', {
        path: window.location.pathname,
        source_type: traffic.sourceType,
        source_host: traffic.sourceHost,
        referrer: document.referrer || 'none',
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        device_type: getDeviceType(),
        viewport: `${window.innerWidth}x${window.innerHeight}`,
      });

      logFn(analytics, isFirstVisit ? 'first_time_user' : 'returning_user', {
        path: window.location.pathname,
        days_since_last_visit: daysSinceLastVisit ?? -1,
      });

      // Flush events that were buffered before the SDK was ready.
      const pending = eventQueue ?? [];
      eventQueue = null; // stop buffering — log directly from now on
      for (const { name, params } of pending) {
        logFn(analytics, name, params);
      }
    });

    return () => {
      trackSessionEnd();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pagehide', handlePageHide);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('click', handleDocumentClick);
      sectionObserver?.disconnect();
      domObserver?.disconnect();
      // Reset queue so a remount (React StrictMode) starts fresh.
      if (eventQueue === null) eventQueue = [];
      // Suppress unused-variable warning — refs are used inside closures.
      void setUserPropertiesRef;
    };
  }, []);

  return <>{children}</>;
};

export default Firebase;
