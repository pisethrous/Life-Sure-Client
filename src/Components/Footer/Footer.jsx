import React from "react";
import Logo from "../Logo/Logo";
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter, FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="px-4 divide-y bg-primary text-white">
      <div className="container flex flex-col lg:flex-row justify-between py-10 mx-auto space-y-8 lg:space-y-0">
        {/* Logo */}
        <div className="lg:w-1/3 flex justify-center lg:justify-start">
          <Logo />
        </div>

        {/* Contact & Social Links */}
        <div className="lg:w-2/3 flex flex-col lg:flex-row justify-center lg:justify-end gap-10">
          {/* Contact Details */}
          <div className="flex flex-col items-center lg:items-start">
            <h6 className="footer-title mb-2 text-lg font-semibold">Contact Details</h6>
            <a className="link link-hover mb-1" href="tel:+8801533333333">+88 01533 333 333</a>
            <a className="link link-hover mb-1" href="mailto:info@gmail.com">info@gmail.com</a>
            <span className="link link-hover">72, Wall Street, King Road, Dhaka</span>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-center lg:items-start">
            <h6 className="footer-title mb-2 text-lg font-semibold">Social Media Links</h6>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/concentration369/" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={30} />
              </a>
              <a href="https://www.instagram.com/mh_sky_69/" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={30} />
              </a>
              <a href="https://x.com/mh_sky_69" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={30} />
              </a>
              <a href="https://www.linkedin.com/in/mehediakash01" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn size={30} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom with Payment Cards */}
      <div className="py-6 text-sm text-center flex flex-col md:flex-row justify-center items-center gap-4">
        <span>© 2025 lifeSure. All rights reserved.</span>
        <div className="flex gap-3 text-white">
          <FaCcVisa size={30} />
          <FaCcMastercard size={30} />
          <FaCcAmex size={30} />
          <FaCcDiscover size={30} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
