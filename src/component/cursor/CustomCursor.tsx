import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Set a variable to hold the timeout ID
// let timeoutId: any;

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  //   // Debounce function to limit the rate of execution
  //   const debounce = (func, delay:number) => {
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(func, delay);
  //   };

  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
      setPosition({ x: e.clientX - 15, y: e.clientY - 10 });
      //   debounce(() => {
      //     setPosition({ x: e.clientX , y: e.clientY  });
      //   }, 1000);
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      className="cursor fixed w-10 h-10 rounded-full border pointer-events-none border-black dark:border-white z-50"
      animate={{ x: position.x, y: position.y }}
    ></motion.div>
  );
};

export default CustomCursor;
