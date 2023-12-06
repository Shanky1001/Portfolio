import { aboutData, socialLinks } from "../../data";
import Reveal from "../../wrapper/reveal/Reveal";
import { FaArrowRight } from "react-icons/fa";

const About = () => {
  return (
    <section
      id="about"
      className="py-24 frc justify-center text-black bg-white dark:bg-[#EEE] p-10"
    >
      <div className="flex flex-col w-full gap-7 768:gap-24 768:flex-row items-start">
        <Reveal>
          <h2 className="text-6xl font-extrabold">About</h2>
        </Reveal>
        <div className="flex-1 fcc items-start px-0 768:px-3 text-justify gap-3 text-lg font-medium 768:text-2xl">
          {aboutData.map((data, index) => (
            <Reveal key={index}>
              <p>{data}</p>
            </Reveal>
          ))}
          <Reveal>
            <div className="flex flex-row items-center justify-start gap-5">
              <h5 className="frc gap-3 text-orange-400">
                My Links <FaArrowRight />
              </h5>
              <p className="frc gap-3">
                {socialLinks.map((links) => (
                  <a key={links.url} href={links.url}>
                    {links.icon}
                  </a>
                ))}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
