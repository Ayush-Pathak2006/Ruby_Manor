import React from 'react';

const ImageCarousel = ({ room }) => {
  return (
    <section className="h-[60vh] bg-gray-800">
      <div
        className="h-full w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${room.image_url})` }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-end p-12">
          <h1 className="text-white text-6xl font-black">{room.room_type}</h1>
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;