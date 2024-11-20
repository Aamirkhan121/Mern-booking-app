// src/pages/ReportPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout'; // Assuming you're using AdminLayout for page layout

const ReportPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch booking data when the component mounts
    const fetchBookingData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/admin/booking'); // Update API endpoint accordingly
        console.log(response.data)
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching report data');
        setLoading(false);
      }
    };

    fetchBookingData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Booking Report</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Check-In Date</th>
                <th className="px-4 py-2 border">Check-Out Date</th>
                <th className="px-4 py-2 border">Guests</th>
                <th className="px-4 py-2 border">Room Type</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{booking.user?.name || 'N/A'}</td>
                  <td className="px-4 py-2 border">{booking.user?.email || 'N/A'}</td>
                  <td className="px-4 py-2 border">
                    {new Date(booking.fromDate).toLocaleDateString() || 'N/A'}
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(booking.toDate).toLocaleDateString() || 'N/A'}
                  </td>
                  <td className="px-4 py-2 border">{booking.room?.maxcount || 'N/A'}</td>
                  <td className="px-4 py-2 border">{booking.room?.type || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ReportPage;
