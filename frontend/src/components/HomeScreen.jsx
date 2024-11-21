import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';


const HomeScreen = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null); // To manage the modal visibility

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://mern-booking-app-2ng3.onrender.com/api/getAllRooms');
        console.log(response.data.rooms)
        setRooms(response.data.rooms);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const openModal = (room) => {
    setSelectedRoom(room);
  };

  const closeModal = () => {
    setSelectedRoom(null);
  };

  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-6">Rooms Available</h1>
    <div className="space-y-6">
      {rooms.length === 0 ? (
        <p>No rooms available</p>
      ) : (
        rooms.map((room) => (
          <div
            key={room._id}
            className="border p-4 rounded-lg shadow-md flex flex-col md:flex-row items-start md:space-x-4 space-y-4 md:space-y-0"
          >
            {/* Display one image */}
            <img
              src={room.imageurls[0]}
              alt={room.name}
              className="w-full md:w-48 h-48 object-cover rounded-lg"
            />

            {/* Room details and "View" button */}
            <div className="flex-1">
              <h2 className="text-lg md:text-xl font-semibold mb-2">Type: {room.name}</h2>

              {/* Max count and phone number on separate lines */}
              <div className="mb-2">
                <strong className="text-gray-700 block">Max-Count: {room.maxcount}</strong>
                <strong className="text-gray-700 block">Phone-Number: {room.phonenumber}</strong>
              </div>

              {/* Description on a separate line */}
              <strong className="text-gray-700 block mb-2">{room.description}</strong>

              {/* Price per day on a separate line */}
              <strong className="text-green-500 font-bold block mb-4">Price per day: ₹{room.rentperday}</strong>

              {/* Align the View and Book Now buttons */}
              <div className="flex justify-end">
                <Link to={`/book/${room._id}`}>
                  <button className="bg-blue-500 text-white mr-5 px-4 py-2 rounded-lg hover:bg-blue-600">
                    Book Now
                  </button>
                </Link>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  onClick={() => openModal(room)}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>

    {/* Modal for viewing all images */}
    {selectedRoom && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-3xl w-11/12 relative">
          <button
            className="absolute top-2 right-2 text-black text-xl"
            onClick={closeModal}
          >
            &times;
          </button>
          <h2 className="text-lg md:text-xl font-bold mb-4">{selectedRoom.name}</h2>

          {/* Container for images with horizontal scrolling */}
          <div className="overflow-x-auto flex space-x-4 snap-x snap-mandatory w-full">
            {selectedRoom.imageurls.map((url, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full h-full snap-center"
                style={{ minWidth: '100%' }} // Ensures only one image is visible at a time
              >
                <img
                  src={url}
                  alt={selectedRoom.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

export default HomeScreen;



