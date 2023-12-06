import { motion } from "framer-motion";
import { sideLinks } from "../../../data";

const Links = () => {
  return (
    <motion.div
      variants={variants}
      className="absolute z-50 fcc gap-5 justify-center h-full w-full text-[20px] 500:text-[30px] text-black dark:text-white"
    >
      {sideLinks.map((item) => (
        <motion.a
          href={`#${item.link}`}
          className="hover:text-green-400 active:text-orange-600"
          key={item.link}
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {item.title}
        </motion.a>
      ))}
    </motion.div>
  );
};

export default Links;

const variants = {
  open: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.25,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: 75,
    opacity: 0,
  },
};
