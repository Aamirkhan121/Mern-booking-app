import express from "express";
import { getAllRooms, getRoomById } from "../controllers/rooms-controller.js";

const router = express.Router();

router.get("/getAllRooms",getAllRooms)
router.post("/getRoomById/:id",getRoomById)

export default router