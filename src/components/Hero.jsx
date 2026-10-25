import React from 'react';

const Hero = () => {
  return (
    <div id="page1" className="h-screen w-full relative flex flex-col items-center justify-center text-center text-white p-4">
      <video autoPlay loop muted playsInline preload="metadata" poster="/hero-poster.webp" src="/hero-video.mp4" className="absolute top-0 left-0 h-full w-full object-cover z-0"></video>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
      <div className="relative z-10 flex flex-col items-center justify-center">
      <h1 className="text-5xl md:text-8xl font-black">Experience Luxury, Redefined.</h1>
      <h2 className="text-2xl md:text-4xl font-bold mt-4 mb-6">WELCOME TO THE RUBY MANOR!</h2>
      <p className="text-lg md:text-xl font-medium w-full md:w-2/5">
        World-class hospitality, exquisite interiors and a refined ambiance.
      </p>
      </div>
    </div>

  );
};

export default Hero;