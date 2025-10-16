// import React from 'react';
// import { Link } from 'react-router-dom';

// const RoomCard = ({ room }) => {
//   return (
//     <Link to={`/rooms/${room.id}`} className="card w-full md:w-1/4 h-96 rounded-2xl overflow-hidden group transition-transform duration-500 hover:scale-105">
//       <div
//         className="w-full h-full bg-cover bg-center"
//         style={{ backgroundImage: `url(${room.image_url})` }}
//       >
//         <div className="w-full h-full p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//           <h4 className="text-white text-3xl font-extrabold">{room.room_type}</h4>
//           <p className="text-gray-200">${room.price_per_night} / night</p>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default RoomCard;


import React from 'react';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
  return (
    <Link to={`/rooms/${room.id}`} className="card w-full md:w-1/4 h-96 rounded-2xl overflow-hidden group transition-transform duration-500 hover:scale-105 shadow-lg">
      <div
        className="w-full h-full bg-cover bg-center relative" // Added relative positioning
        style={{ backgroundImage: `url(${room.image_url})` }}
      >
        {/* This overlay with a gradient is now always visible */}
        <div className="absolute inset-0 w-full h-full p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
          <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
            <h4 className="text-white text-3xl font-extrabold">{room.room_type}</h4>
            <p className="text-gray-200">${room.price_per_night} / night</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;