import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { Link } from 'react-router-dom';

const MyBookingsPage = () => {
  const [roomBookings, setRoomBookings] = useState([]);
  const [reservations, setReservations] = useState([]); 
  const [waitlist, setWaitlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setUserEmail(session.user.email);
        const userEmail = session.user.email; 

        const { data: roomData, error: roomError } = await supabase
          .from('bookings')
          .select(`*, rooms ( room_type, image_url )`)
          .eq('customer_email', userEmail);
        
        if (roomError) console.error("Error fetching room bookings:", roomError);
        else setRoomBookings(roomData || []);

        const { data: reservationData, error: reservationError } = await supabase
          .from('reservations')
          .select(`*, dining ( name, image_url )`) 
          .eq('user_email', userEmail);

        if (reservationError) console.error("Error fetching reservations:", reservationError);
        else setReservations(reservationData || []);

        const { data: waitlistData, error: waitlistError } = await supabase
          .from('waitlist_queue')
          .select(`*, rooms ( room_type, image_url )`)
          .eq('customer_email', userEmail);
          
        if (waitlistError) console.error("Error fetching waitlist:", waitlistError);
        else setWaitlist(waitlistData || []);

      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading your bookings...</div>;
  }

  if (!userEmail) {
    return <div className="h-screen flex items-center justify-center">Please log in to see your bookings.</div>;
  }

 return (
    <div className="min-h-screen bg-gray-900 pt-36 px-4 md:px-12 pb-12">
      
      <h1 className="text-5xl font-bold text-white mb-8 border-b border-gray-700 pb-4">Your Bookings & Reservations</h1>
      {(roomBookings.length === 0 && reservations.length === 0) ? (
        <p className="text-xl text-gray-400 mb-12">You have no bookings or reservations.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {roomBookings.map(booking => (
            <div key={`room-${booking.id}`} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              {booking.rooms ? (
                <>
                  <img src={booking.rooms.image_url} alt={booking.rooms.room_type} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-white">{booking.rooms.room_type}</h2>
                    <span className="text-sm text-red-400 block mb-2">Room Booking</span>
                    <p className="text-gray-300"><strong>Check-in:</strong> {booking.check_in_date}</p>
                    <p className="text-gray-300"><strong>Check-out:</strong> {booking.check_out_date}</p>
                    <p className={`mt-4 font-semibold ${booking.status === 'confirmed' ? 'text-green-400' : 'text-yellow-400'}`}>
                      Status: {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
                    </p>
                  </div>
                </>
              ) : <div className="p-6"><p className="text-white">Room details unavailable.</p></div>}
            </div>
          ))}

          {reservations.map(res => (
             <div key={`dining-${res.id}`} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                {res.dining ? (
                  <>
                    <img src={res.dining.image_url} alt={res.dining.name} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-white">{res.dining.name}</h2>
                       <span className="text-sm text-blue-400 block mb-2">Dining Reservation</span>
                      <p className="text-gray-300"><strong>Date:</strong> {res.reservation_date}</p>
                      <p className="text-gray-300"><strong>Guests:</strong> {res.number_of_people}</p>
                      <p className={`mt-4 font-semibold ${res.status === 'confirmed' ? 'text-green-400' : 'text-yellow-400'}`}>
                        Status: {res.status?.charAt(0).toUpperCase() + res.status?.slice(1)}
                      </p>
                      <Link to={`/dining/${res.dining_id}`} className="text-sm text-red-400 hover:underline mt-2 inline-block">View Menu</Link>
                    </div>
                  </>
                ) : <div className="p-6"><p className="text-white">Dining details unavailable.</p></div>}
             </div>
          ))}
        </div>
      )}

      <h1 className="text-4xl font-bold text-white mb-8 border-b border-gray-700 pb-4">Your Waitlist</h1>
      {waitlist.length === 0 ? (
        <p className="text-xl text-gray-400">You are not on any waitlists.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {waitlist.map(item => (
            <div key={item.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              {item.rooms ? (
                <>
                  <img src={item.rooms.image_url} alt={item.rooms.room_type} className="w-full h-48 object-cover opacity-60" />
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-white">{item.rooms.room_type}</h2>
                    <p className="text-gray-300 mt-2"><strong>Requested Date:</strong> {item.requested_check_in}</p>
                    <p className="mt-4 text-lg font-semibold text-yellow-400">Status: Waitlisted</p>
                  </div>
                </>
              ) : (
                <div className="p-6"><p className="text-white">Waitlist entry for an unknown room.</p></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;