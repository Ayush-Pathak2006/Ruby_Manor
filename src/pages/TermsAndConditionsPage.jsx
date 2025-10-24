// src/pages/TermsAndConditionsPage.jsx

import React from 'react';

const TermsAndConditionsPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white pt-36 pb-12 px-4 md:px-12">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-5xl font-bold mb-8 border-b border-gray-700 pb-4">Terms and Conditions</h1>
        
        {/* Introduction */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-red-400 mb-4">1. Introduction</h2>
          <p className="text-gray-300 leading-relaxed">
            Welcome to The Ruby Manor. These terms and conditions outline the rules and regulations for the use of The Ruby Manor's Website, located at [Your Website URL]. By accessing this website, we assume you accept these terms and conditions. Do not continue to use The Ruby Manor if you do not agree to take all of the terms and conditions stated on this page.
          </p>
        </section>

        {/* Bookings and Payments */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-red-400 mb-4">2. Bookings and Payments</h2>
          <p className="text-gray-300 leading-relaxed mb-2">
            All bookings are subject to availability and confirmation. Payment must be made at the time of booking or upon arrival as specified during the booking process. We accept various payment methods, including UPI via the provided QR code.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Cancellation policies vary based on the rate booked. Please review the specific cancellation terms provided during your booking process. Failure to arrive on the scheduled check-in date without prior notification may result in cancellation of the entire booking and applicable charges.
          </p>
        </section>

        {/* Check-in and Check-out */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-red-400 mb-4">3. Check-in and Check-out</h2>
          <p className="text-gray-300 leading-relaxed">
            Standard check-in time is 3:00 PM IST and check-out time is 11:00 AM IST. Early check-in and late check-out requests are subject to availability and may incur additional charges. Valid government-issued photo identification and a credit card may be required upon check-in.
          </p>
        </section>
        
        {/* Guest Conduct */}
        <section className="mb-8">
           <h2 className="text-3xl font-semibold text-red-400 mb-4">4. Guest Conduct</h2>
           <p className="text-gray-300 leading-relaxed">
               Guests are expected to conduct themselves in an orderly and acceptable manner and not to disrupt the enjoyment of other guests. We reserve the right to refuse accommodation or services or remove you and members of your party from the hotel if, in our reasonable opinion, we consider this provision to have been breached.
           </p>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-red-400 mb-4">5. Limitation of Liability</h2>
          <p className="text-gray-300 leading-relaxed">
            The hotel is not responsible for the loss or damage of any personal belongings. While we strive to ensure the safety and security of our guests, valuables should be secured appropriately.
          </p>
        </section>

        {/* Changes to Terms */}
        <section>
          <h2 className="text-3xl font-semibold text-red-400 mb-4">6. Changes to Terms</h2>
          <p className="text-gray-300 leading-relaxed">
            The Ruby Manor reserves the right to amend these terms and conditions at any time. Changes will be effective immediately upon posting on our website.
          </p>
        </section>

      </div>
    </div>
  );
};

export default TermsAndConditionsPage;