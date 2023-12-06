import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      id="#"
      className="sticky top-0 z-0 dark:text-white h-screen w-full overflow-clip"
    >
      <div className="">
        
      </div>
      <motion.div
        className="text-[10rem] cursor-default absolute max-w-screen-1600 uppercase bottom-5 z-10 font-extrabold text-[#ffffff09] whitespace-nowrap Lugrasimo"
        variants={textSliderVariants}
        initial="initial"
        animate="animate"
      >
        Frontend Developer Designer
      </motion.div>
    </section>
  );
};

export default Hero;

const textSliderVariants = {
  initial: {
    x: "0",
  },
  animate: {
    x: "-100%",
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 40,
    },
  },
};
