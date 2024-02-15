import React from "react";
import { Link } from "react-router-dom";

export const Welcome = () => {
  return (
    <div className="flex flex-row phone:flex-col items-center justify-between h-screen phone:h-auto phone:pt-10 w-full dark:bg-taskify-DarkBlue taskify-lightBackground">
      <div className="w-2/4 phone:w-full flex justify-center items-center gap-10 flex-col p-5 taskify-White-text">
        <h1 className="text-5xl smallphone:text-3xl dark:text-taskify-lightElement taskify-lightBlue-text text-center">
          <span className="taskify-Green-text">Taskify</span>...Вашите задачи
          <br />
          под Вашия контрол.
        </h1>
        <Link to="/dashboard">
          <button className="w-40 h-10 rounded-2xl text-base taskify-Green dark:text-taskify-DarkBlue taskify-White-text">
            ИЗПРОБВАЙ
          </button>
        </Link>
      </div>
      <div className="w-2/4 phone:w-full flex taskify-White-text justify-center items-center">
        <img src="/assets/todolist.png" alt="Logo" />
      </div>
    </div>
  );
};
