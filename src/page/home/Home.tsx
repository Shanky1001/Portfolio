import React, { lazy, useEffect, useState } from 'react';
import Header from '../../component/header/Header.tsx';
import Hero from '../../component/hero/Hero.tsx';
import WithSuspense from '../../hoc/WithSuspense.tsx';
import Loading from '../../component/Loading/Loading.tsx';
import { ref, onValue } from 'firebase/database';
import { analytics, db, logEvent } from '../../firebaseConfig.ts';

import { data } from '../../types/index.ts';
import Certification from '../../component/certification/Certification.tsx';
import { Analytics } from 'firebase/analytics';
import { GrUpdate } from "react-icons/gr";
import { toastEventBus } from '../../toast.ts';
import ToastContainer from '../../component/toast/ToastContainer.tsx';

const Socials = WithSuspense(lazy(() => import('../../component/socials/Socials.tsx')));
const About = WithSuspense(lazy(() => import('../../component/about/About.tsx')));
const Skills = WithSuspense(lazy(() => import('../../component/skills/Skills.tsx')));
const Projects = WithSuspense(lazy(() => import('../../component/projects/Projects.tsx')));
const Experience = WithSuspense(lazy(() => import('../../component/experience/Experience.tsx')));
const Contact = WithSuspense(lazy(() => import('../../component/contact/Contact.tsx')));
const Footer = WithSuspense(lazy(() => import('../../component/footer/Footer.tsx')));

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<data | null>(null);

  useEffect(() => {
    const dataRef = ref(db, 'data');

    const unsubscribe = onValue(
      dataRef,
      snapshot => {
        if (snapshot.exists()) {
          setData(snapshot.val());
        }
        setLoading(false);
      },
      () => {
        logEvent(analytics as Analytics, 'firebase_fetch_failed');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);


  useEffect(() => {
    const handleSWUpdate = () => {
      toastEventBus.emit({
        message: 'A new update is available!',
        actionLabel: <GrUpdate size={20} />,
        onAction: () => window.location.reload(),
        duration: 10000,
      });
    };

    window.addEventListener('update-available', handleSWUpdate as EventListener);
    return () =>
      window.removeEventListener('update-available', handleSWUpdate as EventListener);
  }, []);


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
        {data?.skills && <Skills skillData={data.skills} />}
        {data?.projects && <Projects projectsData={data.projects} />}
        {data.certifications && <Certification certifications={data.certifications} />}
        <Contact />
        <Footer socials={data.socials} name={data.main.name} />
        <ToastContainer />
      </div>
    </div>
  );
};

export default Home;
