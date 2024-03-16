import React from "react";
import { Button } from "../Button/button";
export const SingleDiv = ({ heading, text }) => {
  return (
    <div
      className="m-5 w-full h-72 dark:bg-taskify-lightBlue bg-taskify-lightElement rounded-3xl
    flex flex-col justify-evenly items-center"
    >
      <div className="text-3xl text-taskify-Green">{heading}</div>
      <div className="dark:text-taskify-lightElement text-taskify-lightBlue text-lg">
        {text}
      </div>
      <Button
        redirect={true}
        pathToLocation={"/dashboard"}
        name={"ИЗПРОБВАЙ"}
        color={"taskify-Green"}
        darkcolor={"taskify-Green"}
      />
    </div>
  );
};
