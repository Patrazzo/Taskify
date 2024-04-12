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
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleRegister = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:2608/register", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/login");
        } else {
          alert("Error");
        }
      })
      .then((err) => console.log(err));
  };
  const handleLogin = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:2608/login", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/dashboard");
        } else {
          alert(res.data.Error);
        }
      })
      .then((err) => console.log(err));
  };
  return (
    <div className="flex w-full h-[95vh] phone:h-auto dark:bg-taskify-DarkBlue bg-taskify-lightBackground">
      <div className={`flex w-full h-full ${isLogin ? "flex-row" : "flex-row-reverse"} phone:flex-col-reverse`}>
        <div className={`w-1/3 phone:w-full h-full phone:hidden bg-[#20e3b2] flex justify-center items-center flex-col  ${isLogin ? "rounded-tr-2xl rounded-br-3xl" : "rounded-tl-2xl rounded-bl-3xl"} `}>
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
            <input
              className="drop-shadow rounded-2xl m-2 smallphone:w-11/12 dark:text-taskify-lightElement text-taskify-DarkBlue dark:bg-taskify-lightBlue"
              type="text"
              placeholder="Потребител"
              name="username"
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
            />
            <input
              className="drop-shadow rounded-2xl m-2 smallphone:w-11/12 dark:text-taskify-lightElement text-taskify-DarkBlue dark:bg-taskify-lightBlue"
              type="password"
              placeholder="Парола"
              name="password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
            {isLogin ? (
            <Link to="/register">
              <h3 className="m-3 text-gray-400">Нямате акаунт? Регистрирайте се.</h3>
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

/*<div className="w-full h-90vh flex flex-col items-center justify-center bg-taskify-lightBackground dark:bg-taskify-DarkBlue">
      <div className="w-80 h-96 smallphone:w-64 rounded-2xl flex flex-col items-center p-5 bg-taskify-lightElement dark:bg-taskify-lightBlue shadow-2xl">
        <h1 className="m-8 text-taskify-Green font-black text-2xl">
          {isLogin ? "ВЛИЗАНЕ" : "РЕГИСТРАЦИЯ"}
        </h1>
        <form
          className="flex flex-col items-center"
          onSubmit={isLogin ? handleLogin : handleRegister}
        >
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={(e) => setValues({ ...values, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
          <button type="submit">Test</button>
        </form>
      </div>
    </div>*/
