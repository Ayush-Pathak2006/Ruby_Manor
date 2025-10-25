// src/pages/PaymentPage.jsx

import React, { useState } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { supabase } from '../services/supabaseClient'; // Make sure supabase is imported

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { session } = useOutletContext(); // Get session from Layout

  // Destructure state passed from previous page, provide defaults
  const {
    bookingType = 'room',
    room,
    diningOption,
    fullName, email,
    checkIn, checkOut,
    reservationDate, numberOfPeople,
    totalCost
  } = location.state || {};

  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    // Ensure user is logged in before proceeding
    if (!session) {
      alert("Authentication error: Session not found. Please log in again.");
      setIsProcessing(false);
      navigate('/login');
      return;
    }

    try {
      let confirmationMessage = '';
      let dbOperationSuccessful = false; // Flag to track if DB write succeeded

      // Logic separates based on bookingType
      if (bookingType === 'dining') {
        // Save to the 'reservations' table
        const { error: insertError } = await supabase.from('reservations').insert({
          user_id: session.user.id,
          user_email: email,
          dining_id: diningOption.id,
          reservation_date: reservationDate,
          number_of_people: numberOfPeople,
          total_cost: totalCost,
          status: 'confirmed',
        });
        if (insertError) throw insertError; // Throw DB error to be caught below
        dbOperationSuccessful = true; // Mark DB operation as successful
        confirmationMessage = `Dining reservation at ${diningOption.name} confirmed for ${numberOfPeople} person(s) on ${reservationDate}!`;

      } else { // It's a room booking
        // Check room availability
        const { data: roomData, error: roomError } = await supabase.from('rooms').select('total_quantity').eq('id', room.id).single();
        if (roomError) throw roomError;
        const { count: bookedCount, error: bookingError } = await supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('room_id', room.id).lt('check_in_date', checkOut).gt('check_out_date', checkIn);
        if (bookingError) throw bookingError;

        if (bookedCount < roomData.total_quantity) {
          // Room available - Save to 'bookings' table
          const { error: insertError } = await supabase.from('bookings').insert({
            room_id: room.id,
            customer_name: fullName,
            customer_email: email,
            check_in_date: checkIn,
            check_out_date: checkOut,
            status: 'confirmed',
            booking_type: 'room',
          });
          if (insertError) throw insertError;
          dbOperationSuccessful = true;
          confirmationMessage = `Room booking confirmed for ${checkIn} to ${checkOut}!`;
        } else {
          // Room full - Add to 'waitlist_queue' table
          const { error: waitlistError } = await supabase.from('waitlist_queue').insert({ room_id: room.id, customer_name: fullName, customer_email: email, requested_check_in: checkIn, requested_check_out: checkOut });
          if (waitlistError) throw waitlistError;
          dbOperationSuccessful = true; // Still successful in adding to waitlist
          confirmationMessage = "This room is full. You've been added to the waitlist.";
        }
      }

      // --- NEW: Call Edge Function to send email AFTER successful DB operation ---
      if (dbOperationSuccessful) {
        console.log("Database save successful. Attempting to send email...");
        
        let emailDetails = '';
        let bookingDate = '';
        if (bookingType === 'dining') {
            emailDetails = `Reservation for ${numberOfPeople} guest(s) at ${diningOption.name}.`;
            bookingDate = reservationDate;
        } else { // Room booking or waitlist
            emailDetails = bookingType === 'room'
              ? `Booking for room: ${room.room_type}. Check-out: ${checkOut}.`
              : `Waitlist request for room: ${room.room_type}. Requested Check-in: ${checkIn}.`;
            bookingDate = checkIn;
        }

        // Call the 'send-confirmation-email' function
        const { data: emailResponse, error: emailError } = await supabase.functions.invoke('send-confirmation-email', {
          body: JSON.stringify({
            name: fullName,
            email: email,
            date: bookingDate,
            details: emailDetails,
            type: bookingType, // Pass 'room' or 'dining'
          }),
        });

        if (emailError) {
          // Log the email error but proceed - the booking IS saved
          console.error("Error invoking email function:", emailError);
          alert(confirmationMessage + " (There was an issue sending the confirmation email, but your booking/reservation is saved).");
        } else {
          // Email sent successfully
          console.log("Email function response:", emailResponse);
          alert(confirmationMessage + " An email confirmation has been sent.");
        }
      }
      
      // Navigate after DB operation & email attempt
      navigate('/my-bookings');

    } catch (error) { // Catch errors from DB operations or email function call
      console.error("Full booking/reservation error object:", error);
      alert("Could not save your booking/reservation. Error: " + (error?.message || JSON.stringify(error)));
      // Ensure processing state is reset on error
      setIsProcessing(false); 
    } 
    // Removed finally block to prevent setting isProcessing false too early if navigate happens
  };

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
                <p><strong>Restaurant:</strong> {diningOption?.name}</p> {/* Added optional chaining */}
                <p><strong>Name:</strong> {fullName}</p>
                <p><strong>Date:</strong> {reservationDate}</p>
                <p><strong>Guests:</strong> {numberOfPeople}</p>
             </>
          ) : (
             <>
                <p><strong>Room:</strong> {room?.room_type}</p> {/* Added optional chaining */}
                <p><strong>Name:</strong> {fullName}</p>
                <p><strong>Dates:</strong> {checkIn} to {checkOut}</p>
             </>
          )}
          <p className="text-2xl font-bold mt-2"><strong>Total:</strong> <span className="text-red-400">₹{totalCost}</span></p>
        </div>

        <h2 className="text-white text-2xl font-semibold mb-4">Scan to Pay with UPI</h2>
        <img src="/my-qr-code.jpg" alt="UPI QR Code for payment" className="mx-auto w-64 h-64 rounded-lg mb-6" />

        <button
          onClick={handleConfirmPayment}
          disabled={isProcessing || !session} // Disable if processing or not logged in
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded transition-colors duration-300 disabled:bg-gray-500"
        >
          {isProcessing ? 'Processing...' : 'I Have Paid, Confirm Booking'}
        </button>
        {!session && <p className="text-red-400 mt-4">Please log in to confirm.</p>}
      </div>
    </div>
  );
};

export default PaymentPage;