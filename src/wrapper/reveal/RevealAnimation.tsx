'use client';

import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const RevealAnimation = ({ children, width = 'fit-content' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [revealed, setRevealed] = useState(false);
  const [hideMask, setHideMask] = useState(false);

  useEffect(() => {
    if (isInView) {
      setRevealed(true);
    }
  }, [isInView]);

  return (
    <div ref={ref} className="relative overflow-hidden" style={{ width }}>
      <motion.div variants={childrenVariants} initial="hidden" animate={revealed ? 'visible' : 'hidden'}>
        {children}
      </motion.div>
      {!hideMask && (
        <motion.div
          variants={sliderVariants}
          initial="hidden"
          animate={revealed ? 'visible' : 'hidden'}
          onAnimationComplete={() => {
            if (revealed) setHideMask(true);
          }}
          className="absolute inset-0 z-50 bg-[#7C3AED] pointer-events-none"
        />
      )}
    </div>
  );
};

export default RevealAnimation;

const childrenVariants = {
  hidden: {
    opacity: 0,
    y: 70,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.25,
    },
  },
};

const sliderVariants = {
  hidden: {
    x: '0%',
  },
  visible: {
    x: '101%',
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};
