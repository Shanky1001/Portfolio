import { useState } from "react";
import { motion } from "framer-motion";
import MenuButton from "./menuButton/MenuButton";
import Links from "./links/Links";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <motion.nav className="px-4 relative" animate={open ? "open" : "closed"}>
      <motion.div
        className="fixed inset-0 z-50 w-72 bg-slate-600 dark:bg-white"
        variants={variants}
      >
        <Links />
      </motion.div>
      <MenuButton setOpen={setOpen} />
    </motion.nav>
  );
};

export default NavBar;

const variants = {
  open: {
    clipPath: "circle(1200px at 50px 50px)",
    transition: {
      type: "spring",
      stiffness: 20,
    },
  },
  closed: {
    clipPath: "circle(30px at 50px 50px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};
