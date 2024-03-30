import React, { useEffect, useState } from "react";
import Header from "../components/Navbar/header.jsx";
import { TaskifyPanel } from "../components/Panels/taskifyPanel.jsx";
import { Footer } from "../components/Navbar/footer.jsx";
import { Sidebar } from "../components/Navbar/sidebar.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
export const Dashboard = () => {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");
  const [buttonPopup, setButtonPopup] = useState(false);
  const nav = useNavigate();
  const [selectedList, setSelectedList] = useState(
    Cookies.get("selectedList") || "1"
  );

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
    <div>
      {auth ? (
        <div className="">
          <Header />
          <div className="flex flex-row justify-center h-auto min-h-screen phone:h-auto dark:bg-taskify-DarkBlue bg-taskify-lightBackground">
            {buttonPopup ? (
              " "
            ) : (
              <Sidebar user={userId} setSelectedList={setSelectedList} />
            )}
            <TaskifyPanel
              buttonPopup={buttonPopup}
              setButtonPopup={setButtonPopup}
              selectedList={selectedList}
            />
          </div>
          <Footer></Footer>
        </div>
      ) : (
        nav("/login")
      )}
    </div>
  );
};
