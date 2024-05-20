import React from "react";
import { Link } from "react-router-dom";

export const Button = ({ setButtonPopup, redirect, pathToLocation, name, passFun }) => {
  if (redirect) {
    return (
      <Link to={pathToLocation}>
        <button
          onClick={passFun}
          className={`drop-shadow-md w-40 smallphone:w-32 h-10 rounded-2xl text-base 
          bg-gradient-to-r dark:from-[#8e44ad] dark:via-[#D76D77] dark:to-[#c0392b] from-[#f2709c]  to-[#ff9472] 
          text-taskify-lightElement dark:text-taskify-lightBlue`}
        >
          {name}
        </button>
      </Link>
    );
  } else {
    return (
      <button
        className="flex drop-shadow justify-center items-center 
        bg-taskify-lightDarkElement text-taskify-textLightDarkColor dark:bg-taskify-lightBlue dark:text-taskify-lightElement 
        rounded-3xl cursor-pointer select-none m-0 mb-7 w-48 h-12"
        onClick={() => setButtonPopup(true)}
      >
        {name}
      </button>
    );
  }
};
