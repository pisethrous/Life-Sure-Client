import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router";
import Footer from "../../Components/Footer/Footer";

const RootLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <div className="">
      <Navbar transparent={isHome} />
      
    
      <div className="min-h-screen">
        <Outlet />
      </div>
      
      <Footer />
    </div>
  );
};

export default RootLayout;
