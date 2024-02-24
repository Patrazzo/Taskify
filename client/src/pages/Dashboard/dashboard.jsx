import React from "react";
import Header from "../../components/Navbar/Header/header";
import { Footer } from "../../components/Navbar/Footer/footer";
import { Panel } from "../../components/Panel/panel.jsx";
import { TestSidebar } from "../../components/Navbar/Sidebar/testSidebar.jsx";
export const Dashboard = () => {
  return (
    <div className="flex">
      <div className="flex flex-col flex-1">
        <Header />
        <div className="flex flex-row justify-between items-center h-auto min-h-screen">
          <TestSidebar />
          <Panel></Panel>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
};
