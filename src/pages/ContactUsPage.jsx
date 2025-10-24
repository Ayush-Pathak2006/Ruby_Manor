// src/pages/ContactUsPage.jsx

import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom'; // To get session data
import { supabase } from '../services/supabaseClient';

const ContactUsPage = () => {
  // Get session from the Layout component via Outlet context
  const { session } = useOutletContext();
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(''); // To show success/error

  // Pre-fill the email if the user is logged in
  useEffect(() => {
    if (session?.user?.email) {
      setEmail(session.user.email);
    } else {
      setEmail(''); // Clear if logged out
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Only allow submission if logged in (as per requirement)
    if (!session?.user) {
      setStatusMessage('Please log in to send feedback.');
      return;
    }
    setLoading(true);
    setStatusMessage(''); // Clear previous messages

    try {
      const { error } = await supabase.from('feedback').insert({
        user_id: session.user.id,
        user_email: session.user.email,
        message: message,
      });

      if (error) throw error;

      setStatusMessage('Thank you! Your feedback has been sent.');
      setMessage(''); // Clear the message box on success
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setStatusMessage('Sorry, there was an error sending your feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 pt-28 pb-12">
      <div className="p-10 bg-gray-800 rounded-lg shadow-xl w-full max-w-lg">
        <h1 className="text-white text-4xl font-bold mb-6 text-center">Contact Us</h1>
        <p className="text-gray-300 mb-8 text-center">We'd love to hear from you. Share your thoughts below.</p>
        
        <form onSubmit={handleSubmit}>
          {/* Email Field (Read-only if logged in) */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">Your Email</label>
            <input
              type="email"
              id="email"
              value={email}
              // Make it read-only and visually disabled if logged in
              readOnly={!!session} 
              disabled={!!session}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
              placeholder={session ? '' : "Please log in to submit feedback"}
            />
          </div>

          {/* Message Textarea */}
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium mb-1">Share Your View</label>
            <textarea
              id="message"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your message here..."
              required
              // Disable textarea if not logged in
              disabled={!session} 
            ></textarea>
          </div>

          {/* Status Message Display */}
          {statusMessage && (
            <p className={`mb-4 text-center ${statusMessage.includes('error') ? 'text-red-400' : 'text-green-400'}`}>
              {statusMessage}
            </p>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading || !session} // Disable if loading or not logged in
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Submit Feedback'}
          </button>
          
          {/* Prompt to log in if not logged in */}
          {!session && (
            <p className="text-center text-gray-400 mt-4 text-sm">
              You need to be logged in to send feedback.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactUsPage;