import React from "react";
import Header from "../components/Navbar/header";
import Form from "../components/Login/form";
import { Footer } from "../components/Navbar/footer";
export const RegisterPage = () => {
  return (
    <div className="w-full h-auto">
      <Header></Header>
      <Form type={"register"} />
      <Footer></Footer>
    </div>
  );
};
