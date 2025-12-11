import React, { useState } from 'react';

interface TechStackCarouselProps {
  avatarSrc: string;
  techStackImages: string[];
}
// Responsive values
let iconSize = 40;
let baseRadius = 120;
let radiusStep = 35;
let avatarSize = 12;

const TechStackCarousel: React.FC<TechStackCarouselProps> = ({ avatarSrc, techStackImages }) => {
  const [active, setActive] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  React.useEffect(() => {
    let throttleTimeout: number | null = null;
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

  if (windowWidth < 500) {
    iconSize = 28;
    baseRadius = 60;
    radiusStep = 22;
    avatarSize = 5;
  } else if (windowWidth < 900) {
    iconSize = 34;
    baseRadius = 90;
    radiusStep = 28;
    avatarSize = 8;
  }

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
              background: 'black',
            }}
          >
            <img alt="avatar" className="rounded-full object-cover" src={avatarSrc} />
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
                  className={active ? `orbit-rotate-${idx}` : ''}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    transformOrigin: '50% 50%',
                  }}
                >
                  <img
                    src={img}
                    alt={`tech-stack-${idx}`}
                    className={`absolute rounded-full transition-all duration-700 ${active ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
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
