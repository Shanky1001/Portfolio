import React from 'react';
import dynamic from 'next/dynamic';
import Header from '../../component/header/Header.tsx';
import Hero from '../../component/hero/Hero.tsx';
import Loading from '../../component/Loading/Loading.tsx';
import Socials from '../../component/socials/Socials.tsx';
import About from '../../component/about/About.tsx';
import Footer from '../../component/footer/Footer.tsx';
import ClientBoot from './ClientBoot.tsx';

import { data } from '../../types/index.ts';

// Below-the-fold sections are code-split so their JS (framer-motion / react-icons
// chunks) doesn't block the initial paint. ssr remains enabled (default) so the
// HTML is still included in the RSC payload for SEO and no-JS rendering.
const Skills = dynamic(() => import('../../component/skills/Skills.tsx'), {
  loading: () => null,
});
const Projects = dynamic(() => import('../../component/projects/Projects.tsx'), {
  loading: () => null,
});
const Experience = dynamic(() => import('../../component/experience/Experience.tsx'), {
  loading: () => null,
});
const Certification = dynamic(() => import('../../component/certification/Certification.tsx'), {
  loading: () => null,
});
const Contact = dynamic(() => import('../../component/contact/Contact.tsx'), {
  loading: () => null,
});

const Home = ({ initialData: data }: { initialData?: data }) => {
  if (!data) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-gray-100/50 relative dark:bg-grey-900 text-black dark:text-white overflow-x-hidden">
      <div className="w-full max-w-[1600px] mx-auto">
        <Header logo={data.main.logo} />
        <main id="main">
          <Hero mainData={data.main} resumeUrl={data.about.resumeUrl} />
          <Socials socials={data.socials} />
          <About aboutData={data.about} name={data.main.name} />
          <Experience experienceData={data.experiences} educationData={data.educations} />
          {data?.skills && <Skills skillData={data.skills} />}
          {data?.projects && <Projects projectsData={data.projects} />}
          {data.certifications && <Certification certifications={data.certifications} />}
          <Contact />
        </main>
        <Footer socials={data.socials} name={data.main.name} />
        <ClientBoot />
      </div>
    </div>
  );
};

export default Home;
