'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

interface TechStackCarouselProps {
  avatarSrc: string;
  techStackImages: string[];
}

const DEFAULT_WINDOW_WIDTH = 1200;

// Per-orbit rotation timing. `duration` is the full revolution time in
// seconds; `start` is the initial angle (degrees) the icon appears at.
// We apply both inline so a single shared `@keyframes orbit-rotate`
// (in `src/index.css`) drives all orbits. The starting angle is achieved
// by setting `animation-delay = -(start / 360) * duration`, which fast-
// forwards the animation to the desired offset without extra keyframes.
const ORBIT_TIMINGS: ReadonlyArray<{ duration: number; start: number }> = [
  { duration: 10, start: 0 },
  { duration: 8, start: 0 },
  { duration: 12, start: 30 },
  { duration: 15, start: 60 },
  { duration: 10, start: 90 },
  { duration: 16, start: 120 },
  { duration: 11, start: 150 },
  { duration: 7, start: 180 },
];

const TechStackCarousel: React.FC<TechStackCarouselProps> = ({ avatarSrc, techStackImages }) => {
  const [active, setActive] = useState(true);
  // Always start from a deterministic value so SSR markup matches the first client render.
  // The actual window width is read in the effect below, after hydration.
  const [windowWidth, setWindowWidth] = useState(DEFAULT_WINDOW_WIDTH);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    let throttleTimeout: NodeJS.Timeout | null = null;
    const handleResize = () => {
      if (throttleTimeout) return;
      throttleTimeout = setTimeout(() => {
        setWindowWidth(window.innerWidth);
        throttleTimeout = null;
      }, 150);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, []);

  const { iconSize, baseRadius, radiusStep, avatarSize } = useMemo(() => {
    if (windowWidth < 500) return { iconSize: 28, baseRadius: 60, radiusStep: 22, avatarSize: 5 };
    if (windowWidth < 900) return { iconSize: 34, baseRadius: 90, radiusStep: 28, avatarSize: 8 };
    return { iconSize: 40, baseRadius: 120, radiusStep: 35, avatarSize: 12 };
  }, [windowWidth]);

  return (
    <>
      <div className="w-48 h-48 md:w-72 md:h-72 lg:-translate-x-16 flex items-center justify-center relative">
        {/* Central avatar absolutely centered */}
        <div
          className="absolute cursor-pointer"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
          }}
          onClick={() => setActive((prev) => !prev)}
        >
          <div
            className={`rounded-full flex items-center justify-center transition-shadow duration-500 ${active ? 'shadow-[0_0_60px_20px_#7c3aedbb]' : 'shadow-[0_0_40px_10px_#7c3aed55]'}`}
            style={{
              width: `${avatarSize}rem`,
              height: `${avatarSize}rem`,
            }}
          >
            <Image
              alt="avatar"
              className="rounded-full object-cover"
              src={avatarSrc}
              width={avatarSize * 16}
              height={avatarSize * 16}
              sizes="(max-width: 768px) 128px, 192px"
              priority
            />
          </div>
        </div>
        {/* Tech stack images, hidden until active, each with its own orbit */}
        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          {techStackImages.map((img, idx) => {
            const radius = active ? baseRadius + idx * radiusStep : 0;
            const orbitDiameter = 2 * radius;

            return (
              <div key={img} className="absolute w-full h-full pointer-events-none" style={{ left: 0, top: 0 }}>
                {/* Orbit circle */}
                {active && (
                  <div
                    style={{
                      position: 'absolute',
                      left: `calc(50% - ${radius}px)`,
                      top: `calc(50% - ${radius}px)`,
                      width: `${orbitDiameter}px`,
                      height: `${orbitDiameter}px`,
                      border: '2px dashed #7c3aed',
                      borderRadius: '50%',
                      opacity: 0.3,
                      zIndex: 0,
                    }}
                  />
                )}
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    transformOrigin: '50% 50%',
                    ...(active
                      ? (() => {
                          const timing = ORBIT_TIMINGS[idx % ORBIT_TIMINGS.length];
                          return {
                            animation: `orbit-rotate ${timing.duration}s linear infinite`,
                            animationDelay: `-${(timing.start / 360) * timing.duration}s`,
                          };
                        })()
                      : {}),
                  }}
                >
                  <Image
                    src={img}
                    alt={`tech-stack-${idx}`}
                    className={`absolute rounded-full transition-all duration-700 ${active ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                    width={iconSize}
                    height={iconSize}
                    sizes={`${iconSize}px`}
                    style={{
                      left: `calc(50% - ${iconSize / 2}px)`,
                      top: `calc(50% - ${radius + iconSize / 2}px)`,
                      width: `${iconSize}px`,
                      height: `${iconSize}px`,
                      background: '#fff',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TechStackCarousel;
