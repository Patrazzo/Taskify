import React, { useEffect, useState } from "react";
import { Button } from "../Button/button";

export const Fade = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const [videoSource, setVideoSource] = useState(
    theme === "dark" ? "darkTut.mp4" : "lightTut.mp4"
  );

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme !== theme) {
      setTheme(storedTheme);
    }
  }, [theme]);

  useEffect(() => {
    setVideoSource(theme === "dark" ? "darkTut.mp4" : "lightTut.mp4");
  }, [theme]);

  return (
    <div>
      <div className="w-full h-[800px] bg-gradient-to-b flex flex-col justify-center items-center 
      dark:from-[#06beb6] dark:via-[#0b5457] dark:to-taskify-DarkBlue from-[#20e3b2] to-taskify-lightBackground">
        <div className="w-3/5 phone:w-11/12 drop-shadow rounded-lg flex flex-col justify-center items-center p-5 pb-0 mb-5 
        bg-gradient-to-r dark:from-[#8e44ad] dark:via-[#D76D77] dark:to-[#c0392b] from-[#f2709c] to-[#ff9472] ">
          <video src={`/assets/${videoSource}`} autoPlay loop className="rounded-lg" />
          <h1 className="text-taskify-lightBlue">демонстрация</h1>
        </div>
        
        <Button redirect={true} name={"ИЗПРОБВАЙ"} pathToLocation={"/dashboard"} gradient={true} />
      </div>
    </div>
  );
};
