import React, {useState} from "react";
import { Link } from "react-router-dom";

const Form = ({ type }) => {
  const isLogin = type === "login";
  

  return (
    <div className="w-full h-90vh flex flex-col items-center justify-center bg-taskify-lightBackground dark:bg-taskify-DarkBlue">
      <div className=" w-80 h-96 smallphone:w-64 rounded-2xl flex flex-col items-center p-5 bg-taskify-lightElement dark:bg-taskify-lightBlue shadow-2xl">
        <h1 className="m-8 text-taskify-Green font-black text-2xl">
          {isLogin ? "ВЛИЗАНЕ" : "РЕГИСТРАЦИЯ"}
        </h1>
        <form className="flex flex-col items-center">
          <input
            type="text"
            className="w-64 smallphone:w-52 h-5 m-3 rounded-lg 
        bg-taskify-lightBackground dark:bg-taskify-DarkBlue shadow-lg text-taskify-Green p-5 border-0 text-lg font-semibold placeholder-gray-400"
            placeholder="Потребител"
          />
          <input
            type="password"
            className="w-64 smallphone:w-52 h-5 m-3 rounded-lg bg-taskify-lightBackground shadow-lg border-0 dark:bg-taskify-DarkBlue 
          border-spacing-0 outline-none text-taskify-Green p-5 text-lg font-semibold placeholder-gray-400"
            placeholder="Парола"
          />
          {isLogin ? (
            <Link to="/register">
              <h3 className="m-3 text-gray-400">регистрация</h3>
            </Link>
          ) : (
            <Link to="/login">
              <h3 className="m-3 text-gray-400">влезте</h3>
            </Link>
          )}
          <input
            type="submit"
            id="submit"
            value={isLogin ? "ВЛЕЗ" : "РЕГИСТРАЦИЯ"}
            className="mt-5 p-0 h-10 w-36 hover:bg-taskify-Green hover:text-taskify-lightBackground dark:hover:bg-taskify-Green dark:bg-taskify-DarkBlue bg-taskify-lightBackground 
          rounded-2xl text-sm text-taskify-Green shadow-lg dark:hover:text-taskify-DarkBlue"
          />
        </form>
      </div>
    </div>
  );
};

export default Form;
