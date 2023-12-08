import React from "react";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className: string;
}

const SwipeUpWrapper = ({ children, className }: Props) => {
  return (
    <motion.div
      variants={childrenVariants}
      initial={"initial"}
      animate={"animate"}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SwipeUpWrapper;

const childrenVariants = {
  initial: {
    opacity: 0,
    y: 70,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delayChildren: 0.25,
      staggerChildren: 0.25,
      type: "spring",
      bounce: 0.25,
    },
  },
};

export const itemVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};
