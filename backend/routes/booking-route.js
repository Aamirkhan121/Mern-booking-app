import express from "express";
import { getAllBookingData, getUserBookings } from "../controllers/booking-controller.js";
import protect from "../middlerware/authMiddleware.js";

const router=express.Router()

// get all booking data

router.get("/bookings",getAllBookingData)

//My booking data
router.get('/booking/my-bookings', protect, getUserBookings);




export default router