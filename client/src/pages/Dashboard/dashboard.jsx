import React from "react";
import Header from "../../components/Navbar/Header/header";
import { Panel } from "../../components/Panel/panel";
import { Footer } from "../../components/Navbar/Footer/footer";
import { Sidebar } from "../../components/Navbar/Sidebar/sidebar";
export const Dashboard = () => {
  return (
    <div className="">
      <Header />
      <div className="flex flex-row justify-center h-auto min-h-screen phone:h-auto dark:bg-taskify-DarkBlue bg-taskify-lightBackground">
        <Sidebar />
        <Panel />
      </div>
      <Footer></Footer>
    </div>
  );
};
