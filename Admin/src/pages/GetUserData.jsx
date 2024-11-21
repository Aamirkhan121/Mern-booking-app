import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
import '../pages/style.css' // Create a separate CSS file for custom styles

const GetUserData = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the backend
    const fetchusers = async () => {
      try {
        const response = await axios.get('https://mern-booking-app-2ng3.onrender.com/api/admin/getUser');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchusers();
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-2xl  text-center font-bold mb-6 animated-border">Admin: User List</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {users.map(booking => (
          <div key={booking._id} className="bg-white p-4 rounded-lg shadow-lg animated-border">
            <div className="flex flex-col">
              <h3 className="text-lg font-bold mb-2">User Details</h3>

              <div className="mb-2">
                <strong className="block text-gray-700">FirstName:</strong>
                <span>{booking.firstName}</span>
              </div>

              <div className="mb-2">
                <strong className="block text-gray-700">LastName:</strong>
                <span>{booking.lastName}</span>
              </div>

              <div className="mb-2">
                <strong className="block text-gray-700">Email:</strong>
                <span>{booking.email}</span>
              </div>

              <div className="mb-2">
                <strong className="block text-gray-700">isVerified:</strong>
                <span>{booking.isVerified ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default GetUserData;

