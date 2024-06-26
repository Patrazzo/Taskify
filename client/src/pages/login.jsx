import React from "react";
import Form from "../components/Login/form.jsx";
import Header from "../components/Navbar/header.jsx";
import { Footer } from "../components/Navbar/footer.jsx";
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
