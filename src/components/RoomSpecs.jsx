import React from 'react';

const RoomSpecs = ({ room }) => {
  return (
    <div className="bg-gray-800 p-8 rounded-lg">
      <h2 className="text-4xl font-extrabold mb-4">{room.room_type}</h2>
      <p className="text-lg text-gray-300 mb-6">{room.description || 'A luxurious room with premium amenities and a beautiful view.'}</p>
      <div className="grid grid-cols-2 gap-4 text-lg">
        <div className="p-4 bg-gray-700 rounded">
          <span className="font-bold block">Price</span>
          <span>Rs{room.price_per_night} / night</span>
        </div>
        <div className="p-4 bg-gray-700 rounded">
          <span className="font-bold block">View</span>
          <span>{room.view_type}</span>
        </div>
        <div className="p-4 bg-gray-700 rounded">
          <span className="font-bold block">Total Available</span>
          <span>{room.total_quantity} Rooms</span>
        </div>
        <div className="p-4 bg-gray-700 rounded">
          <span className="font-bold block">Amenities</span>
          <span>Wi-Fi, AC, TV</span>
        </div>
      </div>
    </div>
  );
};

export default RoomSpecs;