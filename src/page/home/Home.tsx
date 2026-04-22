import React from 'react';
import Header from '../../component/header/Header.tsx';
import Hero from '../../component/hero/Hero.tsx';
import Loading from '../../component/Loading/Loading.tsx';
import Socials from '../../component/socials/Socials.tsx';
import About from '../../component/about/About.tsx';
import Skills from '../../component/skills/Skills.tsx';
import Projects from '../../component/projects/Projects.tsx';
import Experience from '../../component/experience/Experience.tsx';
import Certification from '../../component/certification/Certification.tsx';
import Contact from '../../component/contact/Contact.tsx';
import Footer from '../../component/footer/Footer.tsx';
import ClientBoot from './ClientBoot.tsx';

import { data } from '../../types/index.ts';

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
        <Hero mainData={data.main} resumeUrl={data.about.resumeUrl} />
        <Socials socials={data.socials} />
        <About aboutData={data.about} name={data.main.name} />
        <Experience experienceData={data.experiences} educationData={data.educations} />
        {data?.skills && <Skills skillData={data.skills} />}
        {data?.projects && <Projects projectsData={data.projects} />}
        {data.certifications && <Certification certifications={data.certifications} />}
        <Contact />
        <Footer socials={data.socials} name={data.main.name} />
        <ClientBoot />
      </div>
    </div>
  );
};

export default Home;
