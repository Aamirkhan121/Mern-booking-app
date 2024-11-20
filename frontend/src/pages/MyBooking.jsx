import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { Divider, Tag } from 'antd';
import Swal from "sweetalert2"

const API_BASE_URL = "https://mern-booking-app-2ng3.onrender.com";

const MyBooking = () => {
  const[loading,setLoading]=useState()
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem('userId'); // Retrieve the logged-in user's ID

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Make a POST request to get bookings by user ID
        const response = await axios.post(`${API_BASE_URL}/api/getbookingsbyuserid`, { userId });
        setBookings(response.data); // Set the logged-in user's bookings to state
        setLoading(false)
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (userId) {
      fetchBookings();
    }
  }, [userId]);

  const handleCancelBooking = async (bookingid, roomid) => {
    try {
      setLoading(true)
    const result =await axios.post(`${API_BASE_URL}/api/cancelbooking`, { bookingid, roomid });
      console.log(result)
      // Update the booking status to "Cancelled" in the UI
      setBookings((prevBookings) => 
        prevBookings.map((booking) => 
          booking._id === bookingid ? { ...booking, status: "cancelled" } : booking
        )
      );
      setLoading(false)
      
      Swal.fire("Booking cancelled successfully").then(result=>{window.location.reload()});
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel booking. Please try again.");
      setLoading(false)
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-8 lg:px-16">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">My Bookings</h1>
      {loading && (<Loader/>)}
      {bookings.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-lg font-semibold text-gray-800"> {booking.room.name}</p>
              <p className="text-lg text-gray-600"><strong>BookingId</strong> {booking._id}</p>
              <p className="text-gray-600"><strong>CheckIn:</strong> {new Date(booking.fromDate).toLocaleDateString()}</p>
              <p className="text-gray-600"><strong>CheckOut:</strong> {new Date(booking.toDate).toLocaleDateString()}</p>
              <p className="text-gray-600"><strong>Transaction ID:</strong> {booking.transactionId}</p>
              <p className="text-gray-800 font-bold"><strong>Total Amount:</strong> ₹{booking.totalAmount}</p>
              <p className={`font-bold `}>
                <strong>Status:</strong> {booking.status =='cancelled'?( <Tag color="red">Cancelled</Tag>) :<Tag color="green">Confirmed</Tag> }
              </p>
              {booking.status === 'booked' && (
                <button
                  onClick={() => handleCancelBooking(booking._id,booking.room._id)}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">No bookings found.</p>
      )}
    </div>
  );
};

export default MyBooking;
