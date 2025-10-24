// src/pages/HomePage.jsx

import React from 'react'; // No longer need useState, useEffect, or useRef here
import Hero from '../components/Hero';
import Scroller from '../components/Scroller';
import AboutUs from '../components/AboutUs';
import Rooms from '../components/Rooms'; // NEW: Import the new Rooms component
import Dining from '../components/Dining';
// We no longer need to import supabase or RoomCard here

const HomePage = () => {
  // All the state, useEffect, and scroll functions for rooms have been removed
  
  return (
    <div>
      <div id="main" className="relative">
        <Hero />
        <div id="page-content" className="bg-black">
          <Scroller />
          <AboutUs />
          
          {/* CHANGED: Replaced the entire "Rooms" section with our new component */}
          <Rooms />
          
          <Dining />
        </div>
      </div>
    </div>
  );
};

export default HomePage;