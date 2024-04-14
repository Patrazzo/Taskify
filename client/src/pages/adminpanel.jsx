import React from "react";
import Header from "../components/Navbar/header.jsx";
import {Footer} from "../components/Navbar/footer.jsx";
import { TaskifyAdminPanel } from "../components/Panels/taskifyAdminPanel.jsx";

export const AdminPanel = () => {
  return (
    <div>
      <Header></Header>
      <TaskifyAdminPanel></TaskifyAdminPanel>
      <Footer></Footer>
    </div>
  );
};
