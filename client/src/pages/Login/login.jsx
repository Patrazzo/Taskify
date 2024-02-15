import React from "react";
import Login from "../../components/Login/form";
import Header from "../../components/Navbar/Header/header";
const LoginPage = () => {
  
  return (
    <>
      <div className="w-full h-auto">
        <Header></Header>
        <Login></Login>
      </div>
    </>
  );
};

export default LoginPage;
