import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import Swal from "sweetalert2"

const BookingScreen = () => {
  const { roomid } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [totalDays, setTotalDays] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  
  const user = {
    name: localStorage.getItem('firstName'),
    email: localStorage.getItem('email'),
    userId: localStorage.getItem('userId')
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const response = await axios.post(`http://localhost:4000/api/getRoomById/${roomid}`);
        setRoom(response.data.room);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomid]);

  useEffect(() => {
    if (room && fromDate && toDate) {
      const days = moment(toDate).diff(moment(fromDate), 'days') + 1;
      setTotalDays(days);
      setTotalAmount(days * room.rentperday);
    }
  }, [room, fromDate, toDate]);

  async function onToken(token) {
    try {
      // Step 1: Check room availability before booking
      const availabilityResponse = await axios.post('http://localhost:4000/api/rooms/check-availability', {
        roomId: roomid,
        fromDate,
        toDate,
      });

      if (!availabilityResponse.data.isAvailable) {
        // Format the booked dates for display
        const bookedDates = availabilityResponse.data.bookedDates
          .map(dateRange => {
            const from = moment(dateRange.fromDate).format('YYYY-MM-DD');
            const to = moment(dateRange.toDate).format('YYYY-MM-DD');
            return `${from} to ${to}`;
          })
          .join(', ');

        // Display alert with exact dates
        alert(`This room is already booked for the following dates: ${bookedDates}`);
        return;
      }

      // Step 2: Proceed with booking if available
      const transactionId = token.id; // Use Stripe token ID as transactionId
      const bookingData = {
        room,
        user: {
          name: user.name,
          email: user.email,
          userid: user.userId
        },
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
        totalDays,
        totalAmount,
        transactionId,
        token,
      };
setLoading(true)
      await axios.post('http://localhost:4000/api/booking', bookingData);
      setLoading(false)
      Swal.fire("Congratulation","Your Room Booked successful!").then(result=>{
        window.location.href="/my-booking"
      });
    } catch (error) {
      console.error('Error during booking:', error.message);
      setLoading(false)
      Swal.fire("Oops","Failed to create booking.");
    }
  }

  if (loading) return <h1 className="text-2xl text-blue-500">Loading...</h1>;
  if (error) return <h1 className="text-2xl text-red-500">Error: {error}</h1>;
  if (!room) return <h1 className="text-2xl text-gray-500">No room found</h1>;

  return (
    <div className="container mx-auto mt-2 px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{room.name}</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex">
          <div className="w-1/2">
            <img src={room.imageurls[0]} alt={room.name} className="rounded-lg object-cover w-full h-80" />
          </div>
          <div className="w-1/2 pl-8">
            <h2 className="text-2xl font-semibold mb-4">Room ID: {roomid}</h2>
            <div className='text-right'>
              <b>
                <h1>Booking Details</h1>
                <hr />
                <p>Name: {user.name}</p>
                <p>From Date: <input type="date" onChange={(e) => setFromDate(e.target.value)} /></p>
                <p>To Date: <input type="date" onChange={(e) => setToDate(e.target.value)} /></p>
                <p>Max Count: {room.maxcount}</p>
              </b>
            </div>
            <div className='text-right'>
              <b>
                <h1>Amount</h1>
                <hr />
                <p>Total Days: {totalDays}</p>
                <p>Rent per Day: ₹{room.rentperday}</p>
                <p>Total Amount: ₹{totalAmount}</p>
              </b>
            </div>
            <div className='mt-2' style={{ float: 'right' }}>
              <StripeCheckout
                amount={totalAmount * 100} // Stripe expects amount in cents
                token={onToken} // Pass `onToken` directly to get the token object
                currency='INR'
                stripeKey="pk_test_51PMNeMP6OUGBeMBlaj9WphMUxWRr2QtPC5EYCGLgLTq3bbshjRqcvnvHYpy3gFcyk7fdSxN8MSRMzhAjW9Jez6qH00HldOHOz7"
              >
                <button className="bg-blue-500 text-white mr-5 px-4 py-2 rounded-lg hover:bg-blue-600">
                  Pay Now
                </button>
              </StripeCheckout>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingScreen;
