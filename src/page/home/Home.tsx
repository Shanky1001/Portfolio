import React from "react";
import Header from "../../component/header/Header";
import Hero from "../../component/hero/Hero";
import Socials from "../../component/socials/Socials";
import Skills from "../../component/skills/Skills";
import Projects from "../../component/projects/Projects";
import Experience from "../../component/experience/Experience";
import Contact from "../../component/contact/Contact.tsx";
import Footer from "../../component/footer/Footer.tsx";

const Home = ({ data }) => {
  return (
    <>
      {/* <Header logo={data.main.name} />
      <Hero mainData={data.main} />
      <Socials socials={data.socials} /> */}
      {/* <About aboutData={data.about} name={data.main.name} /> */}
      {/* <Skills skillData={data.skills} />
      <Projects projectsData={data.projects} />
      <Experience
        experienceData={data.experiences}
        educationData={data.educations}
      /> */}
      <Contact />
      {/* <CallToAction /> */}
      <Footer socials={data.socials} name={data.main.name} />
    </>
  );
};

export default Home;
