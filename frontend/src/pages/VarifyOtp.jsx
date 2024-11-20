import React, { useState } from 'react';
import axios from 'axios';
const API_BASE_URL="https://mern-booking-app-2ng3.onrender.com"

const OTPVerification = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/verify-otp`, { email, otp });
      setMessage(response.data.message);
    } catch (error) {
      setError(error.response?.data?.message || 'Error verifying OTP');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='bg-white p-8 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold mb-6'>Verify Your Account</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='border p-2 mb-4 w-full'
        />
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className='border p-2 mb-4 w-full'
        />
        <button onClick={handleVerifyOtp} className='bg-blue-500 text-white px-4 py-2 rounded'>
          Verify OTP
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}
        {message && <p className="text-green-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default OTPVerification;
