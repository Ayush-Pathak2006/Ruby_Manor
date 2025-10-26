import React from 'react';

const Scroller = () => {
  return (
    <div id="scroller" className="w-full text-center py-12 bg-black">
      <h4 
        className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-transparent 
                   [--tw-stroke-color:theme(colors.red.500)] [-webkit-text-stroke:2px_var(--tw-stroke-color)] 
                   transition-colors duration-300 ease-in-out 
                   hover:text-red-500 active:text-red-500 cursor-default"
      >
        Welcome to The Ruby Manor!
      </h4>
    </div>
  );
};

export default Scroller;