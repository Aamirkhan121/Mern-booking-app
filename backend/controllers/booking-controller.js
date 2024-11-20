import Booking from "../models/booking-models.js";
// getAllBookingData from mongoDb

export const getAllBookingData=async(req,res)=>{
    try {
        const booking=await Booking.find()
        res.status(200).json(booking)
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving bookings', error }); 
    }
}

// number of data display from mongoDb

export const getTotalBookings=async(req,res)=>{
    try {
        const count=await Booking.countDocuments()
            res.json({totalBookings:count})
    } catch (error) {
        res.status(500).json({ message: 'Error fetching total bookings', error });
    }
}


// booking-controller.js
export const getUserBookings = async (req, res) => {
    const userId = req.userId; // assuming you have middleware to set req.userId from the JWT
  
    try {
      const bookings = await Booking.find({ user: userId });
      res.status(200).json({ success: true, bookings });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to retrieve bookings.' });
    }
  };
  