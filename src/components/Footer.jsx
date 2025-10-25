import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      className="w-full bg-gradient-to-r from-red-700 via-red-500 to-red-800 text-black p-8 md:p-16 flex flex-wrap justify-between gap-8"
    >
      <div id="f1">
        <img src="/hotel.svg" alt="Ruby Manor Logo" className="h-24" />
      </div>
      <div id="f2" className="flex flex-col gap-2">
        <a href="https://www.linkedin.com/in/ayush-pathak-75a985293/">
        <h3 className="text-2xl font-black uppercase">Follow Us</h3>
        </a>
        <Link to="/terms" className="text-2xl font-black uppercase">Terms & Policies</Link>
        <Link to="/contact" className="text-2xl font-black uppercase">Contact Us</Link>
      </div>
      <div id="f4">
        <h4 className="text-lg font-semibold uppercase leading-relaxed">
          15, MARINE DRIVE <br />
          CHURCHGATE <br />
          MUMBAI <br />
          MAHARASHTRA <br />
          TEL: +91 9876543210 <br />
          
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
