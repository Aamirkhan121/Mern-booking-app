import React from 'react';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Find Your Perfect Stay</h1>
          <p className="text-lg md:text-2xl mb-8">Search for hotels, resorts, and more!</p>
          {/* Search Bar with Button */}
          <div className="flex flex-col sm:flex-row max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search for hotels, destinations, or landmarks"
              className="flex-grow px-4 py-2 rounded-t-lg sm:rounded-t-none sm:rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-b-lg sm:rounded-b-none sm:rounded-r-lg font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className='py-16'>
  <div className='container mx-auto px-4 text-center'>
    <h2 className='text-3xl font-bold mb-8'>Featured Hotels</h2>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
      {/* Hotel Card 1 */}
      <div className='bg-white p-4 rounded-lg shadow-lg'>
        <img src='/hotel_images/pexels-pixabay-258154.jpg' alt='Hotel' className='w-full h-48 object-cover rounded-lg mb-4'/>
        <h3 className='text-xl font-semibold mb-2'>Hotel Name 1</h3>
        <p className='text-gray-600'>Location</p>
        <p className='text-blue-600 font-bold mt-2'>$100 per night</p>
      </div>
      {/* Hotel Card 2 */}
      <div className='bg-white p-4 rounded-lg shadow-lg'>
        <img src='/hotel_images/pexels-pixabay-261101.jpg' alt='Hotel' className='w-full h-48 object-cover rounded-lg mb-4'/>
        <h3 className='text-xl font-semibold mb-2'>Hotel Name 2</h3>
        <p className='text-gray-600'>Location</p>
        <p className='text-blue-600 font-bold mt-2'>$150 per night</p>
      </div>
      {/* Hotel Card 3 */}
      <div className='bg-white p-4 rounded-lg shadow-lg'>
        <img src='/hotel_images/pexels-vecislavas-popa-1743229.jpg' alt='Hotel' className='w-full h-48 object-cover rounded-lg mb-4'/>
        <h3 className='text-xl font-semibold mb-2'>Hotel Name 3</h3>
        <p className='text-gray-600'>Location</p>
        <p className='text-blue-600 font-bold mt-2'>$200 per night</p>
      </div>

      <div className='bg-white p-4 rounded-lg shadow-lg'>
        <img src='/hotel_images/pexels-fazyl-nalgiev-1230771.jpg' alt='Hotel' className='w-full h-48 object-cover rounded-lg mb-4'/>
        <h3 className='text-xl font-semibold mb-2'>Hotel Name 4</h3>
        <p className='text-gray-600'>Location</p>
        <p className='text-blue-600 font-bold mt-2'>$200 per night</p>
      </div>

      <div className='bg-white p-4 rounded-lg shadow-lg'>
        <img src='/hotel_images/pexels-jimmy-chan-1458457.jpg' alt='Hotel' className='w-full h-48 object-cover rounded-lg mb-4'/>
        <h3 className='text-xl font-semibold mb-2'>Hotel Name 5</h3>
        <p className='text-gray-600'>Location</p>
        <p className='text-blue-600 font-bold mt-2'>$200 per night</p>
      </div>

      <div className='bg-white p-4 rounded-lg shadow-lg'>
        <img src='/hotel_images/pexels-salma-smida-1375383.jpg' alt='Hotel' className='w-full h-48 object-cover rounded-lg mb-4'/>
        <h3 className='text-xl font-semibold mb-2'>Hotel Name 6</h3>
        <p className='text-gray-600'>Location</p>
        <p className='text-blue-600 font-bold mt-2'>$200 per night</p>
      </div>
    </div>
  </div>
</section>


      {/* Call to Action */}
      <section className="bg-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Book Your Stay?</h2>
          <p className="text-lg md:text-xl mb-8">
            Explore our wide range of options and book your perfect hotel now!
          </p>
          <a
            href="/homescreen"
            className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg font-bold hover:bg-blue-700 transition duration-150"
          >
            Book Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;



