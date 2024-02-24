import React from "react";

export const Button = ({ setButtonPopup }) => {

  return (
    <button
      className="flex justify-center items-center dark:text-taskify-lightElement text-taskify-textLightDarkColor text-m rounded-3xl cursor-pointer select-none bg-taskify-lightDarkElement dark:bg-taskify-lightBlue m-0 mb-7 w-[200px] h-12"
      onClick={() => setButtonPopup(true)}
    >
      <h1>ADD NEW TASK</h1>
    </button>
  );
};
