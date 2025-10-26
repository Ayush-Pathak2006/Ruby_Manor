import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ImageCarousel from '../components/ImageCarousel';
import RoomSpecs from '../components/RoomSpecs';
import BookingForm from '../components/BookingForm';

const RoomDetailPage = () => {
  const { id } = useParams();
  const { session, profile } = useOutletContext();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('rooms').select('*').eq('id', id).single();
      if (error) {
        console.error('Error fetching room details:', error);
      } else {
        setRoom(data);
      }
      setLoading(false);
    };
    fetchRoom();
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!room) return <div className="h-screen flex items-center justify-center">Room not found.</div>;

  return (
    <>
      <div className="pt-28 bg-gray-900 text-white min-h-screen">
        <ImageCarousel room={room} />
        <section className="container mx-auto my-12 p-4 flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <RoomSpecs room={room} />
          </div>
          <div className="md:w-1/3">
            <BookingForm room={room} session={session} profile={profile} />
          </div>
        </section>
      </div>
    </>
  );
};

export default RoomDetailPage;