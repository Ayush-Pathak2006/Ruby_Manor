import React from 'react';


const AboutUs = () => {
  return (
    <div id="about-us" className="w-full flex flex-col md:flex-row items-center justify-around py-16 px-8 gap-8 bg-black-900 text-white">
      <img src="/hotel view.avif" alt="Hotel interior" className="h-[220px] w-[220px] rounded-2xl object-cover" />
      <div className="md:w-1/2 text-center">
        <h3 className="text-5xl font-extrabold mb-8">ABOUT US</h3>
        <p className="text-xl leading-relaxed">
          Welcome to The Ruby Manor, where luxury meets comfort in the most elegant way. Nestled in the heart of the city, our hotel offers a perfect blend of modern sophistication and warm hospitality.
        </p>
      </div>
      <img src="/hotelfood.avif" alt="Hotel amenity" className="h-[220px] w-[220px] rounded-2xl object-cover" />
    </div>
  );
};

export default AboutUs;