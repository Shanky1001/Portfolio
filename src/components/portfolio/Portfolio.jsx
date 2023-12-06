import React from "react";
import ParallaxWrapper from "../../wrapper/parallax/Parallax";
import { projectData } from "../../data";
import { motion } from "framer-motion";

const Portfolio = () => {
  return (
    <section id="portfolio" className="bg-white">
      <ParallaxWrapper>
        {projectData.map((val) => (
          <motion.div
            key={val.id}
            className="w-[300px] bg-red-50 h-[15rem] rounded-md shadow-md overflow-hidden"
          >
            <img
              src={
                val.img ||
                "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
              }
              alt={val.title}
              className="w-full h-full"
            />
          </motion.div>
        ))}
      </ParallaxWrapper>
    </section>
  );
};

export default Portfolio;
