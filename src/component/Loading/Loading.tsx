import React from "react";

const Loading = () => {
  return (
    <div className="frc justify-center p-10 w-full">
      <svg
        className="animate-spin h-8 w-8 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="#1E40AF"
          d="M12 2a10 10 0 0110 10 1 1 0 01-2 0 8 8 0 00-8-8 1 1 0 010-2z"
        ></path>
      </svg>
    </div>
  );
};

export default Loading;
