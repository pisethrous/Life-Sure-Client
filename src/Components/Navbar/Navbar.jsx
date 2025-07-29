import React, { useState } from "react";
import { NavLink } from "react-router"; 
import Logo from "../Logo/Logo";
import useAuthContext from "../../Hooks/useAuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };
  
  const [isClicked, setIsClicked] = useState(false);
  const { user, logoutUser } = useAuthContext();

  // 🧩 Reusable Navigation Links
  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/allPolicies">All Policies</NavLink></li>
      <li><NavLink to="/faqs">FAQS</NavLink></li>
      <li><NavLink to="/blogs">Blogs</NavLink></li>
      <li><NavLink to="/beAgent">Be a Agent</NavLink></li>
      <li><NavLink to="/dashboard">Dashboard</NavLink></li>
    </>
  );

  // 🧩 Reusable Auth Buttons for Desktop
  const desktopAuthButtons = user ? (
    <div className="flex flex-col items-center justify-center relative">
      <div onClick={() => setIsClicked(!isClicked)} className="flex space-x-5 cursor-pointer">
        <img 
          alt="User Avatar" 
          className="w-12 h-12 rounded-full ring-2 ring-offset-2 ring-secondary" 
          src={user?.photoURL} 
        />
      </div>
      
      <AnimatePresence>
        {isClicked && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsClicked(false)}
            ></div>
            
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dropdownVariants}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-16 right-0 rounded-md shadow-lg bg-white border z-20 min-w-48"
            >
              <div className="p-4">
                <h1 className="text-black mb-2 text-sm">{user?.email}</h1>
                <button 
                  onClick={() => {
                    logoutUser();
                    setIsClicked(false);
                  }} 
                  className="btn btn-secondary btn-sm text-white w-full"
                >
                  Log Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  ) : (
    <>
      <li>
        <NavLink to="/auth/login">
          <button className="px-4 py-2 text-white bg-secondary rounded">Sign In</button>
        </NavLink>
      </li>
      <li>
        <NavLink to="/auth/register">
          <button className="px-4 py-2 text-white bg-secondary rounded">Sign Up</button>
        </NavLink>
      </li>
    </>
  );

  // 🧩 Auth Buttons for Mobile
  const mobileAuthButtons = user ? (
    <div className="mt-4 pt-4 border-t border-gray-300">
      <div className="flex items-center space-x-3 mb-4">
        <img 
          alt="User Avatar" 
          className="w-10 h-10 rounded-full ring-2 ring-offset-2 ring-secondary" 
          src={user?.photoURL} 
        />
        <div>
          <p className="text-sm font-medium">{user?.displayName || 'User'}</p>
          <p className="text-xs text-gray-600">{user?.email}</p>
        </div>
      </div>
      <button 
        onClick={logoutUser} 
        className="btn btn-secondary btn-sm text-white w-full"
      >
        Log Out
      </button>
    </div>
  ) : (
    <div className="mt-4 pt-4 border-t border-gray-300 space-y-2">
      <NavLink to="/auth/login">
        <button className="btn btn-secondary btn-sm text-white w-full">Sign In</button>
      </NavLink>
      <NavLink to="/auth/register">
        <button className="btn btn-secondary btn-sm text-white w-full">Sign Up</button>
      </NavLink>
    </div>
  );

  return (
    <>
      {/* Navbar */}
      <div className="navbar bg-primary/80 text-white backdrop-blur-md sticky top-0 z-50">
        <div className="navbar-start">
          <Logo />
        </div>
        
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">
            {links}
          </ul>
        </div>
        
        <div className="navbar-end">
          {/* Desktop Auth */}
          <div className="hidden lg:flex">
            {desktopAuthButtons}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="dropdown dropdown-end lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-72"
            >
              <li><NavLink to="/" className="text-base-content">Home</NavLink></li>
              <li><NavLink to="/allPolicies" className="text-base-content">All Policies</NavLink></li>
              <li><NavLink to="/faqs" className="text-base-content">FAQS</NavLink></li>
              <li><NavLink to="/blogs" className="text-base-content">Blogs</NavLink></li>
              <li><NavLink to="/beAgent" className="text-base-content">Be a Agent</NavLink></li>
              <li><NavLink to="/dashboard" className="text-base-content">Dashboard</NavLink></li>
              
              {/* Mobile Auth Section */}
              {mobileAuthButtons}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;