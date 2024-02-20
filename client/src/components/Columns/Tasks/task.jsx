import React from "react";

export const Task = ({ id, title, description }) => {
  const handleDragStart = (event) => {
    event.dataTransfer.setData("text/plain", id);
    event.target.style.opacity = "0.9";
  };

  const handleDragEnd = (event) => {
    event.target.style.opacity = "1";
  };

  return (
    <div
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="flex flex-row justify-between items-center bg-taskify-lightElement text-taskify-textLightDarkColor dark:bg-taskify-lightBlue dark:text-taskify-lightDarkElement m-2 p-3 rounded-2xl h-14 shadow"
    >
      <div className="taskData">
        <h1 className="text-md mb-1">{title}</h1>
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
  );
};
