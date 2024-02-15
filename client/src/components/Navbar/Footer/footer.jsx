import React from "react";
import "../CSS/navbar.css";
import { useState, useEffect } from "react";
export const Footer = () => {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const switchTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    console.log(theme);
  };
  return (
    <div className="flex flex-col justify-center items-center w-full phone:gap-10 h-auto px-20 pt-7 pb-2 dark:bg-taskify-lightBlue taskify-lightElement">
      <div className="w-full pb-28 phone:pb-0 flex flex-row phone:flex-col gap-10 items-center justify-between">
        <div className="flex flex-row items-center justify-center">
          <img src="assets/logo.svg" alt="Logo" width={75} className="mr-3" />
          <h1 className="text-4xl text-taskify-lightBlue dark:text-taskify-lightBackground">
            Taskify
          </h1>
          <button
            onClick={switchTheme}
            className="w-10 h-10 m-3 rounded-2xl text-base taskify-Green taskify-DarkBlue-text flex justify-center items-center"
          >
            {theme === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#17223b"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#f7f7f2"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            )}
          </button>
        </div>
        <div className="flex flex-row gap-4">
          <a href="https://facebook.com">
            <img
              src="assets/facebookLogo.png"
              alt="Image 1"
              width={35}
              height={35}
            />
          </a>
          <a href="https://x.com">
            <img src="assets/xLogo.png" alt="Image 2" width={35} height={35} />
          </a>
          <a href="https://instagram.com">
            <img
              src="assets/instagramLogo.png"
              alt="Image 3"
              width={35}
              height={35}
            />
          </a>
        </div>
      </div>
      <div className="text-xs text-center dark:text-taskify-lightBackground taskify-DarkBlue-text">
        <p>Copyright © 2023 Taskify | Всички права запазени</p>
      </div>
    </div>
  );
};
