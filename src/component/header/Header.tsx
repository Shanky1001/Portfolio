'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiSun, FiMoon } from 'react-icons/fi';
import { CgClose, CgMenuRight } from 'react-icons/cg';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import CustomCursor from '../cursor/CustomCursor.tsx';

const navs = ['home', 'about', 'projects', 'experience', 'contact'];

const getInitialTheme = (): string => {
  if (typeof window === 'undefined') return 'dark';
  try {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'dark';
  }
};

const Header = ({ logo = 'images/logo.png' }: { logo?: string }) => {
  const [navCollapse, setNavCollapse] = useState(true);
  const [scroll, setScroll] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme); // lazy initializer — only called once
  const { scrollY, scrollYProgress } = useScroll();
  // Initialise empty so the underline doesn't flash on "Home" before hydration
  // when the user lands without a hash. The effect below sets the real value.
  const [path, setPath] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updatePath = () => {
      setPath(window.location.hash || '');
    };

    updatePath();
    window.addEventListener('hashchange', updatePath);
    return () => {
      window.removeEventListener('hashchange', updatePath);
    };
  }, []);

  // Single source of truth for scroll state — framer-motion's scrollY
  // already throttles via rAF internally, so we don't need our own listener.
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const next = latest >= 90;
    setScroll((prev) => (prev === next ? prev : next));
  });

  const handleSetTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    const opposite = theme === 'dark' ? 'light' : 'dark'; // derived inline — only `theme` needed in deps
    root.classList.remove(opposite);
    root.classList.add(theme);

    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Ignore storage write failures (private mode / restricted storage)
    }
  }, [theme]);

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
        <Link href="/" prefetch={false} className="2xl:ml-6">
          <Image
            src={logo}
            alt="Shashank Rai"
            width={150}
            height={50}
            className="w-[150px] h-[50px]"
          />
        </Link>

        <motion.ul variants={variants} initial="hidden" animate="shown" className="flex items-center gap-8">
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
        <Image src={logo} alt="Shashank Rai" width={100} height={40} className="w-[100px] h-[40px]" />
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
      {!navCollapse && (
        <div className="flex min-h-screen w-screen absolute md:hidden top-0 right-0 bottom-0 z-50">
          <div className="w-1/4" onClick={() => setNavCollapse(true)}></div>

          <div className="flex flex-col p-4 gap-5 bg-gray-100/95 backdrop-filter backdrop-blur-sm dark:bg-grey-900/95 w-3/4">
            <CgClose
              className="self-end my-2 cursor-pointer dark:text-white"
              size={20}
              onClick={() => setNavCollapse(true)}
            />

            {navs.slice(0, -1).map((e) => (
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
              href={`#${navs[navs.length - 1]}`}
              onClick={() => setNavCollapse(true)}
              className="px-6 py-1.5 rounded-md bg-violet-600 hover:bg-violet-700 text-white text-center capitalize"
            >
              {navs[navs.length - 1]}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

const variants = {
  shown: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: -50 },
  shown: { opacity: 1, y: 0 },
};
