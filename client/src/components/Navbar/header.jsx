import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "../Button/button";

const Header = () => {
  const [auth, setAuth] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [lastVisitedPage, setLastVisitedPage] = useState("/"); // Initialize with default root path
  const [role, setRole] = useState("");
  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "selectedList=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    {
      auth ? (window.location.href = lastVisitedPage) : null;
    }
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
          setUserId(response.data.userid);
          setRole(response.data.role);
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
  }, [auth]);
  
  useEffect(() => {
    setLastVisitedPage(window.location.pathname);
  }, [window.location.pathname]);

  return (
    <div className="drop-shadow m-0 w-full h-16 flex flex-row justify-between items-center p-8 smallphone:p-2 
    bg-taskify-lightElement dark:bg-taskify-lightBlue">
      <Link to="/home" className="flex flex-row items-center gap-2">
        <img src="/assets/logo.svg" alt="Logo" height={30} width={30} />
        <h1 className="text-2xl dark:text-white text-taskify-lightBlue">
          Taskify
        </h1>
      </Link>

      {role === "su" ? (
        <div className="flex gap-2">
          <Button
            redirect={true}
            pathToLocation={"/administrator"}
            passFun={null}
            name={"АДМИН"}
          />
          <Button
            redirect={true}
            pathToLocation={auth ? null : "/login"}
            passFun={handleLogout}
            name={auth ? "ИЗЛИЗАНЕ" : "ВЛИЗАНЕ"}
          />
        </div>
      ) : (
        <Button
          redirect={true}
          pathToLocation={auth ? null : "/login"}
          passFun={handleLogout}
          name={auth ? "ИЗЛИЗАНЕ" : "ВЛИЗАНЕ"}
        />
      )}
    </div>
  );
};

export default Header;
