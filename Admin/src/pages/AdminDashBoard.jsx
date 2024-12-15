import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
const API_BASE_URL = "https://mern-booking-app-2ng3.onrender.com";

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalBookings: 0,
    newBookingsToday: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const totalBookingsRes = await axios.get(`${API_BASE_URL}/api/admin/total/booking`);
        const totalUsersRes = await axios.get(`${API_BASE_URL}/api/admin/total/user`);
        const newBookingsTodayRes = await axios.get(`${API_BASE_URL}/api/admin/new/bookingtoday`);

        setMetrics({
          totalBookings: totalBookingsRes.data.totalBookings || 0,
          totalUsers: totalUsersRes.data.totalUsers || 0,
          newBookingsToday: newBookingsTodayRes.data.newBookingsToday || 0,
        });
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">Admin Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Metrics Cards */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-lg md:text-xl font-bold mb-2">Total Bookings</h3>
          <p className="text-3xl font-semibold">{metrics.totalBookings}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-lg md:text-xl font-bold mb-2">New Bookings Today</h3>
          <p className="text-3xl font-semibold">{metrics.newBookingsToday}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-lg md:text-xl font-bold mb-2">Total Users</h3>
          <p className="text-3xl font-semibold">{metrics.totalUsers}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl md:text-2xl font-bold mb-4 text-center md:text-left">Quick Links</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="/admin/booking"
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg text-center shadow-lg transition duration-300"
          >
            <h4 className="text-lg md:text-xl font-bold">View All Bookings</h4>
            <p>Check the list of all bookings.</p>
          </a>

          <a
            href="/admin/users"
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg text-center shadow-lg transition duration-300"
          >
            <h4 className="text-lg md:text-xl font-bold">Manage Users</h4>
            <p>View and manage user accounts.</p>
          </a>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
