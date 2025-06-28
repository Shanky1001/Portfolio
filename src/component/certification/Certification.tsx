import React, { useRef } from 'react';
import { certification } from '../../types';
import SectionWrapper from '../../wrapper/sectionWrapper/SectionWrapper';
import RevealAnimation from '../../wrapper/reveal/RevealAnimation';
import { motion, useInView } from 'framer-motion';

function Certification({ certifications }: { certifications: certification[] }) {
  return (
    <SectionWrapper id="certifications" className="mt-12 md:mt-0 mx-4 md:mx-0 xl:my-10 py-14">
      <h2 className="text-4xl font-semibold text-center">Certificates</h2>
      <div className="md:mx-6 lg:mx-auto lg:w-5/6 2xl:w-3/4 my-÷ md:my-8 mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-10">
        {certifications.map((cert) => (
          <CertificationCard key={cert.title} data={cert} />
        ))}
      </div>
    </SectionWrapper>
  );
}

export default Certification;

interface CertificationCardInterface {
  data: certification;
}
const CertificationCard = ({ data }: CertificationCardInterface) => {
  const { title, issuer, desc, link } = data;
  const ref = useRef(null);
  const isInView = useInView(ref);
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeInOut' },
    },
  };
  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="w-full bg-white dark:bg-grey-800 rounded-lg shadow-md hover:shadow-lg transition p-6 flex flex-col justify-between"
    >
      <RevealAnimation>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{issuer}</p>
          {desc && <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{desc}</p>}
        </div>
        <div>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 dark:text-purple-400 hover:underline font-medium text-sm"
            >
              View Certificate →
            </a>
          )}
        </div>
      </RevealAnimation>
    </motion.div>
  );
};
