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
const [isClicked,setIsClicked] = useState(false);
const {user,logoutUser}=useAuthContext();



  // 🧩 Reusable Navigation Links
  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/allPolicies">All Policies</NavLink></li>
      <li><NavLink to="/about">Agent</NavLink></li>
      <li><NavLink to="/contact">FAQS</NavLink></li>
      <li><NavLink to="/dashboard">Dashboard</NavLink></li>
    </>
  );

  // 🧩 Reusable Auth Buttons
  const authButtons = user ? (
   <div className="flex flex-col items-center justify-center relative">
	<div onClick={()=> setIsClicked(!isClicked)} className="flex space-x-5">
		<img alt="" className="w-12 h-12 rounded-full ring-2 ring-offset-2 ring-secondary " 
    src={user?.photoURL} />
	
	</div>
  {
   <AnimatePresence>
        {isClicked && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute mt-40  rounded-md shadow-lg bg-gray-100   z-20"
          >
            <div className="p-4">
              <h1 className="text-black">{user?.email}</h1>
              <button onClick={()=>logoutUser()} className="btn btn-secondary text-white">log-Out</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
  }
 
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

  return (
    <div className="drawer drawer-end lg:drawer-static backdrop-blur-md sticky top-0 z-50">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Navbar */}
      <div className="drawer-content flex flex-col">
        <header className="p-4 bg-primary/80 text-white">
          <div className="container mx-auto flex justify-between items-center h-12">
            <Logo />

            {/* Desktop Links */}
            <ul className="hidden lg:flex space-x-6 items-center">{links}</ul>

            {/* Desktop Auth Buttons */}
            <ul className="hidden lg:flex space-x-4 items-center">{authButtons}</ul>

            {/* Hamburger (mobile) */}
            <div className="lg:hidden">
              <label htmlFor="my-drawer" className="btn btn-ghost btn-circle text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </label>
            </div>
          </div>
        </header>
      </div>

      {/* Drawer Side (Mobile Menu) */}
      <div className="drawer-side lg:hidden z-50">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content space-y-2">
          {links}
          {authButtons}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
