import express from "express"
import { AdminAddRoom } from "../controllers/rooms-controller.js"
import { getAllBookingRooms, getNewBookingToday, getTotalBookings, getTotalUsers, GetUserData } from "../controllers/getAdminUser-controller.js"


const router=express.Router()

router.post("/addroom",AdminAddRoom)
router.get("/booking",getAllBookingRooms)
router.get("/getUser",GetUserData)
router.get("/total/booking",getTotalBookings)
router.get("/total/user",getTotalUsers)
router.get("/new/bookingtoday",getNewBookingToday)

export default router