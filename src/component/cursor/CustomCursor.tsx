import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const maxWidth = 1600;
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const cursorRef = useRef(null);

  useEffect(() => {
    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      const xPercent = (e.clientX / window.innerWidth) * 100;
      const yPercent = (e.clientY / window.innerHeight) * 100;
      setPosition({ x: xPercent, y: yPercent });
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', updateViewport);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate the pixel position for x and y
  const xPos = (position.x / 100) * Math.min(viewport.width, maxWidth);
  const yPos = (position.y / 100) * viewport.height;

  return (
    <motion.div
      ref={cursorRef}
      className="cursor fixed w-3 h-3 rounded-full border origin-center pointer-events-none bg-black dark:bg-white z-50"
      animate={{ x: xPos, y: yPos }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    ></motion.div>
  );
};

export default CustomCursor;
