'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const maxWidth = 1600;

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 300, damping: 20 });
  const y = useSpring(mouseY, { stiffness: 300, damping: 20 });
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsFinePointer(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => setIsFinePointer(event.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const viewportWidth = Math.min(window.innerWidth, maxWidth);
      mouseX.set((e.clientX / window.innerWidth) * viewportWidth);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isFinePointer, mouseX, mouseY]);

  if (!isFinePointer) return null;

  return (
    <motion.div
      ref={cursorRef}
      className="cursor fixed w-3 h-3 rounded-full border origin-center pointer-events-none bg-black dark:bg-white z-50"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
    ></motion.div>
  );
};

export default CustomCursor;
