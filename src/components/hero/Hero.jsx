import { motion } from "framer-motion";
import Reveal from "../../wrapper/reveal/Reveal";

const Hero = () => {
  return (
    <section
      id="#"
      className="sticky top-0 dark:text-white h-screen w-full overflow-clip"
    >
      <div className="frc justify-center h-full">
        <Reveal>
          <h1 className="text-3xl">Hello Mona</h1>
        </Reveal>
      </div>
      <motion.div
        className="text-[10rem] absolute uppercase bottom-5 z-10 font-extrabold text-[#ffffff09] dark:text-[#cacaca] whitespace-nowrap opacity-50 Lugrasimo"
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
