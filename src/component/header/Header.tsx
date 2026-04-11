import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiSun, FiMoon } from 'react-icons/fi';
import { CgClose, CgMenuRight } from 'react-icons/cg';
import { motion, useScroll } from 'framer-motion';
import CustomCursor from '../cursor/CustomCursor.tsx';

const navs = ['home', 'about', 'projects', 'experience', 'contact'];

const Header = ({ logo = 'images/logo.png' }: { logo?: string }) => {
  const [navCollapse, setNavCollapse] = useState(true);
  const [scroll, setScroll] = useState(false);
  const [theme, setTheme] = useState('dark');
  const colorTheme = theme === 'dark' ? 'dark' : 'light';
  const { scrollYProgress } = useScroll();
  const [path, setPath] = useState('#home');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    try {
      const currentTheme = localStorage.theme ?? 'dark';
      setTheme(currentTheme);
    } catch {
      setTheme('dark');
    }

    const updatePath = () => {
      setPath(window.location.hash || '');
    };

    updatePath();
    window.addEventListener('hashchange', updatePath);

    const updateScroll = () => {
      window.scrollY >= 90 ? setScroll(true) : setScroll(false);
    };

    window.addEventListener('scroll', updateScroll);
    return () => {
      window.removeEventListener('hashchange', updatePath);
      window.removeEventListener('scroll', updateScroll);
    };
  }, []);

  const handleSetTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);

    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Ignore storage write failures (private mode / restricted storage)
    }
  }, [theme, colorTheme]);

  return (
    <header
      className={`backdrop-filter backdrop-blur-lg ${
        scroll ? 'border-b bg-white bg-opacity-40' : 'border-b-0'
      } dark:bg-grey-900 dark:bg-opacity-40 border-gray-200 dark:border-b-0 z-30 min-w-full flex flex-col fixed`}
    >
      <motion.div
        className="fixed h-1 top-0 origin-left z-30 w-full bg-blue-600"
        style={{
          scaleX: scrollYProgress,
        }}
      />
      <CustomCursor />
      {/* Top Navigation (Desktop) */}
      <nav className="lg:w-11/12 2xl:w-4/5 w-full md:px-6 2xl:px-0 mx-auto py-4 hidden sm:flex items-center justify-between">
        <Link href="/" className="2xl:ml-6">
          <Image
            src={logo}
            alt="logo"
            width={150}
            height={50}
            className="w-[150px] h-[50px]"
            fetchPriority="high"
            priority
          />
        </Link>

        <motion.ul variants={variants} initial="visible" animate="animate" className="flex items-center gap-8">
          {navs.map((e, i) => (
            <motion.li variants={childVariants} key={i}>
              <a
                className="hover:text-violet-700 relative hover:dark:text-violet-500 transition-colors capitalize cursor-pointer"
                href={`#${e}`}
                onClick={() => setPath(`#${e}`)}
              >
                {mounted && path === `#${e}` && (
                  <motion.span layoutId="underline" className="absolute left-0 top-full h-[1px] bg-violet-700 w-full" />
                )}
                {e}
              </a>
            </motion.li>
          ))}
          <span
            onClick={() => handleSetTheme()}
            className="hover:bg-gray-100 hover:dark:bg-violet-700 p-1.5 rounded-full cursor-pointer transition-colors toggle"
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </span>
        </motion.ul>
      </nav>

      {/* Mobile Navigation (mobile) */}
      <nav className="p-4 flex sm:hidden items-center justify-between">
        <Image src={logo} alt="logo" width={100} height={40} className="w-[100px] h-[40px]" priority />
        <div className="flex items-center gap-4">
          <span
            onClick={() => handleSetTheme()}
            className="bg-gray-100 dark:bg-violet-700 p-1.5 rounded-full cursor-pointer transition-colors toggle"
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </span>
          <CgMenuRight size={20} className="cursor-pointer" onClick={() => setNavCollapse(false)} />
        </div>
      </nav>
      <div
        className={`flex min-h-screen w-screen absolute md:hidden top-0 ${
          !navCollapse ? 'right-0' : 'right-[-100%]'
        } bottom-0 z-50 ease-in duration-300`}
      >
        <div className="w-1/4" onClick={() => setNavCollapse(true)}></div>

        <div className="flex flex-col p-4 gap-5 bg-gray-100/95 backdrop-filter backdrop-blur-sm dark:bg-grey-900/95 w-3/4">
          <CgClose
            className="self-end my-2 cursor-pointer dark:text-white"
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

const variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const childVariants = {
  visible: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
};
