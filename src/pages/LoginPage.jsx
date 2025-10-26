import React from 'react';
import { supabase } from '../services/supabaseClient';


const LoginPage = () => {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Error logging in with Google:', error);
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center p-10 bg-gray-800 rounded-lg shadow-xl">
          <h1 className="text-white text-4xl font-bold mb-6">Login / Register</h1>
          <p className="text-gray-300 mb-8">Join The Ruby Manor with your favorite provider.</p>
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-bold py-3 px-6 rounded-lg transition-transform duration-300 hover:scale-105"
          >
            Sign In with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;