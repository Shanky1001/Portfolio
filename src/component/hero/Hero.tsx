import React from 'react';
import TechStackCarousel from '../techStackCarousel/TechStackCarousel';
import { main } from '../../types';
import { IoIosArrowForward } from 'react-icons/io';
import RevealAnimation from '../../wrapper/reveal/RevealAnimation.tsx';

interface HeroProps {
  mainData: main;
  resumeUrl: string;
}

const Hero = ({ mainData, resumeUrl }: HeroProps) => {
  const { name, shortDesc, longDesc, techStackImages, heroImage } = mainData;
  return (
    <section id="home" className="dark:bg-grey-900 relative w-full mx-auto overflow-hidden">
      <div className="py-16 lg:py-48 flex flex-col-reverse items-center lg:flex-row justify-around gap-16 lg:gap-0">
        <div className="flex flex-col gap-4 md:gap-6 text-left lg:w-1/2 2xl:w-1/3 mx-4 md:mx-6 xl:mx-0">
          <RevealAnimation>
            <div className="flex items-center gap-1">
              <span className="text-2xl md:text-3xl leading-none" role="img" aria-label="waving hand">
                👋
              </span>
              <p className="text-lg md:text-xl mt-2 md:mt-1.5">Hey, I&apos;m </p>
            </div>
          </RevealAnimation>
          <RevealAnimation>
            <h1 className="text-4xl md:text-6xl font-bold relative">{name}</h1>
          </RevealAnimation>
          {shortDesc && (
            <div className="flex flex-row items-start md:items-center gap-1.5">
              <RevealAnimation>
                <h2 className="text-lg md:text-2xl">{shortDesc}</h2>
              </RevealAnimation>
            </div>
          )}
          {longDesc && (
            <RevealAnimation>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">{longDesc}</p>
            </RevealAnimation>
          )}
          <div className="frc gap-3">
            <a
              className="w-fit text-sm md:text-base py-2 px-4 cursor-pointer flex items-center gap-1 rounded-md bg-violet-600 hover:bg-violet-700 dark:bg-violet-700 hover:dark:bg-violet-800 transition-colors group text-white"
              href="#about"
            >
              About Me
              <IoIosArrowForward className="group-hover:translate-x-1 transition-transform" />
            </a>
            {resumeUrl && (
              <a
                className="w-fit text-sm md:text-base py-2 px-4 cursor-pointer font-medium flex items-center gap-1 rounded-md bg-neutral-200 hover:bg-neutral-200 dark:bg-neutral-100 hover:dark:bg-neutral-800 transition-colors group text-violet-600"
                href={resumeUrl}
                target="_blank"
                download="ShashankRai_resume.pdf"
                rel="noreferrer"
              >
                Resume
                <IoIosArrowForward className="group-hover:translate-x-1 transition-transform" />
              </a>
            )}
          </div>
        </div>

        <div className="relative mx-auto lg:mx-0 mt-12 md:mt-16 lg:mt-0">
          <TechStackCarousel avatarSrc={heroImage} techStackImages={techStackImages} />
        </div>
      </div>

      {/* Decorative dot grid; served as a static, cacheable SVG asset rather than inlined into every HTML response. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/decoration.svg"
        alt=""
        aria-hidden="true"
        width={186}
        height={186}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        className="absolute hidden md:block right-0 bottom-0 translate-x-6 translate-y-4 opacity-25 lg:opacity-60"
      />
    </section>
  );
};

export default Hero;
