import React from "react";
import { Button } from "../Button/button";
export const Card = ({
  color,
  darkColor,
  pathToIcon,
  heading,
  description,
  buttonText,
}) => {
  return (
    <div
      className={`m-5 rounded-3xl flex flex-col justify-evenly items-center
      w-1/2 h-80 phone:w-11/12 bg-${color} dark:bg-${darkColor} drop-shadow-xl `}
    >
      <div>{pathToIcon}</div>
      <div className="text-xl bg-gradient-to-r from-[#8e44ad] via-[#D76D77] to-[#c0392b] text-transparent bg-clip-text">
        {heading}
      </div>
      <div className="px-10 text-center dark:text-taskify-lightBackground text-taskify-textLightDarkColor">{description}</div>
      <Button
        redirect={true}
        pathToLocation={"/dashboard"}
        name={`${buttonText}`}
        color={"taskify-Green"}
        darkcolor={"taskify-Green"}
        gradient={true}
      />
    </div>
  );
};
