import React from 'react';
import SectionWrapper from '../../wrapper/sectionWrapper/SectionWrapper.tsx';
import { about } from '../../types/index.ts';
import RevealAnimation from '../../wrapper/reveal/RevealAnimation.tsx';
import SLabel from '../common/SLabel.tsx';

interface Props {
  aboutData: about;
  name: string;
}

const About = ({ aboutData, name }: Props) => {
  const { aboutImage, aboutImageCaption, title, about, about_work, resumeUrl } = aboutData;

  const renderAboutWork = Array.isArray(about_work) ? (
    about_work.map((ab) => (
      <RevealAnimation key={ab}>
        <p className="text-sm md:text-base my-1 text-gray-600 dark:text-gray-300">{ab}</p>
      </RevealAnimation>
    ))
  ) : (
    <RevealAnimation>
      <p className="text-sm md:text-base my-2 text-gray-600 dark:text-gray-300">{about_work}</p>
    </RevealAnimation>
  );

  return (
    <SectionWrapper
      id="about"
      className="pt-12 bg-gradient-to-b from-white to-gray-100/20 dark:from-grey-900 dark:to-grey-900"
    >
      <h2 className="text-4xl font-semibold text-center">About Me</h2>

      <div className="w-full lg:w-11/12 2xl:w-4/5 mt-2 lg:mt-20 mx-auto flex flex-col md:gap-4 lg:flex-row justify-between items-center">
        <div className="p-3 w-56 self-start md:w-2/5 lg:w-72 bg-white dark:bg-grey-800 flex flex-col gap-2 items-center rounded-2xl mx-auto lg:mx-16 hover:-translate-y-2 transition-transform duration-300 lg:-rotate-3">
          <img
            alt="profile"
            loading={'lazy'}
            className="w-full h-60 md:h-80 rounded-2xl object-cover grayscale hover:grayscale-0 transition-all bg-violet-100"
            src={aboutImage}
          />
          <span className="font-medium font-sans">{aboutImageCaption || '< I Build Stuff 🚀 />'}</span>
        </div>

        <div className="flex-1 text-left mx-4 mt-4 md:mt-0 md:mx-0 md:p-6">
          <div className="flex flex-col gap-2.5">
            <RevealAnimation>
              <p className="text-3xl font-semibold">{name}</p>
            </RevealAnimation>
            <RevealAnimation>
              <div className="flex gap-2 flex-wrap">
                {title.map((t) => (
                  <SLabel key={t} text={t} />
                ))}
              </div>
            </RevealAnimation>
            <RevealAnimation>
              <p className="text-sm md:text-base my-2 text-gray-600 dark:text-gray-300">{about}</p>
            </RevealAnimation>
            {renderAboutWork}
            <div className="flex items-center gap-4 md:mt-4">
              {resumeUrl.trim() && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  className="text-sm md:text-base bg-violet-600 dark:bg-violet-700 text-white w-fit rounded-md py-2 px-6 hover:shadow-xl transition-shadow"
                  rel="noreferrer"
                >
                  Resume
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;
