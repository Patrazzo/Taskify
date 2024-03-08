import React from "react";

export const Button = ({ setButtonPopup }) => {
  return (
    <button
      className="flex justify-center items-center 
       bg-taskify-lightDarkElement text-taskify-textLightDarkColor 
       dark:bg-taskify-lightBlue   dark:text-taskify-lightElement
         rounded-3xl cursor-pointer select-none m-0 mb-7 w-48 h-12"
      onClick={() => setButtonPopup(true)}
    >
      <h1>ADD NEW TASK</h1>
    </button>
  );
};
