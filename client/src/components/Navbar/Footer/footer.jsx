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
