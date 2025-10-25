import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessionAndProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select(`full_name`)
          .eq('id', session.user.id)
          .single();
        
        if (profileData) {
          setProfile(profileData);
        } else {
          navigate('/setup-profile');
        }
      }
    };

    fetchSessionAndProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);      if (!session) {
        setProfile(null);
      } else {
        fetchSessionAndProfile();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="bg-black text-white">
      <Navbar session={session} profile={profile} />
      <main>
        <Outlet context={{ session, profile }} />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;