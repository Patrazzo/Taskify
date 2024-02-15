import React from "react";
import "flowbite";
import { Link } from "react-router-dom";
import "../CSS/navbar.css";

const Header = () => {
  return (
    <>
      <div className="m-0 w-full h-16 flex flex-row	justify-between items-center p-8  smallphone:p-2 taskify-lightElement dark:bg-taskify-lightBlue">
        <Link to="/home">
          <div className="flex flex-row items-center gap-2">
            <img src="/assets/logo.svg" alt="Logo" height={30} width={30} />
            <h1 className="text-2xl dark:text-white text-taskify-lightBlue">
              Taskify
            </h1>
          </div>
        </Link>

        <Link to="/login">
          <button className="w-40 smallphone:w-32 h-10 rounded-2xl text-base bg-taskify-Green dark:text-taskify-DarkBlue text-taskify-lightElement">
            ВЛЕЗ
          </button>
        </Link>
      </div>
    </>
  );
};

export default Header;
