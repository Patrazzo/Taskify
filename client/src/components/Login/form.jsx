import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom"; // Import Navigate
import axios from "axios";

const Form = ({ type }) => {
  const isLogin = type === "login";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false); // Track login status

  useEffect(() => {
    console.log("Logged in:", loggedIn); // Log login status after state update
  }, [loggedIn]);

  function handleSubmit(e) {
    e.preventDefault();

    if (isLogin) {
      axios
        .post("http://localhost:2608/login", { username, password })
        .then((res) => {
          console.log(res.data); // Assuming the response contains user ID
          setUserId(res.data.id); // Set the user ID in state
          setUsername(""); // Clear username field
          setPassword(""); // Clear password field
          setLoggedIn(true); // Set login status to true
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://localhost:2608/register", { username, password })
        .then((res) => {
          console.log(res);
          setUsername(""); // Clear username field
          setPassword(""); // Clear password field
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className="w-full h-90vh flex flex-col items-center justify-center bg-taskify-lightBackground dark:bg-taskify-DarkBlue">
      <div className="w-80 h-96 smallphone:w-64 rounded-2xl flex flex-col items-center p-5 bg-taskify-lightElement dark:bg-taskify-lightBlue shadow-2xl">
        <h1 className="m-8 text-taskify-Green font-black text-2xl">
          {isLogin ? "ВЛИЗАНЕ" : "РЕГИСТРАЦИЯ"}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="text"
            className="w-64 smallphone:w-52 h-5 m-3 rounded-lg bg-taskify-lightBackground dark:bg-taskify-DarkBlue shadow-lg text-taskify-Green p-5 border-0 text-lg font-semibold placeholder-gray-400"
            placeholder="Потребител"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="w-64 smallphone:w-52 h-5 m-3 rounded-lg bg-taskify-lightBackground shadow-lg border-0 dark:bg-taskify-DarkBlue border-spacing-0 outline-none text-taskify-Green p-5 text-lg font-semibold placeholder-gray-400"
            placeholder="Парола"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            className="mt-5 p-0 h-10 w-36 hover:bg-taskify-Green hover:text-taskify-lightBackground dark:hover:bg-taskify-Green dark:bg-taskify-DarkBlue bg-taskify-lightBackground rounded-2xl text-sm text-taskify-Green shadow-lg dark:hover:text-taskify-DarkBlue"
          />
        </form>
      </div>
      {loggedIn && <Navigate to="/dashboard" />} {/* Redirect if logged in */}
      {isLogin && userId && <p>Потребител с ID: {userId}</p>}
    </div>
  );
};

export default Form;
