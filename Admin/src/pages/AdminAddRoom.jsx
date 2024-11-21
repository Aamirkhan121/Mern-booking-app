import React, { useState } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';

const AdminAddRoom = () => {
  const [roomData, setRoomData] = useState({
    name: '',
    maxcount: '',
    phonenumber: '',
    rentperday: '',
    imageurls: [''],
    type: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Update the roomData object when any input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prevRoomData) => ({
      ...prevRoomData,
      [name]: name === 'imageurls' ? value.split(',') : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('https://mern-booking-app-2ng3.onrender.com/api/admin/addroom', roomData);
      setLoading(false);
      setSuccess(true);
      setRoomData({
        name: '',
        maxcount: '',
        phonenumber: '',
        rentperday: '',
        imageurls: [''],
        type: '',
        description: '',
      })
      console.log('Room added successfully', response.data);
    } catch (err) {
      setLoading(false);
      setError('Failed to add room');
      console.log(err.message);
    }
  };

  return (
    <AdminLayout>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Add New Room</h1>

      {success && <div className="text-green-500">Room added successfully!</div>}
      {error && <div className="text-red-500">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Room Name</label>
          <input
            type="text"
            name="name"
            value={roomData.name}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Max Count</label>
          <input
            type="number"
            name="maxcount"
            value={roomData.maxcount}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phonenumber"
            value={roomData.phonenumber}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Rent Per Day</label>
          <input
            type="number"
            name="rentperday"
            value={roomData.rentperday}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Type</label>
          <input
            type="text"
            name="type"
            value={roomData.type}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={roomData.description}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Image URLs (Comma Separated)</label>
          <input
            type="text"
            name="imageurls"
            value={roomData.imageurls.join(',')}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? 'Adding Room...' : 'Add Room'}
        </button>
      </form>
    </div>
    </AdminLayout>
  );
};

export default AdminAddRoom;

