// src/components/Layout.jsx

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
    // This function fetches the current session and profile data
    const fetchSessionAndProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        // If a session exists, try to fetch the user's profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select(`full_name`)
          .eq('id', session.user.id)
          .single();
        
        if (profileData) {
          setProfile(profileData);
        } else {
          // If no profile exists, it's a new user. Redirect them.
          navigate('/setup-profile');
        }
      }
    };
    
    // Fetch data on initial component mount
    fetchSessionAndProfile();

    // Set up a listener for authentication state changes (login, logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      // If the user logs out, clear the profile
      if (!session) {
        setProfile(null);
      } else {
        // If a user logs in, re-fetch their profile
        fetchSessionAndProfile();
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="bg-black text-white">
      {/* The Navbar now receives the live session and profile data */}
      <Navbar session={session} profile={profile} />
      <main>
        {/* The <Outlet/> component renders the active page */}
        <Outlet context={{ session, profile }} />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;