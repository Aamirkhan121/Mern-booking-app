import express from "express";
import { cancelBooking, checkRoomAvailability, createBooking, getBookingsByUserId } from "../controllers/createbooking-controller.js";


const router = express.Router();

router.post('/booking', createBooking);
router.post('/rooms/check-availability',checkRoomAvailability)
router.post("/getbookingsbyuserid",getBookingsByUserId)
router.post('/cancelbooking',cancelBooking)


export default router;
