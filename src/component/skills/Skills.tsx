'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import SectionWrapper from '../../wrapper/sectionWrapper/SectionWrapper.tsx';
import { skill } from '../../types';
import { motion, useInView } from 'framer-motion';
interface Props {
  skillData: skill[];
}

const Skills = ({ skillData }: Props) => {
  const categories = useMemo(() => Array.from(new Set(skillData.map((s) => s.category))), [skillData]);
  const [category, setCategory] = useState(categories[0]);

  // Re-sync the active category if the underlying data changes and the previous
  // selection no longer exists in the new category list.
  useEffect(() => {
    if (categories.length > 0 && !categories.some((c) => c.toLowerCase() === category.toLowerCase())) {
      setCategory(categories[0]);
    }
  }, [categories, category]);

  return (
    <SectionWrapper id="skills" className="mt-12 md:mt-0 mx-4 md:mx-0 xl:my-10 py-14">
      <h2 className="text-4xl font-semibold text-center">Tech Stack</h2>

      <div className="md:w-1/2 overflow-x-auto scroll-hide lg:w-1/3 mx-auto mt-6 bg-white dark:bg-grey-800 p-2 flex justify-between items-center gap-3 rounded-md">
        {categories.map((c: string) => (
          <span
            key={c}
            onClick={() => setCategory(c)}
            className={`p-1.5 md:p-2 text-sm md:text-base w-full text-center cursor-pointer rounded-md ${
              category.toLowerCase() === c.toLowerCase()
                ? 'bg-violet-600 dark:bg-violet-600 text-white'
                : 'bg-white dark:bg-grey-800 hover:bg-gray-100 hover:dark:bg-grey-900'
            } transition-colors capitalize`}
          >
            {c}
          </span>
        ))}
      </div>

      <div className="lg:w-3/4 2xl:w-3/5 my-8 mx-auto md:px-12 grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 place-items-center gap-8">
        {skillData
          .filter((s: skill) => s.category.toLowerCase() === category.toLowerCase())
          .map((s: skill, i: number) => (
            <SkillCard key={s.name} index={i} {...s} />
          ))}
      </div>
    </SectionWrapper>
  );
};

export default Skills;

const SkillCard = ({ name, image, index }: skill & { index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const cardVariants = useMemo(
    () => ({
      hidden: { y: 80, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          delay: index * 0.15,
          duration: 0.75,
          type: 'spring',
        },
      },
    }),
    [index]
  );

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      ref={ref}
      className="flex flex-col justify-center items-center gap-2"
    >
      <div
        title={name}
        className={
          'h-20 w-20 md:h-24 md:w-24 rounded-full bg-gray-100 dark:bg-grey-800 flex items-center justify-center'
        }
      >
        <Image
          alt={name}
          className={`h-12 w-12 md:h-14 md:w-14 object-contain`}
          src={image}
          title={name}
          width={56}
          height={56}
          sizes="56px"
        />
      </div>
      <p className="text-sm md:text-base">{name}</p>
    </motion.div>
  );
};
