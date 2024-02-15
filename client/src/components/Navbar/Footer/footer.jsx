import React from "react";
import "../CSS/navbar.css";
export const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full phone:gap-10 h-auto px-20 pt-7 pb-2 taskify-lightBlue">
      <div className="w-full flex flex-row phone:flex-col phone:gap-10 items-center justify-between">
        <div className="flex flex-row items-center justify-center">
          <img src="assets/logo.svg" alt="Logo" width={100} />
          <h1 className="text-4xl taskify-White-text">Taskify</h1>
        </div>
        <button className="w-10 h-10 rounded-2xl text-base taskify-Green taskify-DarkBlue-text flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
        </button>
        <div className="flex flex-row gap-4">
          <img
            src="assets/facebookLogo.png"
            alt="Image 1"
            width={35}
            height={35}
          />
          <img src="assets/xLogo.png" alt="Image 2" width={35} height={35} />
          <img
            src="assets/instagramLogo.png"
            alt="Image 3"
            width={35}
            height={35}
          />
        </div>
      </div>
      <div className="text-xs text-center taskify-White-text">
        <p>Copyright © 2023 Taskify | Всички права запазени</p>
      </div>
    </div>
  );
};
