'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import SectionWrapper from '../../wrapper/sectionWrapper/SectionWrapper.tsx';
import { project } from '../../types/index.ts';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaVideo } from 'react-icons/fa';
import { BiLinkExternal } from 'react-icons/bi';
import RevealAnimation from '../../wrapper/reveal/RevealAnimation.tsx';
import { ViewAll } from '../button/ViewAll.tsx';

interface Props {
  projectsData: project[];
}

const Projects = ({ projectsData }: Props) => {
  const categories = useMemo(() => [...new Set(projectsData.map((s) => s.category))], [projectsData]);
  const [category, setCategory] = useState(categories[0]);
  const [viewAll, setViewAll] = useState(false);

  // Re-sync the active category if the underlying data changes and the previous
  // selection no longer exists in the new category list.
  useEffect(() => {
    if (categories.length > 0 && !categories.some((c) => c.toLowerCase() === category.toLowerCase())) {
      setCategory(categories[0]);
      setViewAll(false);
    }
  }, [categories, category]);

  const filteredProjects = useMemo(
    () => projectsData.filter((p) => p.category.toLowerCase() === category.toLowerCase()),
    [projectsData, category]
  );

  return (
    <SectionWrapper id="projects" className="mx-4 md:mx-0 py-10">
      <h2 className="sectionTitle">Projects</h2>

      <div className="overflow-x-auto scroll-hide md:w-full max-w-screen-sm mx-auto mt-6 flex justify-between items-center gap-2 md:gap-3 bg-white dark:bg-grey-800 p-2 rounded-md shadow-sm">
        {categories.map((c) => (
          <span
            key={c}
            onClick={() => {
              setCategory(c);
              setViewAll(false);
            }}
            data-analytics-event="project_interaction"
            data-interaction-type="filter_used"
            data-project-category={c}
            className={`p-1.5 md:p-2 w-full text-sm md:text-base text-center capitalize rounded-md ${
              category.toLowerCase() === c.toLowerCase()
                ? 'bg-violet-600 text-white'
                : 'hover:bg-gray-100 hover:dark:bg-grey-900'
            } cursor-pointer transition-colors`}
          >
            {c}
          </span>
        ))}
      </div>

      <div className="md:mx-6 lg:mx-auto lg:w-5/6 2xl:w-3/4 my-4 md:my-8 mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-10">
        {filteredProjects.slice(0, viewAll ? filteredProjects.length : 6).map((p: project) => (
          <ProjectCard key={p.name} {...p} />
        ))}
      </div>

      {filteredProjects.length > 6 && (
        <div className="mt-16">
          <ViewAll
            scrollTo="#projects"
            title={viewAll ? 'Okay, I got it' : 'View All'}
            handleClick={() => setViewAll(!viewAll)}
          />
        </div>
      )}
    </SectionWrapper>
  );
};

export default Projects;

const projectCardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
};

const ProjectCard = ({ name, image, techstack, links }: project) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { video, visit, code } = links;
  return (
    <motion.div
      ref={ref}
      variants={projectCardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="flex relative flex-col gap-2 group shadow-md bg-white dark:bg-grey-800 rounded-lg p-4"
    >
      <div className="rounded-lg bg-violet-50 overflow-hidden">
        <div className="relative w-full h-48 overflow-hidden group/image">
          <Image
            src={image}
            alt={`${name} cover`}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            loading="lazy"
            className="object-cover object-top transition-[object-position] duration-[3000ms] ease-in-out group-hover/image:object-bottom"
          />
        </div>
        {(visit.trim() || code?.trim() || video?.trim()) && (
          <div className="absolute bottom-0 bg-slate-400 bg-opacity-60 w-full scale-x-0 group-hover:scale-100 transition-transform z-40 origin-left duration-200 ease-linear right-0 h-[80px] rounded-lg flex items-center gap-4 justify-end">
            {visit && (
              <a
                href={visit}
                target="_blank"
                aria-label={`Visit ${name} (opens in new tab)`}
                data-analytics-event="project_interaction"
                data-interaction-type="visit_click"
                data-project-name={name}
                className="bg-white text-black p-2 rounded-lg hover:bg-black hover:text-white transition-colors"
                rel="noreferrer"
              >
                <BiLinkExternal size={20} />
              </a>
            )}
            {code && (
              <a
                href={code}
                target="_blank"
                aria-label={`View source for ${name} on GitHub (opens in new tab)`}
                data-analytics-event="project_interaction"
                data-interaction-type="code_click"
                data-project-name={name}
                className="bg-white text-black p-2 rounded-lg hover:bg-black hover:text-white transition-colors"
                rel="noreferrer"
              >
                <FaGithub size={20} />
              </a>
            )}
            {video && (
              <a
                href={video}
                target="_blank"
                aria-label={`Watch ${name} demo video (opens in new tab)`}
                data-analytics-event="project_interaction"
                data-interaction-type="video_click"
                data-project-name={name}
                className="bg-white text-black p-2 rounded-lg hover:bg-black hover:text-white transition-colors"
                rel="noreferrer"
              >
                <FaVideo size={20} />
              </a>
            )}
          </div>
        )}
      </div>
      <div className="my-2 flex flex-col gap-3">
        <RevealAnimation>
          <h3 className="text-xl font-medium">{name}</h3>
        </RevealAnimation>
        <RevealAnimation>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">Tech Stack:</span> {techstack}
          </p>
        </RevealAnimation>
      </div>
    </motion.div>
  );
};
