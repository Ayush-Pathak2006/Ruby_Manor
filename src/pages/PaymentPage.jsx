// src/pages/PaymentPage.jsx

import React, { useState } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';


const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { session } = useOutletContext();
  // Destructure all possible state values, provide defaults
  const { 
    bookingType = 'room', // Default to 'room' if not specified
    room, 
    diningOption,
    fullName, email, 
    checkIn, checkOut, // For rooms
    reservationDate, numberOfPeople, // For dining
    totalCost 
  } = location.state || {};
  const [isProcessing, setIsProcessing] = useState(false);

//  const handleConfirmPayment = async () => {
//     setIsProcessing(true);
//     try {
//       let bookingData = {};
//       let confirmationMessage = '';
      
//       if (bookingType === 'dining') {
//         // --- Corrected Dining Reservation Data ---
//         bookingData = {
//           customer_name: fullName,
//           customer_email: email,
//           check_in_date: reservationDate, // Use check_in_date for the reservation date
//           number_of_people: numberOfPeople, 
//           status: 'confirmed', 
//           // --- FIXED: Explicitly add booking_type and dining_id ---
//           booking_type: 'dining',     // Set the type
//           dining_id: diningOption.id, // Link to the dining table
//           // room_id and check_out_date will be NULL, which is correct
//         };
//         confirmationMessage = `Dining reservation at ${diningOption.name} confirmed for ${numberOfPeople} person(s) on ${reservationDate}!`;

//         // --- Insert into bookings table ---
//         const { error: insertError } = await supabase.from('bookings').insert(bookingData);
//         if (insertError) throw insertError;

//       } else { // It's a room booking (original logic)
//         // ... (Your existing room booking and waitlist logic remains unchanged here) ...
//          const { data: roomData, error: roomError } = await supabase.from('rooms').select('total_quantity').eq('id', room.id).single();
//         if (roomError) throw roomError;
//         const { count: bookedCount, error: bookingError } = await supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('room_id', room.id).lt('check_in_date', checkOut).gt('check_out_date', checkIn);
//         if (bookingError) throw bookingError;

//         if (bookedCount < roomData.total_quantity) {
//             bookingData = {
//               room_id: room.id,
//               customer_name: fullName,
//               customer_email: email,
//               check_in_date: checkIn,
//               check_out_date: checkOut,
//               status: 'confirmed',
//               // --- FIXED: Explicitly set booking_type for rooms too ---
//               booking_type: 'room', 
//             };
//             const { error: insertError } = await supabase.from('bookings').insert(bookingData);
//             if (insertError) throw insertError;
//             confirmationMessage = `Room booking confirmed for ${checkIn} to ${checkOut}!`;
//         } else {
//             const { error: waitlistError } = await supabase.from('waitlist_queue').insert({ room_id: room.id, customer_name: fullName, customer_email: email, requested_check_in: checkIn, requested_check_out: checkOut });
//             if (waitlistError) throw waitlistError;
//             confirmationMessage = "This room is full. You've been added to the waitlist.";
//         }
//       }

//       alert(confirmationMessage + " An email confirmation will be sent.");
//       navigate('/my-bookings');

//     } catch (error) {
//       console.error("Full booking error object:", error);
//       alert("Could not save your reservation/booking. Error: " + (error?.message || JSON.stringify(error)));
//       setIsProcessing(false);
//     }
//   };

// src/pages/PaymentPage.jsx

