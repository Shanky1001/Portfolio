import React, { useEffect, useState } from "react";
// import { FiSun, FiMoon } from "react-icons/fi";
import { CgClose, CgMenuRight } from "react-icons/cg";
import { motion, useScroll } from "framer-motion";
import CustomCursor from "../cursor/CustomCursor.tsx";

const Header = ({ logo }: { logo: string }) => {
  const [navCollapse, setNavCollapse] = useState(true);
  const [scroll, setScroll] = useState(false);
  const [theme, setTheme] = useState(localStorage.theme || "light");
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const updateScroll = () => {
      window.scrollY >= 90 ? setScroll(true) : setScroll(false);
    };
    window.addEventListener("scroll", updateScroll);
    return () => {
      return window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  const navs = ["home", "about", "projects", "experience", "contact"];

  return (
    <header
      className={`backdrop-filter backdrop-blur-lg ${
        scroll ? "border-b bg-white bg-opacity-40" : "border-b-0"
      } dark:bg-grey-900 dark:bg-opacity-40 border-gray-200 dark:border-b-0 z-30 min-w-full flex flex-col fixed`}
    >
      <motion.div
        className="fixed h-2 top-0 origin-left z-30 w-full bg-blue-600"
        style={{
          scaleX: scrollYProgress,
        }}
      />
      <CustomCursor />

      <nav className="lg:w-11/12 2xl:w-4/5 w-full md:px-6 2xl:px-0 mx-auto py-4 hidden sm:flex items-center justify-between">
        <a
          href={"/"}
          className="2xl:ml-6 hover:text-white hover:dark:text-violet-500 transition-colors duration-300"
        >
          {
            <span className="text-2xl font-medium text-[#7C3AED] hover:text-white capitalize">
              {logo.split(" ")[0]}
            </span>
          }
        </a>

        <ul className="flex items-center gap-8">
          {navs.map((e, i) => (
            <li key={i}>
              <a
                className="hover:text-violet-700 hover:dark:text-violet-500 transition-colors capitalize cursor-pointer"
                href={`#${e}`}
              >
                {e}
              </a>
            </li>
          ))}
          {/* <span
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hover:bg-gray-100 hover:dark:bg-violet-700 p-1.5 rounded-full cursor-pointer transition-colors"
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </span> */}
        </ul>
      </nav>

      <nav className="p-4 flex sm:hidden items-center justify-between">
        {<span className="text-lg font-medium text-[#7C3AED] hover:text-white capitalize">{logo.split(" ")[0]}</span>}
        {/* <div className="flex items-center gap-4">
          <span
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="bg-gray-100 dark:bg-violet-700 p-1.5 rounded-full cursor-pointer transition-colors"
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </span>
          <CgMenuRight size={20} onClick={() => setNavCollapse(false)} />
        </div> */}
      </nav>

      <div
        className={`flex min-h-screen w-screen absolute md:hidden top-0 ${
          !navCollapse ? "right-0" : "right-[-100%]"
        } bottom-0 z-50 ease-in duration-300`}
      >
        <div className="w-1/4" onClick={() => setNavCollapse(true)}></div>

        <div className="flex flex-col p-4 gap-5 bg-gray-100/95 backdrop-filter backdrop-blur-sm dark:bg-grey-900/95 w-3/4">
          <CgClose
            className="self-end my-2"
            size={20}
            onClick={() => setNavCollapse(true)}
          />

          {navs.slice(0, 4).map((e) => (
            <a
              key={e}
              className="hover:text-purple-600 py-1.5 px-4 rounded transition-colors capitalize cursor-pointer"
              href={`#${e}`}
              onClick={() => setNavCollapse(true)}
            >
              {e}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setNavCollapse(true)}
            className="px-6 py-1.5 rounded-md bg-violet-600 hover:bg-violet-700 text-white text-center"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
