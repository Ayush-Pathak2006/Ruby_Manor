// src/components/Navbar.jsx

import React, { useState, useLayoutEffect, useRef } from "react";
// NEW: Import useLocation to check the current URL
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Navbar = ({ session, profile }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  const navigate = useNavigate();
  // NEW: Get the current page's location
  const location = useLocation();

  // NEW: Check if the current page is the homepage
  const isHomePage = location.pathname === "/";

  useLayoutEffect(() => {
    // CHANGED: Only run the scroll animation if we are on the homepage
    if (isHomePage) {
      const ctx = gsap.context(() => {
        gsap.to(navRef.current, {
          backgroundColor: "#000",
          duration: 0.5,
          scrollTrigger: {
            trigger: "body",
            start: "top -10%",
            end: "top -11%",
            scrub: 1,
          },
        });
      }, navRef);
      return () => ctx.revert();
    }
  }, [isHomePage]); // Dependency array ensures this effect re-evaluates if the page changes

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsMenuOpen(false);
    navigate("/");
  };

  // CHANGED: The navbar's class is now dynamic. It's transparent on the homepage and solid black everywhere else.
  const navClassName = `w-full h-[110px] fixed top-0 left-0 z-[999] flex items-center justify-between px-4 md:px-24 transition-colors duration-300 ${
    isHomePage ? "bg-transparent " : "bg-gray-950 "
  }`;

  return (
    <>
      <nav ref={navRef} className={navClassName}>
        {/* LEFT SIDE: Logo and Navigation Links */}
        <div className="flex items-center gap-10">
           <a href="/#about-us" className="cursor-pointer">
            <img src="/hotel.svg" alt="Ruby Manor Logo" className="h-16" />
          </a>
          <div className="hidden md:flex items-center gap-8 text-white uppercase font-semibold">
            <a href="/#about-us" className="cursor-pointer">
              About Us
            </a>
            <a href="/#rooms" className="cursor-pointer">
              Rooms
            </a>
            <a href="/#dining" className="cursor-pointer">
              Dining
            </a>
            {session && ( // Only show if user is logged in
        <Link to="/my-bookings" className="cursor-pointer">Your Bookings</Link>
    )}
          </div>
        </div>

        {/* RIGHT SIDE: User Greeting, Login/Logout Buttons */}
        <div className="hidden md:flex items-center">
          {session ? (
            <div className="flex items-center gap-4">
              <p className="text-white text-sm">
                Hi, {profile ? profile.full_name : "..."}
              </p>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            >
              Login
            </Link>
          )}
        </div>

        {/* Burger Menu and Mobile Menu Overlay... (no changes here) */}
        {/* ... */}

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none z-10"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-4 6h4"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-screen bg-black bg-opacity-95 z-[998] transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 text-white text-2xl uppercase">
          <a
            href="/#about-us"
            className="cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </a>
          <a
            href="/#rooms"
            className="cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          >
            Rooms
          </a>
          <a
            href="/#dining"
            className="cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          >
            Dining
          </a>
          {session && (
    <Link to="/my-bookings" className="cursor-pointer" onClick={() => setIsMenuOpen(false)}>Your Bookings</Link>
)}

          <div className="border-t border-gray-600 w-3/4 my-4"></div>

          {/* Conditional Login/Logout for Mobile Menu */}
          {session ? (
            <div className="flex flex-col items-center gap-4">
              <p className="text-lg normal-case">
                Hi, {profile ? profile.full_name : session.user.email}
              </p>
              <button onClick={handleLogout} className="text-red-500 font-bold">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
          )}
        </div>
      </div>
      {/* ... */}
    </>
  );
};

export default Navbar;
