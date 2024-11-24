import React, { lazy, useCallback, useEffect, useState } from "react";
import Header from "../../component/header/Header.tsx";
import Hero from "../../component/hero/Hero.tsx";
import WithSuspense from "../../hoc/WithSuspense.tsx";
import Loading from "../../component/Loading/Loading.tsx";
import { ref, get, onValue } from "firebase/database";
import { db } from "../../firebaseConfig.ts";

const About = WithSuspense(
  lazy(() => import("../../component/about/About.tsx"))
);
const Socials = WithSuspense(
  lazy(() => import("../../component/socials/Socials.tsx"))
);
const Skills = WithSuspense(
  lazy(() => import("../../component/skills/Skills.tsx"))
);
const Projects = WithSuspense(
  lazy(() => import("../../component/projects/Projects.tsx"))
);
const Experience = WithSuspense(
  lazy(() => import("../../component/experience/Experience.tsx"))
);
const Contact = WithSuspense(
  lazy(() => import("../../component/contact/Contact.tsx"))
);
const Footer = WithSuspense(
  lazy(() => import("../../component/footer/Footer.tsx"))
);

const dataRef = ref(db, "data");

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({});

  const fetch = useCallback(async () => {
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      const result = snapshot.val();
      setData(result);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch();
  }, [fetch]);

  useEffect(() => {
    onValue(dataRef, fetch);
  }, [fetch]);

  return (
    <>
      {loading ? (
        <div className="w-screen h-screen flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="w-full max-w-[1600px] mx-auto">
          <Header logo={data.main.name} />
          <Hero mainData={data.main} resumeUrl={data.about.resumeUrl} />
          <Socials socials={data.socials} />
          <About aboutData={data.about} name={data.main.name} />
          <Skills skillData={data.skills} />
          <Projects projectsData={data.projects} />
          <Experience
            experienceData={data.experiences}
            educationData={data.educations}
          />
          <Contact />
          <Footer socials={data.socials} name={data.main.name} />
        </div>
      )}
    </>
  );
};

export default Home;
