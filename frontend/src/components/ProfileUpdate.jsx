import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const API_BASE_URL="http://localhost:4000"

const ProfileUpdate = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  
  const userId = localStorage.getItem('userId'); // Assuming you store userId in localStorage
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  const navigate = useNavigate(); // Hook to handle redirection

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}` // Include the token in the request header
          }
        });
        setFormData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
        });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error('Unauthorized: Please log in.');
        } else {
          toast.error('Error fetching user data.');
        }
      }
    };
    fetchUserData();
  }, [userId, token]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}` // Include the token in the update request
          }
        }
      );
      toast.success(response.data.message || 'Profile updated successfully');
      setLoading(false);

      // Optionally refetch the updated data to reflect immediately
      const updatedUser = await axios.get(`${API_BASE_URL}/api/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
 // Update localStorage with the new values
 const { firstName, lastName, email } = updatedUser.data;
 localStorage.setItem('firstName', firstName);
 localStorage.setItem('lastName', lastName);
 localStorage.setItem('email', email);

      setFormData({
        firstName: updatedUser.data.firstName,
        lastName: updatedUser.data.lastName,
        email: updatedUser.data.email,
      });
      navigate("/profile")
    } catch (error) {
      setLoading(false);
      toast.error('Error updating profile');
    }
  };


  // Handle user deletion
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        const response = await axios.delete(`${API_BASE_URL}/api/delete/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the delete request
          },
        });
        toast.success(response.data.message || 'Account deleted successfully');
        localStorage.removeItem('token'); // Clear local storage
        localStorage.removeItem('userId');
        localStorage.removeItem('expirationTime');
        navigate('/'); // Redirect to homepage after deletion
      } catch (error) {
        console.error("Error deleting account:", error);
        toast.error(error.response?.data?.message || "Error deleting account");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 shadow-lg rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-6">Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
      {/* Delete Account Section */}
      <div className="mt-6">
        <button
          onClick={handleDelete}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default ProfileUpdate;

