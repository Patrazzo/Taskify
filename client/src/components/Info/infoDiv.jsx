import React from "react";
export const InfoDiv = ({ direction, color, darkcolor, children, radius }) => {
  return (
    <div
      className={`w-full dark:bg-${darkcolor} bg-${color} flex justify-${direction} pb-20`}
    >
      <div
        className={`w-5/6 max-w-[1000px] flex bg-gradient-to-r 
        dark:from-[#8e44ad] dark:via-[#D76D77] dark:to-[#c0392b] from-[#f2709c] to-[#ff9472] 
        drop-shadow rounded${radius}-3xl flex-row phone:flex-col justify-evenly items-center`}
      >
        {children}
      </div>
    </div>
  );
};
