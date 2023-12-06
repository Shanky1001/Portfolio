import { useScroll, motion, useTransform } from "framer-motion";
import { useRef } from "react";

function ParallaxWrapper({
  children,
  className = "flex gap-4 w-full",
  parentHeight = "h-[200vh]",
  componentHeight = "h-screen",
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-85%"]);

  return (
    <section ref={ref} className={`relative ${parentHeight}`}>
      <div className={`sticky top-0 frc overflow-hidden ${componentHeight}`}>
        <motion.div style={{ x }} className={className}>
          {children}
        </motion.div>
      </div>
    </section>
  );
}

export default ParallaxWrapper;
