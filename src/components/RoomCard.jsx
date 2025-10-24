import React from 'react';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
  return (
    <Link 
      to={`/rooms/${room.id}`} 
      // CHANGED: We ensure it's a 'block' element and has the correct responsive widths
      className="card block w-full md:w-1/4 h-96 rounded-2xl overflow-hidden group shadow-lg transition-transform duration-500 hover:scale-105"
    >
      <div
        className="w-full h-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${room.image_url})` }}
      >
        {/* This div provides a dark background in case the image is slow to load */}
        <div className="absolute inset-0 bg-gray-900 opacity-30"></div>

        {/* This is your overlay with the text */}
        <div className="absolute inset-0 w-full h-full p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
          
          {/* This div animates on hover (desktop) and active (mobile touch) */}
          <div className="transform transition-transform duration-500 group-hover:-translate-y-2 group-active:-translate-y-2">
            <h4 className="text-white text-3xl font-extrabold">{room.room_type}</h4>
            <p className="text-gray-200">Rs {room.price_per_night} / night</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;