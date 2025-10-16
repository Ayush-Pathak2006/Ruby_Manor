import React from 'react';

const Scroller = () => {
  return (
    // Add "flex" to this container to align the children horizontally
    <div id="scroller" className="w-full overflow-hidden whitespace-nowrap py-8 bg-black-900 flex">
      {/* We duplicate the text to create a seamless loop */}
      <div className="inline-block animate-scroll">
        <h4 
          className="inline-block text-6xl md:text-8xl font-extrabold mr-5 text-transparent 
          [--tw-stroke-color:theme(colors.red.500)] [-webkit-text-stroke:2px_var(--tw-stroke-color)]"
        >
          Welcome to The Ruby Manor
        </h4>
        <h4 
          className="inline-block text-6xl md:text-8xl font-extrabold mr-5 text-transparent 
          [--tw-stroke-color:theme(colors.red.500)] [-webkit-text-stroke:2px_var(--tw-stroke-color)]"
        >
          – Where Elegance Meets Comfort!
        </h4>
      </div>
      <div className="inline-block animate-scroll">
        <h4 
          className="inline-block text-6xl md:text-8xl font-extrabold mr-5 text-transparent 
          [--tw-stroke-color:theme(colors.red.500)] [-webkit-text-stroke:2px_var(--tw-stroke-color)]"
        >
          Welcome to The Ruby Manor
        </h4>
        <h4 
          className="inline-block text-6xl md:text-8xl font-extrabold mr-5 text-transparent 
          [--tw-stroke-color:theme(colors.red.500)] [-webkit-text-stroke:2px_var(--tw-stroke-color)]"
        >
          – Where Elegance Meets Comfort!
        </h4>
      </div>
    </div>
  );
};

export default Scroller;