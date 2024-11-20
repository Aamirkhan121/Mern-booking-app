import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
const API_BASE_URL = "http://localhost:4000";

const SignUp = () => {
  // Single useState for all form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate=useNavigate()

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    
    
    // const { firstName,lastName, email, password} = formData;
    try {
      const response=await axios.post(`${API_BASE_URL}/api/register`,formData)
      console.log(response.data.message);
      // Logic to handle sign-up
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      })
      console.log(setFormData)
    } catch (error) {
      if (error.response) {
        // Server response with an error
        setError(error.response.data.message);
      } else {
        // Other errors
        setError('Error registering user');
      }
    }
    setTimeout(() => {
      navigate("/verifyemail")
      
    }, 2000);
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* First Name Field */}
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="firstName">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
  
          {/* Last Name Field */}
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
  
        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
  
        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
  
        {/* Sign Up Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
            Sign Up
          </button>
          <div className="mt-4 text-center">
            <Link to="/sign-in" className="text-blue-600 hover:underline">
              You have an account? Sign In
            </Link>
          </div>
        </div>
      </form>
    </div>
  </div>
  
  );
}

export default SignUp;

