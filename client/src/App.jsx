import "./App.css";
import React from "react";
import LoginPage from "./pages/login.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Dashboard } from "./pages/dashboard.jsx";
import Home from "./pages/home.jsx";
import { RegisterPage } from "./pages/register.jsx";
import NotFoundPage from "./pages/NotFound.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
