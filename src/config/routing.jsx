import React from "react";
import { Route, Routes } from "react-router-dom";
import Detail from "../pages/detail/detail";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route
        path="*"
        element={
          <div className="w-screen h-screen flex flex-col items-center justify-center gap-8">
            <h1 className="font-mochiy text-6xl text-slate-700">404</h1>
            <p className="font-poppins text-xl">Page not found</p>
          </div>
        }
      />
    </Routes>
  );
};

export default Routing;
