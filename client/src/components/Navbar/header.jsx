import React, { useState, useEffect } from "react";
import "flowbite";
import { Link } from "react-router-dom";
import { Button } from "../Button/button";
import axios from "axios";
const Header = () => {
  const [auth, setAuth] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const handleLogout = () => {
    axios
      .get("http://localhost:2608/logout")
      .then((res) => {
        location.reload(true);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:2608/validate", {
          withCredentials: true,
        });

        if (response.data.Status === "Success") {
          setAuth(true);
          setName(response.data.username);
          console.log("Received User ID from Server:", response.data.userid); // Add this line for debugging
          setUserId(response.data.userid);
        } else {
          setAuth(false);
          setError(response.data.Error);
        }
      } catch (error) {
        setError("An error occurred while fetching data.");
        console.error(error);
      }
    };

    fetchData();
  }, []);
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
          pathToLocation={auth ? null : "/login"}
          passFun={handleLogout}
          name={`${auth ? "LOGOUT" : "LOGIN"}`}
          color={"taskify-Green"}
          darkcolor={"taskify-Green"}
        />
      </div>
    </>
  );
};

export default Header;
