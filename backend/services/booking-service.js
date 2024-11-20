import Booking from "../models/booking-models.js";
import RoomModel from "../models/rooms-model.js";
import moment from "moment";

export const saveAllBookingData = async (bookingDetails, transactionId) => {
  const { room, userid, fromdate, todate, totalamount, totaldays } = bookingDetails;

  try {
    // Create new booking entry
    const newBooking = new Booking({
      room: room.name,
      roomid: room._id,
      userid,
      fromdate: moment(fromdate).format("DD-MM-YYYY"),
      todate: moment(todate).format("DD-MM-YYYY"),
      totalamount,
      totaldays,
      transactionId,
    });

    // Save booking data
    const booking = await newBooking.save();

    // Update the current booking in the room document
    const roomToUpdate = await RoomModel.findById(room._id);
    roomToUpdate.currentbooking.push({
      bookingid: booking._id,
      fromdate: moment(fromdate).format("DD-MM-YYYY"),
      todate: moment(todate).format("DD-MM-YYYY"),
      userid: userid,
      status: booking.status,
    });

    await roomToUpdate.save();

    return booking; // Return the booking object for further use if needed
  } catch (error) {
    throw new Error(`Error saving booking data: ${error.message}`);
  }
};
