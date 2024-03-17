import React from "react";

export const Bar = ({ heading, percentage }) => {
  return (
    <div className="flex flex-col justify-center items-center bg-[#20e3b2] dark:bg-[#06beb6] pb-10">
      <div className="mb-1 text-lg font-medium text-taskify-lightElement drop-shadow">
        {heading}
      </div>
      <div className="w-5/6 bg-gray-200 rounded-full h-3 mb-4 dark:bg-gray-700">
        <div
          className={`bg-gradient-to-r dark:from-[#8e44ad] dark:via-[#D76D77] dark:to-[#c0392b] from-[#f2709c]  to-[#ff9472] h-3 rounded-full w-${percentage} drop-shadow`}
        ></div>
      </div>
    </div>
  );
};
