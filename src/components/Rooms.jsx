import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../services/supabaseClient';
import RoomCard from './RoomCard';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const roomsScrollContainer = useRef(null);

  useEffect(() => {
    const getRooms = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from('rooms').select('*');
        if (error) console.error('Error fetching rooms:', error);
        else setRooms(data);
      } catch (error) {
        console.error('An unexpected error occurred:', error);
      } finally {
        setLoading(false);
      }
    };
    getRooms();
  }, []);

  const scrollRooms = (direction) => {
    if (roomsScrollContainer.current) {
      const scrollAmount = roomsScrollContainer.current.offsetWidth;
      roomsScrollContainer.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div id="rooms" className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-extrabold text-white">Rooms</h2>
      </div>

      <div className="relative">
        {loading ? (
          <p className="text-white text-2xl font-semibold text-center h-96 flex items-center justify-center">Loading Rooms...</p>
        ) : (
          <>
            {/* --- MOBILE CAROUSEL --- */}
            <div className="md:hidden relative">
              <div ref={roomsScrollContainer} className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar">
                {rooms.map(room => (
                  // CHANGED: Simplified this structure.
                  // We apply padding and width directly to the scrolling item.
                  <div key={room.id} className="w-full flex-shrink-0 snap-center p-4">
                    <RoomCard room={room} />
                  </div>
                ))}
              </div>
              <button onClick={() => scrollRooms('left')} className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 mx-2">{'<'}</button>
              <button onClick={() => scrollRooms('right')} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 mx-2">{'>'}</button>
            </div>

            {/* --- DESKTOP GRID --- */}
            <div id="cards-container" className="hidden min-h-[60vh] md:flex flex-wrap items-center justify-center gap-8 md:gap-16 px-8">
              {rooms.map(room => <RoomCard key={room.id} room={room} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Rooms;