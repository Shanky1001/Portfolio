import React from 'react';
import { social } from '../../types';
import { getSocialIcon } from '../../utils/socialIcons';

const Socials = ({ socials }: { socials: social[] }) => {
  return (
    <section
      id="socials"
      className="fixed xl:bottom-20 xl:left-4 2xl:bottom-20 2xl:left-10 hidden lg:flex flex-col items-center gap-3 z-20"
    >
      {socials.map((s: social) => {
        const Icon = getSocialIcon(s.icon);
        return (
          <a
            href={s.link}
            target="_blank"
            rel="noreferrer"
            key={s.icon}
            className="grid place-items-center p-3 hover:animate-bounce rounded-full bg-violet-700 text-white"
          >
            {Icon ? <Icon /> : null}
          </a>
        );
      })}
      <span className="w-[2px] h-24  bg-[#7C3AED]"></span>
    </section>
  );
};

export default Socials;
