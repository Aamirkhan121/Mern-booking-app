// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const API_BASE_URL="http://localhost:4000"

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Assuming the userId is stored in localStorage
        const token = localStorage.getItem('token'); // Get the token for authenticated requests

        if (!userId || !token) {
          setError('User is not authenticated');
          setLoading(false);
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}` // Pass token in headers
          }
        };

        const response = await axios.get(`${API_BASE_URL}/api/profile/${userId}`, config);

        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching user details');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Profile</h2>

        {userData ? (
          <div>
            <p><strong>First Name:</strong> {userData.firstName}</p>
            <p><strong>Last Name:</strong> {userData.lastName}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Verified:</strong> {userData.isVerified ? 'Yes' : 'No'}</p>
            <p><strong>isAdmin:</strong> {userData.isAdmin ? 'Yes' : 'No'}</p>
            <button  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition ease-in-out duration-150"><Link to={"/profileupdate"}>Update</Link></button>
          </div>
        ):(
          <p>No user data available</p>
        )}
      </div>
    </div>
  );
};

export default Profile;

