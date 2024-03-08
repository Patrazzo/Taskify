import React, { useState } from "react";
import Header from "../components/Navbar/header.jsx";
import { TaskifyPanel } from "../components/Panels/taskifyPanel.jsx";
import { Footer } from "../components/Navbar/footer.jsx";
import { Sidebar } from "../components/Navbar/sidebar.jsx";

export const Dashboard = () => {
  const [buttonPopup, setButtonPopup] = useState(false);

  return (
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
};
