import React from "react";
import "./CSS/button.css";

export const Button = ({ setButtonPopup }) => {
{ /*const handleClick = () => {}; */ }

  return (
    <button className="flex justify-center items-center text-gray-400 text-m rounded-full cursor-pointer select-none custom-settings" onClick={() => setButtonPopup(true)}>
      <h1>ADD NEW TASK</h1>
    </button>
  );
};
