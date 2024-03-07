import React from "react";
import Header from "../components/Navbar/Header/header";
import Form from "../components/Login/form";
import { Footer } from "../components/Navbar/Footer/footer";
export const RegisterPage = () => {
  return (
    <div className="w-full h-auto">
      <Header></Header>
      <Form type={"register"} />
      <Footer></Footer>
    </div>
  );
};
