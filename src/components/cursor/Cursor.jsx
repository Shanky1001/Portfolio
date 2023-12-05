import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Set a variable to hold the timeout ID
let timeoutId;

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Debounce function to limit the rate of execution
  const debounce = (func, delay) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func, delay);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX + 10, y: e.clientY + 10 });
      debounce(() => {
        setPosition({ x: e.clientX - 15, y: e.clientY - 10 });
      }, 1000);
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      className="cursor fixed w-10 h-10 rounded-full border border-black dark:border-white z-50"
      animate={{ x: position.x, y: position.y }}
    ></motion.div>
  );
};

export default Cursor;
