// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// NEW: Import the main Layout component
import Layout from './components/Layout';
import DiningDetailPage from './pages/DiningDetailPage';
// Import Pages
import HomePage from './pages/HomePage';
import RoomDetailPage from './pages/RoomDetailPage';
import LoginPage from './pages/LoginPage';
import SetupProfile from './pages/SetupProfile';
import PaymentPage from './pages/PaymentPage';
import MyBookingsPage from './pages/MyBookingsPage';
import ContactUsPage from './pages/ContactUsPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';

function App() {
  return (
    <Routes>
      {/* CHANGED: All pages are now children of the Layout route. */}
      {/* This provides a consistent Navbar and Footer for your entire app. */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/rooms/:id" element={<RoomDetailPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* NEW: Added the route for the profile setup page */}
        <Route path="/dining/:id" element={<DiningDetailPage />} />
        <Route path="/setup-profile" element={<SetupProfile />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/terms" element={<TermsAndConditionsPage />} />
      </Route>
    </Routes>
  );
}

export default App;