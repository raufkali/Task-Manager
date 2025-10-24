import React from "react";
import Home from "./pages/Home"; // Create these components/pages as needed
import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import Nav from "./pages/Nav";
import TaskPage from "./pages/TaskPage";
import "./App.css";
import UpdatedTask from "./pages/UpdatedTask";
import Register from "./pages/Register";
import Current from "./pages/Current";
import Users from "./pages/Users";
const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/update/:id" element={<UpdatedTask />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Current" element={<Current />} />
        <Route path="/Users" element={<Users />} />
      </Routes>
    </>
  );
};

export default App;
