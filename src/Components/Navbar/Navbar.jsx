import React from "react";
import { NavLink } from "react-router";
import Logo from "../Logo/Logo";

const Navbar = () => {
  // Reusable navigation links
  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/services">All Policies</NavLink></li>
      <li><NavLink to="/about">Agent</NavLink></li>
      <li><NavLink to="/contact">FAQS</NavLink></li>
    </>
  );

  return (
    <div className="drawer drawer-end lg:drawer-static  sticky top-0">
      {/* Toggle for mobile drawer */}
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Navbar */}
      <div className="drawer-content flex flex-col ">
        <header className="p-4 bg-primary/80  text-white">
          <div className="container mx-auto flex justify-between items-center h-12">
            {/* Logo */}
          <Logo></Logo>

            {/* Desktop Links */}
            <ul className="hidden lg:flex space-x-6">{links}</ul>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex space-x-4">
              <NavLink to="/auth/login">
                <button className="px-4 py-2 text-white bg-secondary rounded">Sign In</button>
              </NavLink>
              <NavLink to="/auth/register">
                <button className="px-4 py-2 text-white bg-secondary rounded">Sign Up</button>
              </NavLink>
            </div>

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

      {/* Drawer Content (mobile nav) */}
      <div className="drawer-side lg:hidden z-50">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content space-y-2">
          {links}
          <li><NavLink to="/login">Sign In</NavLink></li>
          <li><NavLink to="/signup">Sign Up</NavLink></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
