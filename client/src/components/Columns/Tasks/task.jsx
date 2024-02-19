import React from "react";

export const Task = ({ title, description }) => {
  return (
    <>
      <div className="flex flex-row justify-between items-center bg-taskify-lightElement text-taskify-lightBlue dark:bg-taskify-lightBlue dark:text-taskify-lightDarkElement m-2 p-3 rounded-2xl min-h-16 shadow">
        <div className="taskData">
          <h1 className="text-sm mb-1">{title}</h1>
          <p className="text-xs">{description}</p>
        </div>
        <div className="taskSettings">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
            />
          </svg>
        </div>
      </div>
    </>
  );
};
