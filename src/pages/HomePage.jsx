import React from 'react'; 
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import Rooms from '../components/Rooms'; 
import Dining from '../components/Dining';

const HomePage = () => {

  return (
    <div>
      <div id="main" className="relative">
        <Hero />
        <div id="page-content" className="bg-black">
          <AboutUs />
          <Rooms />
          
          <Dining />
        </div>
      </div>
    </div>
  );
};

export default HomePage;