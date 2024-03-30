import React, { useState } from "react";
import axios from "axios";
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
    <div className="flex w-full h-screen phone:h-auto dark:bg-taskify-DarkBlue bg-taskify-lightBackground">
      <div className="flex w-full h-full flex-row phone:flex-col-reverse">
        <div className="w-1/2 phone:w-full h-full bg-taskify-Green">
          <h1>IMAGE</h1>
        </div>
        <div className="w-1/2 phone:w-full h-full bg-taskify-lightGreenBackground">
          <h1 className="m-8 text-taskify-Green font-black text-2xl">
            {isLogin ? "ВЛИЗАНЕ" : "РЕГИСТРАЦИЯ"}
          </h1>
          <form
            className="flex flex-col items-center bg-taskify-lightBlue"
            onSubmit={isLogin ? handleLogin : handleRegister}
          >
            <input
              type="text"
              placeholder="username"
              name="username"
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
            <button type="submit">Test</button>
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
