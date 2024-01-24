import React, { useState, useEffect, useRef } from "react";
import SectionWrapper from "../../wrapper/sectionWrapper/SectionWrapper.tsx";
import { project } from "../../types/index.ts";
import { motion, useInView } from "framer-motion";
import { FaGithub, FaVideo } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";
import RevealAnimation from "../../wrapper/reveal/RevealAnimation.tsx";
import { ViewAll } from "../button/ViewAll.tsx";

interface Props {
  projectsData: project[];
}

const Projects = ({ projectsData }: Props) => {
  const [projects] = useState<project[]>([...projectsData]);

  // const categories = ['All', ...Array.from(new Set(projects.map((s) => s.category)))]
  const categories = [...Array.from(new Set(projects.map((s) => s.category)))];
  const [category, setCategory] = useState(categories[0]);

  const [filteredProjects, setFilteredProjects] = useState<project[]>([]);
  const [viewAll, setViewAll] = useState(false);

  const filterProjects = (cat: string) => {
    setViewAll(false);
    setCategory(cat);
    setFilteredProjects([
      ...projects.filter(
        (p: project) => p.category.toLowerCase() === cat.toLowerCase()
      ),
    ]);
  };

  useEffect(() => {
    filterProjects(categories[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SectionWrapper id="projects" className="mx-4 md:mx-0 py-10">
      <h2 className="text-4xl font-semibold text-center">Projects</h2>

      <div className="overflow-x-auto scroll-hide md:w-full max-w-screen-sm mx-auto mt-6 flex justify-between items-center gap-2 md:gap-3 bg-white dark:bg-grey-800 p-2 rounded-md shadow-sm">
        {categories.map((c: string = "", i: number) => (
          <span
            key={i}
            onClick={() => filterProjects(c)}
            className={`p-1.5 md:p-2 w-full text-sm md:text-base text-center capitalize rounded-md ${
              category.toLowerCase() === c.toLowerCase()
                ? "bg-violet-600 text-white"
                : "hover:bg-gray-100 hover:dark:bg-grey-900"
            } cursor-pointer transition-all`}
          >
            {c}
          </span>
        ))}
      </div>

      <div className="md:mx-6 lg:mx-auto lg:w-5/6 2xl:w-3/4 my-4 md:my-8 mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-10">
        {filteredProjects
          .slice(0, viewAll ? filteredProjects.length : 6)
          .map((p: project, i: number) => (
            <ProjectCard key={i} {...p} />
          ))}
      </div>

      {filteredProjects.length > 6 && (
        <ViewAll
          scrollTo="projects"
          title={viewAll ? "Okay, I got it" : "View All"}
          handleClick={() => setViewAll(!viewAll)}
        />
      )}
    </SectionWrapper>
  );
};

export default Projects;

const ProjectCard = ({ name, image, category, techstack, links }: project) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };
  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="flex relative flex-col gap-2 group shadow-md bg-white dark:bg-grey-800 rounded-lg p-4"
    >
      <div className="rounded-lg bg-violet-50 overflow-hidden">
        <div
          style={{
            backgroundImage: `url(${image})`,
            transition: "ease-in-out 3s",
          }}
          className="w-full h-48 max-h-full bg-top bg-cover hover:bg-bottom hover:transform hover:transition-transform"
        ></div>
        {(links.visit.trim() || links.code.trim() || links.video.trim()) && (
          <div className="absolute bottom-0 bg-slate-400 bg-opacity-60 w-full scale-x-0 group-hover:scale-100 transition-transform z-40 origin-left duration-200 ease-linear right-0 h-[80px] rounded-lg flex items-center gap-4 justify-end">
            {links.visit.trim() && (
              <a
                href={links.visit}
                target="_blank"
                className="bg-white text-black p-2 rounded-lg hover:bg-black hover:text-white transition-all"
                rel="noreferrer"
              >
                <BiLinkExternal size={20} />
              </a>
            )}
            {links.code.trim() && (
              <a
                href={links.code}
                target="_blank"
                className="bg-white text-black p-2 rounded-lg hover:bg-black hover:text-white transition-all"
                rel="noreferrer"
              >
                <FaGithub size={20} />
              </a>
            )}
            {links.video.trim() && (
              <a
                href={links.video}
                target="_blank"
                className="bg-white text-black p-2 rounded-lg hover:bg-black hover:text-white transition-all"
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
          <p className="text-sm text-gray-400">
            {" "}
            <span className="font-medium">Tech Stack:</span> {techstack}
          </p>
        </RevealAnimation>
      </div>
    </motion.div>
  );
};
