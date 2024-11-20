import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
import '../pages/style.css'; // Import the CSS file here

const API_BASE_URL="http://localhost:4000"

const GetAllBookingData = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch bookings from the backend
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/admin/booking`);
        console.log(response.data)
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <AdminLayout>
    <h2 className="text-2xl text-center font-bold mb-6 animated-border">Admin: Booking List</h2>
    <div className="overflow-x-auto">
      <table className=" table-auto w-full border-collapse border border-gray-200">
        <thead className='animated-border'>
          <tr className="bg-gray-100 ">
            <th className="border animated-border px-4 py-2">Booking ID</th>
            <th className="border animated-border px-4 py-2">Room Name</th>
            <th className="border animated-border px-4 py-2">Email</th>
            <th className="border animated-border px-4 py-2">Type</th>
            <th className="border animated-border px-4 py-2">Rent Per Day</th>
            <th className="border animated-border px-4 py-2">Max Count</th>
            <th className="border animated-border px-4 py-2">Phone Number</th>
          </tr>
        </thead>
        <tbody className='animated-border'>
          {bookings.map((booking) => (
            <tr key={booking._id} className="hover:bg-gray-50 animated-border">
              <td className="border animated-border px-4 py-2">{booking._id}</td>
              <td className="border animated-border px-4 py-2">{booking.room?.name || 'N/A'}</td>
              <td className="border animated-border px-4 py-2">{booking.user?.email || 'N/A'}</td>
              <td className="border animated-border px-4 py-2">{booking.room?.type || 'N/A'}</td>
              <td className="border animated-border px-4 py-2">{booking.room?.rentperday || 'N/A'}</td>
              <td className="border animated-border px-4 py-2">{booking.room?.maxcount || 'N/A'}</td>
              <td className="border animated-border px-4 py-2">{booking.room?.phonenumber || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </AdminLayout>
  );
};

export default GetAllBookingData;


