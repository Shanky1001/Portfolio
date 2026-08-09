import React from 'react';
import { social } from '../../types';
import { getSocialIcon } from '../../utils/socialIcons';

const Socials = ({ socials }: { socials: social[] }) => {
  return (
    <section
      id="socials"
      className="fixed bottom-12 left-4 xl:bottom-16 xl:left-4 2xl:bottom-24 2xl:left-10 hidden lg:flex flex-col items-center gap-0 z-20"
    >
      {/* Pill container */}
      <div className="flex flex-col items-center gap-4 bg-violet-600/20 dark:bg-violet-900/30 backdrop-blur-sm border border-violet-500/30 rounded-full px-2 py-5 shadow-lg shadow-violet-900/20">
        {socials.map((s: social) => {
          const Icon = getSocialIcon(s.icon);
          return (
            <a
              href={s.link}
              target="_blank"
              rel="noreferrer"
              key={s.icon}
              aria-label={`${s.name || s.icon} (opens in new tab)`}
              className="grid place-items-center p-2 rounded-full text-violet-400 hover:text-white hover:bg-violet-600 transition-all duration-200 hover:scale-110"
            >
              {Icon ? <Icon size={18} /> : null}
            </a>
          );
        })}
      </div>

      {/* Vertical line */}
      <span className="w-[2px] h-20 bg-gradient-to-b from-violet-500 to-transparent mt-1"></span>
    </section>
  );
};

export default Socials;
