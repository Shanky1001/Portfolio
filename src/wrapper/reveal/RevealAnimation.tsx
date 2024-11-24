import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import React from 'react';

const RevealAnimation = ({ children, width = 'fit-content' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const animateControl = useAnimation();
  const slideControl = useAnimation();

  useEffect(() => {
    let timeout: any = null;
    if (inView) {
      timeout = setTimeout(() => {
        animateControl.start('animate');
        slideControl.start('animate');
      }, 200);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [inView, animateControl, slideControl]);

  return (
    <div ref={ref} className="relative overflow-hidden" style={{ width }}>
      <motion.div variants={childrenVariants} initial={'initial'} animate={animateControl}>
        {children}
      </motion.div>
      <motion.div
        variants={sliderVariants}
        initial={'initial'}
        animate={slideControl}
        className="absolute top-4 bottom-4 h-full left-0 right-0 z-50 bg-[#7C3AED]"
      />
    </div>
  );
};

export default RevealAnimation;

const childrenVariants = {
  initial: {
    opacity: 0,
    y: 70,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.25,
    },
  },
};

const sliderVariants = {
  initial: {
    left: 0,
  },
  animate: {
    left: '100%',
    duration: 0.5,
    delay: 0.5,
  },
};
