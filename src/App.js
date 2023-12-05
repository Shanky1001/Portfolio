import Cursor from "./components/cursor/Cursor";
import Hero from "./components/hero/Hero";
import NavBar from "./components/navbar/NavBar";
import { motion, useScroll } from "framer-motion";

function App() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="App bg-white text-black dark:bg-black dark:text-white relative">
      <motion.div
        className="fixed h-2 top-0 origin-left z-30 w-full bg-blue-600"
        style={{
          scaleX: scrollYProgress,
        }}
      />
      <Cursor />
      <NavBar />
      <Hero />
    </div>
  );
}

export default App;
