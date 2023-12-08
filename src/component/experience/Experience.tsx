import React, { useState, useRef, useMemo } from "react";
import { education, experience } from "../../types/index.ts";
import SectionWrapper from "../../wrapper/sectionWrapper/SectionWrapper.tsx";
import { MdSchool, MdWork } from "react-icons/md";
import { motion, useInView } from "framer-motion";
import RevealAnimation from "../../wrapper/reveal/RevealAnimation.tsx";
import { ViewAll } from "../button/ViewAll.tsx";
interface Props {
  experienceData: experience[];
  educationData: education[];
}

const Experience = ({ experienceData, educationData }: Props) => {
  const [show, setShow] = useState("Experience");
  const [viewAll, setViewAll] = useState(false);

  const Details = useMemo(() => {
    let data: education[] | experience[];
    data = show === "Experience" ? [...experienceData] : [...educationData];
    data = viewAll ? data : data.slice(0, 2);
    return data;
  }, [viewAll, show, experienceData, educationData]);

  return (
    <SectionWrapper id="experience" className="min-h-screen py-10">
      <h2 className="text-4xl font-semibold text-center">Experience</h2>

      <div className="w-fit mx-auto mt-6 p-2 bg-white dark:bg-grey-800 rounded-md flex gap-2 items-center">
        {["Experience", "Education"].map((e, i) => (
          <button
            key={i}
            onClick={() => setShow(e)}
            className={`py-2 px-4 rounded-md transition-colors ${
              show === e
                ? "bg-violet-600 text-white"
                : "hover:bg-gray-100 hover:dark:bg-grey-900 text-black dark:text-white"
            }`}
          >
            {e}
          </button>
        ))}
      </div>

      <div className="lg:container sm:mx-4 lg:mx-auto lg:w-5/6 2xl:w-3/4">
        <div className="relative wrap overflow-hidden p-4 md:py-10 md:px-0">
          <div className="left-6 md:left-1/2 absolute border-opacity-20 border-gray-400 dark:border-grey-800 h-[70%] border"></div>

          {Details.map((e: any, i: number) => (
            // @ts-ignore
            <ExperienceCard key={i} {...e} index={i} />
          ))}
        </div>
      </div>

      {(show === "Experience" ? experienceData : educationData).length > 2 && (
        <ViewAll
          scrollTo="#experience"
          title={viewAll ? "Okay, I got it" : "View All"}
          handleClick={() => setViewAll(!viewAll)}
        />
      )}
    </SectionWrapper>
  );
};

export default Experience;

interface ExperienceProps {
  index: number;
  company: string;
  position: string;
  desc: string[];
  institute: string;
  degree: string;
  duration: string;
}

const ExperienceCard = ({
  index,
  company,
  position,
  desc,
  institute,
  degree,
  duration,
}: ExperienceProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const cardVariants = {
    hidden: { x: index % 2 === 0 ? 20 : -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <div
      className={`mb-6 md:mb-8 flex md:justify-between items-center w-full ${
        index % 2 === 0 ? "md:flex-row-reverse left-timeline" : "right-timeline"
      }`}
    >
      <div className="order-1 md:w-5/12"></div>

      <span className="z-20 flex items-center order-1 justify-center w-6 h-6 md:w-9 md:h-9 bg-violet-200 rounded-full ring-4 md:ring-8 ring-white dark:ring-grey-800 dark:bg-violet-900">
        {company && (
          <MdWork className="text-base md:text-xl text-violet-600 dark:text-violet-400" />
        )}
        {institute && (
          <MdSchool className="text-base md:text-xl text-violet-600 dark:text-violet-400" />
        )}
      </span>

      <motion.div
        ref={ref}
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="order-1 rounded-lg w-full ml-3 md:ml-0 bg-white dark:bg-grey-800 md:w-5/12 p-3 md:px-4 md:py-4"
      >
        <RevealAnimation>
          <h3 className="mb-2 font-medium text-lg md:text-xl">
            {company || institute}
          </h3>
        </RevealAnimation>
        <RevealAnimation>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {position || degree} | {duration}
          </p>
        </RevealAnimation>
        <RevealAnimation>
          <ul className="text-sm text-gray-400 mt-2 ml-4 list-disc">
            {desc &&
              desc.map((d, i) => (
                <li key={i} className="mb-0.5">
                  {d}
                </li>
              ))}
          </ul>
        </RevealAnimation>
      </motion.div>
    </div>
  );
};
