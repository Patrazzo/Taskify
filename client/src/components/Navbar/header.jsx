import React from "react";
import "flowbite";
import { Link } from "react-router-dom";
import { Button } from "../Button/button";

const Header = () => {
  return (
    <>
      <div className="drop-shadow-lg m-0 w-full h-16 flex flex-row	justify-between items-center p-8 smallphone:p-2 taskify-lightElement dark:bg-taskify-lightBlue">
        <Link to="/home">
          <div className="flex flex-row items-center gap-2">
            <img src="/assets/logo.svg" alt="Logo" height={30} width={30} />
            <h1 className="text-2xl dark:text-white text-taskify-lightBlue">
              Taskify
            </h1>
          </div>
        </Link>
        <Button
          redirect={true}
          pathToLocation={"/login"}
          name={"ВЛЕЗ"}
          color={"taskify-Green"}
          darkcolor={"taskify-Green"}
          
        />
      </div>
    </>
  );
};

export default Header;
