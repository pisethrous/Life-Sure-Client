import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../../Components/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
    
      <div className="flex-grow">
        <Outlet />
      </div>
      
      <Footer />
    </div>
  );
};

export default RootLayout;
