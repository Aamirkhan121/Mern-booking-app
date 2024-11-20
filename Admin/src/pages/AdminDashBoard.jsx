import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
const API_BASE_URL="http://localhost:4000"

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalBookings: 0,
    newBookingsToday: 0, // Static value or fetch from backend if needed
    totalUsers: 0 
  });

  useEffect(() => {
    // Fetch total bookings from the backend
    const fetchTotalBookings = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/admin/total/booking`);
        setMetrics(prevMetrics => ({
          ...prevMetrics,
          totalBookings: response.data.totalBookings
        }));
      } catch (error) {
        console.error('Error fetching total bookings:', error);
      }
    };

    fetchTotalBookings();
  }, []);
  useEffect(()=>{
    const fetchTotalUsers=async()=>{
      try {
        const response=await axios.get(`${API_BASE_URL}/api/admin/total/user`);
        // console.log(response.data)
        setMetrics(prevMetrics=>({
          ...prevMetrics,
          totalUsers:response.data.totalUsers
        }))
      } catch (error) {
        console.log("Error fetching total users:",error)
      }
    }
    fetchTotalUsers()
  },[])

  useEffect(()=>{
    const fetchNewBookingToday=async()=>{
      try {
        const response=await axios.get(`${API_BASE_URL}/api/admin/new/bookingtoday`);
        console.log(response.data)
        setMetrics(prevMetrics=>({
          ...prevMetrics,
          newBookingsToday:response.data.newBookingsToday
        }))
      } catch (error) {
        console.log("Error fetching New Booking Today")
      }
    }
    fetchNewBookingToday()
  },[])

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metrics Cards */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold mb-2">Total Bookings</h3>
          <p className="text-3xl font-semibold">{metrics.totalBookings}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold mb-2">New Bookings Today</h3>
          <p className="text-3xl font-semibold">{metrics.newBookingsToday}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold mb-2">Total Users</h3>
          <p className="text-3xl font-semibold">{metrics.totalUsers}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="/admin/booking" className="bg-blue-600 text-white p-4 rounded-lg text-center shadow-lg">
            <h4 className="text-lg font-bold">View All Bookings</h4>
            <p>Check the list of all bookings.</p>
          </a>

          <a href="/admin/users" className="bg-blue-600 text-white p-4 rounded-lg text-center shadow-lg">
            <h4 className="text-lg font-bold">Manage Users</h4>
            <p>View and manage user accounts.</p>
          </a>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;

