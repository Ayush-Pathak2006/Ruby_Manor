import React from 'react';

const BookingForm = ({ room }) => {
  // TODO: Add state management for form inputs (useState)
  // TODO: Add handleSubmit function to call the Edge Function

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-6 border-b-2 border-red-500 pb-2">Book Your Stay</h3>
      <div className="mb-4">
        <span className="text-lg font-semibold block">{room.room_type}</span>
        <span className="text-red-400 text-xl font-bold">${room.price_per_night} / night</span>
      </div>
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
          <input type="text" id="name" className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input type="email" id="email" className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
        <div className="flex gap-4 mb-6">
          <div className="w-1/2">
            <label htmlFor="checkin" className="block text-sm font-medium mb-1">Check-in</label>
            <input type="date" id="checkin" className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div className="w-1/2">
            <label htmlFor="checkout" className="block text-sm font-medium mb-1">Check-out</label>
            <input type="date" id="checkout" className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
        </div>
        <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded transition-colors duration-300">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookingForm;