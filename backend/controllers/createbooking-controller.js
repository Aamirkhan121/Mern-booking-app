import Booking from "../models/createBooking-models.js";
import RoomModel from "../models/rooms-model.js";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config"; 



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// Controller function to create a new booking
export const createBooking = async (req, res) => {
  const { room, user, fromDate, toDate, totalDays, totalAmount, transactionId,token } = req.body;
  try {
    const customer =await stripe.customers.create({
      email:token.email,
      source:token.id
    })
    const payment=await stripe.charges.create(
      {
amount:totalAmount * 100,
customer:customer.id,
currency:"inr",
receipt_email:token.email
      },{
        idempotencyKey: uuidv4()
      }
    )
    if (payment) {
      try {
        // console.log("Booking data received:", req.body); // Log incoming data
        const newbooking = new Booking({
          room,
          user,  
          fromDate: new Date(fromDate),
          toDate: new Date(toDate),
          totalDays,
          totalAmount,
          transactionId,
        });
    
        const booking=await newbooking.save();
    
        const roomtemp= await RoomModel.findOne({_id:room._id})
        roomtemp.currentbooking.push({bookingid:booking._id,
          fromDate:new Date(fromDate),
          toDate:new Date(toDate),
        user,
        status:booking.status
        })
        // console.log(roomtemp)
        await roomtemp.save()
        res.status(201).json({ message: 'Booking created successfully', booking });
      } catch (error) {
        res.status(500).json({ message: 'Booking creation failed', error: error.message });
      }
    }
    res.send("Payment Successfully","Your Room is booked")
  } catch (error) {
    return res.status(400).json({error})
  }
 
 
};

export const checkRoomAvailability = async (req, res) => {
  const { roomId, fromDate, toDate } = req.body;

  try {
    // Find any overlapping bookings for the room
    const bookings = await Booking.find({
      "room._id": roomId,
      $or: [
        { fromDate: { $lte: new Date(toDate) }, toDate: { $gte: new Date(fromDate) } }
      ]
    });

    if (bookings.length > 0) {
      // Extract and filter out duplicate dates
      const bookedDates = bookings
        .map(booking => ({
          fromDate: booking.fromDate,
          toDate: booking.toDate
        }))
        .filter((date, index, self) =>
          index === self.findIndex(d => d.fromDate.getTime() === date.fromDate.getTime() && d.toDate.getTime() === date.toDate.getTime())
        );

      // Respond with booked status and unique conflicting dates
      res.json({ isAvailable: false, bookedDates });
    } else {
      res.json({ isAvailable: true });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error checking room availability', error: error.message });
  }
};


// Controller function to get bookings by user ID
export const getBookingsByUserId = async (req, res) => {
  const { userId } = req.body;

  try {
    // Find bookings where `user.userid` matches `userId` from the request body
    const bookings = await Booking.find({ "user.userid": userId });

    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for this user." });
    }

    res.status(200).json(bookings); // Return only the logged-in user's bookings
  } catch (error) {
    console.error("Error fetching bookings for user:", error);
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

//cancle booking

export const cancelBooking = async (req, res) => {
  const { bookingid, roomid } = req.body;

  try {
    // Find the booking by ID and update its status to "cancelled"
    const booking = await Booking.findOne({ _id: bookingid });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Update booking status to "cancelled"
    booking.status = "cancelled";  // Fixed typo here
    await booking.save();
    
    // Find the room and update the `currentbooking` array
    const room = await RoomModel.findOne({ _id: roomid }); // Fixed the query to use the room's `_id` directly
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Filter out the cancelled booking from `currentbooking`
    room.currentbooking = room.currentbooking.filter((b) => b.bookingid.toString() !== bookingid);
    await room.save();
   
    res.status(200).json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    res.status(500).json({ message: "Error cancelling booking", error: error.message });
  }
};
