import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const maxWidth = 1600;
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      const xPercent = (e.clientX / window.innerWidth) * 100;
      const yPercent = (e.clientY / window.innerHeight) * 100;
      setPosition({ x: xPercent, y: yPercent });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Calculate the pixel position for x and y
  const xPos = (position.x / 100) * Math.min(window.innerWidth, maxWidth);
  const yPos = (position.y / 100) * window.innerHeight;

  return (
    <motion.div
      ref={cursorRef}
      className="cursor fixed w-3 h-3 rounded-full border origin-center pointer-events-none bg-black dark:bg-white z-50"
      animate={{ x: xPos, y: yPos }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    ></motion.div>
  );
};

export default CustomCursor;
