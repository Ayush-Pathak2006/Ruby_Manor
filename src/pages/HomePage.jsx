import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Scroller from '../components/Scroller';
import AboutUs from '../components/AboutUs';
import RoomCard from '../components/RoomCard';
import Footer from '../components/Footer';

// const Scroller = () => (
//   <div id="scroller" className="w-full overflow-hidden whitespace-nowrap py-8">
//     <div className="inline-block animate-scroll">
//       <h4 className="inline-block text-[9vw] md:text-[120px] font-extrabold mr-5 text-transparent stroke-2 stroke-red-500 hover:text-red-500 transition-colors duration-300">
//         Welcome to The Ruby Manor – Where Elegance Meets Comfort!
//       </h4>
//     </div>
//     <div className="inline-block animate-scroll">
//       <h4 className="inline-block text-[9vw] md:text-[120px] font-extrabold mr-5 text-transparent stroke-2 stroke-red-500 hover:text-red-500 transition-colors duration-300">
//         Welcome to The Ruby Manor – Where Elegance Meets Comfort!
//       </h4>
//     </div>
//   </div>
// );

const HomePage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRooms = async () => {
      const { data, error } = await supabase.from('rooms').select('*');
      if (error) {
        console.error('Error fetching rooms:', error);
      } else {
        setRooms(data);
      }
    };
    getRooms();
  }, []);

  return (
    <div>
      <Navbar />
      <div id="main" className="relative bg-black/40">
        <Hero />
        <div id="page-content" className="relative z-10 bg-black">
          <Scroller />
          <AboutUs />
          <div id="cards-container" className="min-h-[60vh] flex flex-wrap items-center justify-center gap-8 md:gap-16 p-8 relative z-10">
            {rooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
        {/* Additional pages/sections from original design can be added as components here */}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;