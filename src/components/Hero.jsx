import React from 'react';

const Hero = () => {
  return (
    <div id="page1" className="h-screen w-full relative flex flex-col items-center justify-center text-center text-white p-4">
      <video autoPlay loop muted src="/resturant video.mp4" className="absolute top-0 left-0 h-full w-full object-cover z-0 brightness-[1.1]"></video>
      <div className="relative z-10 flex flex-col items-center justify-center">
      <h1 className="text-5xl md:text-8xl font-black relative"
      data-text="Experience Luxury, Redefined.">Experience Luxury, Redefined.</h1>
      <h2 className="text-2xl md:text-4xl font-bold mt-4 mb-6">WELCOME TO THE RUBY MANOR!</h2>
      <p className="text-lg md:text-xl font-medium w-full md:w-2/5">
        Experience the perfect blend of luxury and warmth at The Ruby Manor. Nestled in sophistication, our hotel offers world-class hospitality, exquisite interiors, and a refined ambiance.
      </p>
      </div>
    </div>

  );
};

export default Hero;