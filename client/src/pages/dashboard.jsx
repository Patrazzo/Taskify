import React, { useEffect, useState } from "react";
import Header from "../components/Navbar/header.jsx";
import { TaskifyPanel } from "../components/Panels/taskifyPanel.jsx";
import { Footer } from "../components/Navbar/footer.jsx";
import { Sidebar } from "../components/Navbar/sidebar.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
export const Dashboard = () => {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");

  const handleLogout = () => {
    axios.get('http://localhost:2608/logout').then(res => {
      location.reload(true);
    }).catch(err => console.log(err))
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
  }, []); // Empty dependency array to run effect only once

  return (
    <div>
      {auth ? (
        <div>
          <h3>
            You are authorized - {name} - ID - {userId}
          </h3>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h3>Login</h3>
          <Link to="/login">Login</Link>
          {error && <p>{error}</p>}
        </div>
      )}
    </div>
  );
};

/* return (
    <div className="">
      <Header />
      <div className="flex flex-row justify-center h-auto min-h-screen phone:h-auto dark:bg-taskify-DarkBlue bg-taskify-lightBackground">
        {buttonPopup ? " " : <Sidebar />}
        <TaskifyPanel
          buttonPopup={buttonPopup}
          setButtonPopup={setButtonPopup}
        />
      </div>
      <Footer></Footer>
    </div>
  );
}; */
