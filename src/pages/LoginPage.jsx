import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';

const LoginPage = () => {
  const [showIssuePopup, setShowIssuePopup] = useState(true);

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
      <div className="h-screen flex items-center justify-center bg-gray-900 px-4">
        <div className="text-center p-10 bg-gray-800 rounded-lg shadow-xl max-w-md w-full relative">
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

      {showIssuePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-lg rounded-xl border border-red-400/40 bg-red-950 p-6 text-left shadow-2xl">
            <h2 className="text-2xl font-bold text-red-100">Login Temporarily Unavailable</h2>
            <p className="mt-3 text-red-100/90">
              We are currently facing a Supabase service issue affecting login in India.
              Please try again later.
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowIssuePopup(false)}
                className="rounded-md bg-red-200 px-4 py-2 font-semibold text-red-900 hover:bg-red-100"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;