import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingForm = ({ room, session, profile }) => {

  // NEW: State for each form field
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const navigate = useNavigate();

  // NEW: This useEffect hook runs when the component loads or when the user's data changes.
  // It pre-fills the form with the user's details if they are logged in.
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
    }
    if (session) {
      setEmail(session.user.email || '');
    }
  }, [session, profile]); // The dependency array ensures this runs when session/profile are available
  useEffect(() => {
    if (checkIn && checkOut) {
      const startDate = new Date(checkIn);
      const endDate = new Date(checkOut);
      
      // Calculate the difference in time (in milliseconds)
      const timeDiff = endDate.getTime() - startDate.getTime();

      // Convert time difference from milliseconds to days
      const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (nights > 0) {
        const cost = nights * room.price_per_night;
        setTotalCost(cost);
      } else {
        setTotalCost(0);
      }
    }
  }, [checkIn, checkOut, room.price_per_night]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // This is where we will add the booking logic in the next step
    if (totalCost <= 0) {
      alert("Please select a valid date range.");
      return;
    }
    navigate('/payment', {
      state: {
        room,
        fullName,
        email,
        checkIn,
        checkOut,
        totalCost,
      }
    });
  };


  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-6 border-b-2 border-red-500 pb-2">Book Your Stay</h3>
      <div className="mb-4">
        <span className="text-lg font-semibold block">{room.room_type}</span>
        <span className="text-red-400 text-xl font-bold">Rs {room.price_per_night} / night</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
          <input type="text" id="name" value={fullName}
            onChange={(e) => setFullName(e.target.value)} className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500" required/>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input type="email" id="email" value={email}
            onChange={(e) => setEmail(e.target.value)} className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500" required/>
        </div>
        <div className="flex gap-4 mb-6">
          <div className="w-1/2">
            <label htmlFor="checkin" className="block text-sm font-medium mb-1">Check-in</label>
            <input type="date" id="checkin" value={checkIn} onChange={(e) => setCheckIn(e.target.value)}className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500" required/>
          </div>
          <div className="w-1/2">
            <label htmlFor="checkout" className="block text-sm font-medium mb-1">Check-out</label>
            <input type="date" id="checkout" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500" required/>
          </div>
        </div>
        {totalCost > 0 && (
          <div className="my-6 text-center">
            <p className="text-lg text-gray-300">Total Estimated Cost:</p>
            <p className="text-4xl font-bold text-red-400">${totalCost}</p>
          </div>
        )}
        <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded transition-colors duration-300">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookingForm;