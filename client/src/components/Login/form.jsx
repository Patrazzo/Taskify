import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom"; // Import Navigate
import axios from "axios";

const Form = ({ type }) => {
  const isLogin = type === "login";

  return (
    <div className="w-full h-90vh flex flex-col items-center justify-center bg-taskify-lightBackground dark:bg-taskify-DarkBlue">
      <div className="w-80 h-96 smallphone:w-64 rounded-2xl flex flex-col items-center p-5 bg-taskify-lightElement dark:bg-taskify-lightBlue shadow-2xl">
        <h1 className="m-8 text-taskify-Green font-black text-2xl">
          {isLogin ? "ВЛИЗАНЕ" : "РЕГИСТРАЦИЯ"}
        </h1>
        <form className="flex flex-col items-center"></form>
      </div>
    </div>
  );
};

export default Form;
