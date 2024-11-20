import Booking from "../models/createBooking-models.js";
import User from "../models/users-models.js";

export const GetUserData = async (req, res) => {
    
    try {
      const user = await User.find(); // Exclude password from the response
      if (user.length===0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user details', error });
    }
  };


  export const getAllBookingRooms=async(req,res)=>{
    try {
      const getAllBookingData=await Booking.find();
      res.status(200).json(getAllBookingData)
    } catch (error) {
      res.status(500).json({message:"Error fetching Booking-Rooms"})
    }
  }

  export const getTotalBookings=async(req,res)=>{
    try {
        const count=await Booking.countDocuments()
            res.json({totalBookings:count})
    } catch (error) {
        res.status(500).json({ message: 'Error fetching total bookings', error });
    }
}
export const getTotalUsers=async(req,res)=>{
  try {
    const count=await User.countDocuments();
    res.json({totalUsers:count})
  } catch (error) {
    res.status(500).json({message:"Error fetching total users",error})
  }
}

export const getNewBookingToday=async(req,res)=>{
  try {
    // Get the current date and reset to midnight
    const startOfDay=new Date();
    startOfDay.setHours(0,0,0,0)

    // Get the end of the day
    const endOfDay=new Date();
    endOfDay.setHours(23,59,59,999);

    //find bookings created within the current day
    const bookingsToday=await Booking.find({
      createdAt:{
        $gte:startOfDay,
        $lte:endOfDay,
      },
    });
    res.json({
      newBookingsToday:bookingsToday.length,
      bookings:bookingsToday
    })
  } catch (error) {
    res.status(500).json({message:"Error fetching new booking today",error})
  }
}