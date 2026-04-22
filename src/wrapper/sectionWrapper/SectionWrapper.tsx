'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

const sectionVariants = {
  hidden: { opacity: 0.6, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const SectionWrapper = ({ children, id, className }: SectionWrapperProps) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.div
        aria-hidden
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isInView ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="h-1 w-16 mx-auto mb-3 origin-left rounded bg-violet-600"
      />
      {children}
    </motion.section>
  );
};

export default SectionWrapper;
