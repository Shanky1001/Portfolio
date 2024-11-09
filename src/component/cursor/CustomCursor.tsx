import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef(null);
  //   // Debounce function to limit the rate of execution
  //   const debounce = (func, delay:number) => {
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(func, delay);
  //   };

  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      setPosition({ x: e.clientX - 5, y: e.clientY - 3 });
      //   debounce(() => {
      //     setPosition({ x: e.clientX , y: e.clientY  });
      //   }, 1000);
    };
    // Scale handling for window resizing
  const handleResize = () => {
    if (cursorRef.current) {
      const { innerWidth, innerHeight } = window;
      setPosition((prev) => ({
        x: (prev.x / innerWidth) * window.innerWidth,
        y: (prev.y / innerHeight) * window.innerHeight,
      }));
    }
  };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      ref={cursorRef}
      className="cursor fixed w-3 h-3 rounded-full border pointer-events-none bg-black dark:bg-white z-50"
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    ></motion.div>
  );
};

export default CustomCursor;
