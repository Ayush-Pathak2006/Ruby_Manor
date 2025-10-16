// src/pages/SetupProfile.jsx
import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useNavigate } from 'react-router-dom';

const SetupProfile = ({ session }) => {
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleProfileSetup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { user } = session;
    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      full_name: fullName,
      updated_at: new Date(),
    });

    if (error) {
      alert(error.message);
    } else {
      // Redirect to home page after setup is complete
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center p-10 bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-white text-4xl font-bold mb-6">Welcome to The Ruby Manor!</h1>
        <p className="text-gray-300 mb-8">Let's get your profile set up.</p>
        <form onSubmit={handleProfileSetup}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-left text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded transition-colors duration-300">
            {loading ? 'Saving...' : 'Complete Setup'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetupProfile;