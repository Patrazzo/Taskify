import React from "react";
import Header from "../../components/Navbar/Header/header";
import { Panel } from "../../components/Panel/panel";
import { Footer } from "../../components/Navbar/Footer/footer";
export const Dashboard = () => {
  return (
    <div className="screen">
      <Header />
      <div className="app">
        
        <Panel />
      </div>
      <Footer></Footer>
    </div>
  );
};
