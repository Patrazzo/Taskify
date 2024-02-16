import React from "react";
import Form from "../../components/Login/form";
import Header from "../../components/Navbar/Header/header";
import { Footer } from "../../components/Navbar/Footer/footer";
const LoginPage = () => {
  return (
    <>
      <div className="w-full h-auto">
        <Header></Header>
        <Form type={"login"} />
        <Footer></Footer>
      </div>
    </>
  );
};

export default LoginPage;
