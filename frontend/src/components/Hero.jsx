import React from 'react';

const Hero = () => {
  return (
    <div className="z-99 bg-blue-800 py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-3xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
          Find your next stay
        </h1>
        <p className="text-lg md:text-2xl lg:text-3xl text-white font-semibold">
          Search low prices on hotels for your dream vacation...
        </p>
      </div>
    </div>
  );
};

export default Hero;
