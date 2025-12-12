import React, { lazy, useCallback, useEffect, useState } from 'react';
import Header from '../../component/header/Header.tsx';
import Hero from '../../component/hero/Hero.tsx';
import WithSuspense from '../../hoc/WithSuspense.tsx';
import Loading from '../../component/Loading/Loading.tsx';
import { ref, get, onValue } from 'firebase/database';
import { analytics, db, logEvent } from '../../firebaseConfig.ts';

import { data } from '../../types/index.ts';
import Certification from '../../component/certification/Certification.tsx';
import { Analytics } from 'firebase/analytics';

const Socials = WithSuspense(lazy(() => import('../../component/socials/Socials.tsx')));
const About = WithSuspense(lazy(() => import('../../component/about/About.tsx')));
const Skills = WithSuspense(lazy(() => import('../../component/skills/Skills.tsx')));
const Projects = WithSuspense(lazy(() => import('../../component/projects/Projects.tsx')));
const Experience = WithSuspense(lazy(() => import('../../component/experience/Experience.tsx')));
const Contact = WithSuspense(lazy(() => import('../../component/contact/Contact.tsx')));
const Footer = WithSuspense(lazy(() => import('../../component/footer/Footer.tsx')));

const dataRef = ref(db, 'data');

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<data | null>(null);

  const fetch = useCallback(async () => {
    try {
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        const result = snapshot.val();
        setData(result);
      }
    } catch (error) {
      logEvent(analytics as Analytics, "failed to fetch data")
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch().finally(() => {
      setLoading(false);
    });
  }, [fetch]);

  useEffect(() => {
    onValue(dataRef, fetch);
  }, [fetch]);

  if (loading || !data) {
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
      {data.skills && <Skills skillData={data.skills} />}
      {data.projects && <Projects projectsData={data.projects} />}
      {data.certifications && <Certification certifications={data.certifications}/>}
      <Contact />
      <Footer socials={data.socials} name={data.main.name} />
    </div>
    </div>
  );
};

export default Home;
