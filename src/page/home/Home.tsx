import React, { Suspense } from "react";
import Header from "../../component/header/Header.tsx";
import Hero from "../../component/hero/Hero.tsx";
import Loading from "../../component/Loading/Loading.tsx";
const Socials = React.lazy(() => import("../../component/socials/Socials.tsx"));
// import Socials from "../../component/socials/Socials.tsx";
const Skills = React.lazy(() => import("../../component/skills/Skills.tsx"));
// import Skills from "../../component/skills/Skills.tsx";
const Projects = React.lazy(
  () => import("../../component/projects/Projects.tsx")
);
// import Projects from "../../component/projects/Projects.tsx";
const Experience = React.lazy(
  () => import("../../component/experience/Experience.tsx")
);
// import Experience from "../../component/experience/Experience.tsx";
const Contact = React.lazy(() => import("../../component/contact/Contact.tsx"));
// import Contact from "../../component/contact/Contact.tsx";
const Footer = React.lazy(() => import("../../component/footer/Footer.tsx"));
// import Footer from "../../component/footer/Footer.tsx";
const About = React.lazy(() => import("../../component/about/About.tsx"));
// import About from "../../component/about/About.tsx";

const Home = ({ data }) => {
  return (
    <div className="w-full max-w-[1600px] mx-auto">
      <Header logo={data.main.name} />
      <Hero mainData={data.main} resumeUrl={data.about.resumeUrl} />
      <Suspense fallback={<Loading />}>
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
      </Suspense>
    </div>
  );
};

export default Home;
