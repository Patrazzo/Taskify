import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Form = ({ type }) => {
  const isLogin = type === "login";
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:2608/register", values);
      if (res.data.Status === "Success") {
        navigate("/login");
      } else {
        setErrorMessage(res.data.Error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:2608/login", values);
      if (res.data.Status === "Success") {
        navigate("/dashboard");
      } else {
        setErrorMessage(res.data.Error);
      }
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <div className="flex w-full h-[95vh] phone:h-auto dark:bg-taskify-DarkBlue bg-taskify-lightBackground">
      <div
        className={`flex w-full h-full ${
          isLogin ? "flex-row" : "flex-row-reverse"
        } phone:flex-col-reverse`}
      >
        <div
          className={`w-1/3 phone:w-full h-full phone:hidden bg-[#20e3b2] flex justify-center items-center flex-col  ${
            isLogin
              ? "rounded-tr-2xl rounded-br-3xl"
              : "rounded-tl-2xl rounded-bl-3xl"
          } `}
        >
          <img src="/assets/todolist.png" alt="Logo" />
        </div>
        <div className="w-2/3 phone:w-full h-full phone:h-screen phone:justify-start phone:pt-10 dark:bg-taskify-DarkBlue bg-taskify-lightBackground flex items-center justify-center flex-col">
          <form
            className="flex flex-col justify-center items-center rounded-2xl w-7/12 h-3/5 smallphone:w-10/12 phone:m-20"
            onSubmit={isLogin ? handleLogin : handleRegister}
          >
            <h1 className="m-5 text-taskify-Green font-black text-3xl text-center">
              {isLogin ? "ВЛИЗАНЕ" : "РЕГИСТРАЦИЯ"}
            </h1>
            {errorMessage ? <p className="text-xs text-[#FF576F]">{errorMessage}</p> : null}
            <input
              className="drop-shadow rounded-2xl m-2 smallphone:w-11/12 dark:text-taskify-lightElement text-taskify-textLightDarkColor dark:bg-taskify-lightBlue"
              type="text"
              placeholder="Потребител"
              name="username"
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
            />
            <input
              className="drop-shadow rounded-2xl m-2 smallphone:w-11/12 dark:text-taskify-lightElement text-taskify-textLightDarkColor dark:bg-taskify-lightBlue"
              type="password"
              placeholder="Парола"
              name="password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
            {isLogin ? (
              <Link to="/register">
                <h3 className="m-3 text-gray-400">
                  Нямате акаунт? Регистрирайте се.
                </h3>
              </Link>
            ) : (
              <Link to="/login">
                <h3 className="m-3 text-gray-400">Имате акаунт? Влезте.</h3>
              </Link>
            )}
            <button
              type="submit"
              className="drop-shadow-md w-40 m-2 h-10 rounded-2xl text-base bg-gradient-to-r dark:from-[#8e44ad] dark:via-[#D76D77] dark:to-[#c0392b] from-[#f2709c]  to-[#ff9472] text-taskify-lightElement dark:text-taskify-lightBlue"
            >
              {isLogin ? "ВЛЕЗ" : "РЕГИСТРАЦИЯ"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
