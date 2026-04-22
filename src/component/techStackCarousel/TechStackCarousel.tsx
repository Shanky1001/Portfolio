'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

interface TechStackCarouselProps {
  techStackImages: string[];
  children: React.ReactNode;
}

const DEFAULT_WINDOW_WIDTH = 1200;

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

const TechStackCarousel: React.FC<TechStackCarouselProps> = ({ techStackImages, children }) => {
  const [active, setActive] = useState(true);

  const [windowWidth, setWindowWidth] = useState(DEFAULT_WINDOW_WIDTH);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    let debounceTimeout: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (debounceTimeout) clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        setWindowWidth(window.innerWidth);
        debounceTimeout = null;
      }, 150);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (debounceTimeout) clearTimeout(debounceTimeout);
    };
  }, []);

  const { iconSize, baseRadius, radiusStep } = useMemo(() => {
    if (windowWidth < 500) return { iconSize: 28, baseRadius: 60, radiusStep: 22 };
    if (windowWidth < 900) return { iconSize: 34, baseRadius: 90, radiusStep: 28 };
    return { iconSize: 40, baseRadius: 120, radiusStep: 35 };
  }, [windowWidth]);

  return (
    <>
      <div className="w-48 h-48 md:w-72 md:h-72 lg:-translate-x-16 flex items-center justify-center relative">
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
            className={`rounded-full flex items-center justify-center overflow-hidden transition-shadow duration-500 w-40 h-40 md:w-56 md:h-56 ${active ? 'shadow-[0_0_60px_20px_#7c3aedbb]' : 'shadow-[0_0_40px_10px_#7c3aed55]'}`}
          >
            {children}
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
                    alt={`Tech ${idx + 1}`}
                    className={`absolute rounded-full transition-[opacity,transform] duration-700 ${active ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
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