const handleConfirmPayment = async () => {
    setIsProcessing(true);
if (!session) {
        alert("Authentication error: Session not found. Please log in again.");
        setIsProcessing(false);
        navigate('/login');
        return;
    }

    try {
      let confirmationMessage = '';
      
      // --- CHANGED: Logic now separates based on bookingType ---
      if (bookingType === 'dining') {
        // --- Save to the NEW 'reservations' table ---
        const { error: insertError } = await supabase.from('reservations').insert({
          user_id: session.user.id, // Make sure you get session from context or props
          user_email: email,
          dining_id: diningOption.id,
          reservation_date: reservationDate,
          number_of_people: numberOfPeople,
          total_cost: totalCost,
          status: 'confirmed', // Assuming payment confirmed
        });
        if (insertError) throw insertError;
        confirmationMessage = `Dining reservation at ${diningOption.name} confirmed for ${numberOfPeople} person(s) on ${reservationDate}!`;

      } else { // It's a room booking (original logic stays the same)
        // Check room availability
        const { data: roomData, error: roomError } = await supabase.from('rooms').select('total_quantity').eq('id', room.id).single();
        if (roomError) throw roomError;
        const { count: bookedCount, error: bookingError } = await supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('room_id', room.id).lt('check_in_date', checkOut).gt('check_out_date', checkIn);
        if (bookingError) throw bookingError;

        if (bookedCount < roomData.total_quantity) {
            // Room available - Save to 'bookings' table
            const { error: insertError } = await supabase.from('bookings').insert({
              room_id: room.id,
              customer_name: fullName, // Use the correct name from state
              customer_email: email,
              check_in_date: checkIn,
              check_out_date: checkOut,
              status: 'confirmed',
              booking_type: 'room', // Keep this if you want
            });
            if (insertError) throw insertError;
            confirmationMessage = `Room booking confirmed for ${checkIn} to ${checkOut}!`;
        } else {
            // Room full - Add to 'waitlist_queue' table
            const { error: waitlistError } = await supabase.from('waitlist_queue').insert({ room_id: room.id, customer_name: fullName, customer_email: email, requested_check_in: checkIn, requested_check_out: checkOut });
            if (waitlistError) throw waitlistError;
            confirmationMessage = "This room is full. You've been added to the waitlist.";
        }
      }

      alert(confirmationMessage + " An email confirmation will be sent.");
      navigate('/my-bookings');

    } catch (error) {
      console.error("Full booking/reservation error object:", error);
      alert("Could not save your booking/reservation. Error: " + (error?.message || JSON.stringify(error)));
      setIsProcessing(false);
    }
  };

  // --- Ensure session is available ---
  // You'll need to get the session, likely from useOutletContext if using the Layout pattern
  // const { session } = useOutletContext(); 

  // ... rest of PaymentPage.jsx

  if (!location.state) {
    return <div className="h-screen flex items-center justify-center">Invalid booking details. Please go back and try again.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 pt-28">
      <div className="text-center p-10 bg-gray-800 rounded-lg shadow-xl w-full max-w-lg">
        <h1 className="text-white text-4xl font-bold mb-4">Confirm Your {bookingType === 'dining' ? 'Reservation' : 'Booking'}</h1>
        <div className="text-left text-lg text-gray-300 mb-6 border-y border-gray-600 py-4">
          {bookingType === 'dining' ? (
             <>
                <p><strong>Restaurant:</strong> {diningOption.name}</p>
                <p><strong>Name:</strong> {fullName}</p>
                <p><strong>Date:</strong> {reservationDate}</p>
                <p><strong>Guests:</strong> {numberOfPeople}</p>
             </>
          ) : (
             <>
                <p><strong>Room:</strong> {room.room_type}</p>
                <p><strong>Name:</strong> {fullName}</p>
                <p><strong>Dates:</strong> {checkIn} to {checkOut}</p>
             </>
          )}
          <p className="text-2xl font-bold mt-2"><strong>Total:</strong> <span className="text-red-400">₹{totalCost}</span></p>
        </div>

        <h2 className="text-white text-2xl font-semibold mb-4">Scan to Pay with UPI</h2>
        {/* Make sure your QR code image is in the /public folder */}
        <img src="/my-qr-code.png" alt="UPI QR Code for payment" className="mx-auto w-64 h-64 rounded-lg mb-6" />

        <button
          onClick={handleConfirmPayment}
          disabled={isProcessing}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded transition-colors duration-300 disabled:bg-gray-500"
        >
          {isProcessing ? 'Processing...' : 'I Have Paid, Confirm Booking'}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;