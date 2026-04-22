'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

const SectionWrapper = ({ children, id, className }: SectionWrapperProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
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
  visible: {
    opacity: 1,
    transition: { duration: 0.6, delay: 0.25 },
  },
};
