import React from "react";
import { motion } from "framer-motion";

const SplashAnimation = () => {
  // Replace this pathData with the actual path data for "Shashank Rai"
  const pathData = "M10 80 Q 95 10 180 80 T 350 80";

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width="800"
        height="400"
        viewBox="0 0 800 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d={pathData}
          fill="none"
          stroke="#000"
          strokeWidth="2"
          strokeDasharray="2000"
          strokeDashoffset="2000"
          initial={{ strokeDashoffset: 2000 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          style={{
            transform: "rotate(-85deg) translate(-200px, 100px)", // Rotation for 275 degrees
            transformOrigin: "center",
          }}
        />
      </svg>
    </div>
  );
};

export default SplashAnimation;
