// src/components/Dining.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabaseClient'; // NEW: Import supabase

const DiningCard = ({ option }) => (
  // CHANGED: Card width is now responsive
  <div className="flex-shrink-0 w-full md:w-1/3 p-4 snap-center">
    <Link to={`/dining/${option.id}`}>
      <div className="h-96 rounded-2xl overflow-hidden group relative shadow-lg">
        <img src={option.image_url} alt={option.name} className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <h3 className="text-white text-3xl font-bold">{option.name}</h3>
          <p className="text-gray-200">{option.description}</p>
        </div>
      </div>
    </Link>
  </div>
);

const Dining = () => {
  const [diningOptions, setDiningOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  // NEW: Ref for the dining scroll container
  const diningScrollContainer = useRef(null);

  // NEW: useEffect to fetch data from the 'dining' table
  useEffect(() => {
    const getDiningOptions = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('dining').select('*');
      if (error) {
        console.error("Error fetching dining options:", error);
      } else {
        setDiningOptions(data);
      }
      setLoading(false);
    };
    getDiningOptions();
  }, []);

  // We duplicate the array to create a seamless loop for the carousel
  const duplicatedOptions = [...diningOptions, ...diningOptions];

  const scrollDining = (direction) => {
    if (diningScrollContainer.current) {
      const scrollAmount = diningScrollContainer.current.offsetWidth / (window.innerWidth < 768 ? 1 : 3);
      diningScrollContainer.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div id="dining" className="w-full py-16 bg-black text-white relative">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-extrabold">Dining</h2>
      </div>
      
      {/* Carousel Container */}
      <div className="w-full overflow-hidden px-4">
        {loading ? (
          <p className="text-center text-xl">Loading dining options...</p>
        ) : (
          <div ref={diningScrollContainer} className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar">
            {diningOptions.map((option) => (
              <DiningCard key={option.id} option={option} />
            ))}
          </div>
        )}
      </div>
      {/* Navigation Buttons */}
      <button onClick={() => scrollDining('left')} className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 mx-6 mt-8">{'<'}</button>
      <button onClick={() => scrollDining('right')} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 mx-6 mt-8">{'>'}</button>
    </div>
  );
};

export default Dining;