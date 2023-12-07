import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SectionWrapper = ({ children, id, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  
  return (
    <motion.section
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      id={id}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeInOut" } },
};
