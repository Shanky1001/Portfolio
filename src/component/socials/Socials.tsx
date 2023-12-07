import React from "react";
import { social } from "../../types";
import * as Fa from 'react-icons/fa';

const Socials = ({ socials }: { socials: social[] }) => {
  return (
    <section
      id="socials"
      className="fixed xl:bottom-4 xl:left-4 2xl:bottom-10 2xl:left-10 hidden lg:flex flex-col gap-3 z-20"
    >
      {socials.map((s: social) => {
        return (
          <a
            href={s.link}
            target="_blank"
            rel="noreferrer"
            key={s.icon}
            className="grid place-items-center p-3 hover:animate-bounce rounded-full bg-violet-700 text-white"
          >
            {
              //@ts-ignore
              React.createElement(Fa[`${s.icon}`])
            }
          </a>
        );
      })}
    </section>
  );
};

export default Socials;
