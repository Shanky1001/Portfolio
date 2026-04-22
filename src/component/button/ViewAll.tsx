import React, { MouseEventHandler } from "react";

export const ViewAll = ({
  handleClick,
  title,
  scrollTo,
}: {
  handleClick: MouseEventHandler;
  title: string;
  scrollTo: string;
}) => {
  return (
    <>
      <div className="pointer-events-none w-4/5 mx-auto z-20 -translate-y-14 h-16 bg-gradient-to-t from-white dark:from-grey-900 to-transparent"></div>
      <div className="text-center -translate-y-24">
        {title === "View All" ? (
          <button
            onClick={handleClick}
            className={`bg-violet-600 text-white px-4 ${
              title === "View All" ? "animate-bounce" : "animate-none"
            } py-1.5 rounded-md hover:shadow-xl transition-shadow`}
          >
            {title}
          </button>
        ) : (
          <a
            href={scrollTo}
            className={`bg-violet-600 text-white px-4 ${
              title === "View All" ? "animate-bounce" : "animate-none"
            } cursor-pointer py-1.5 rounded-md hover:shadow-xl transition-shadow`}
            onClick={() => handleClick({} as React.MouseEvent)}
          >
            {title}
          </a>
        )}
      </div>
    </>
  );
};
