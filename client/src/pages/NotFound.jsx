import React from "react";
import Header from "../components/Navbar/header.jsx";
import { Footer } from "../components/Navbar/footer.jsx";
import { Link } from "react-router-dom";
import { Button } from "../components/Button/button.jsx";
const NotFoundPage = () => {
  return (
    <div>
      <Header></Header>
      <div
        className="flex flex-col w-full h-screen phone:h-auto p-10 phone:p-0
        justify-center items-center
       dark:bg-taskify-DarkBlue bg-taskify-lightBackground"
      >
        <div
          className="flex flex-row phone:flex-col gap-5 w-full h-5/6 p-5
          dark:bg-taskify-DarkBlue bg-taskify-lightBackground"
        >
          <div
            className="flex flex-col justify-center items-start w-1/2 phone:w-full h-full p-5 gap-10
          bg-taskify-lightBackground dark:bg-taskify-DarkBlue "
          >
            <h3 className="text-9xl bg-gradient-to-r from-[#C1121F] inline-block text-transparent bg-clip-text">
              Error 404
            </h3>
            <h1
              className="text-4xl bg-gradient-to-r dark:from-taskify-lightElement from-taskify-lightBlue  inline-block text-transparent bg-clip-text mb-10 w-5/6
            "
            >
              Ммм...изглежда, че тази страница е в todo и все още не е готова!
            </h1>

            <Button
              redirect={true}
              pathToLocation={"/home"}
              name={"НАЧАЛО"}
              gradient={false}
              color={"[#C1121F]"}
              darkcolor={"[#FF576F]"}
            />
          </div>
          <div className="dark:bg-taskify-DarkBlue bg-taskify-lightBackground w-1/2 phone:w-full h-full"></div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default NotFoundPage;
