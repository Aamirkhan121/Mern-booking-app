import express from "express"
import { deleteUser, getUserDetails, loginUser, registerUser, updateUser, VerifyEmail } from "../controllers/users-controller.js";
import protect from "../middlerware/authMiddleware.js";


const router=express.Router();

router.post("/register",registerUser)
router.post("/verifyemail",VerifyEmail)
router.post("/login",loginUser)
router.get("/profile/:id",protect ,getUserDetails)
router.put("/update/:id",updateUser)
router.delete("/delete/:id",deleteUser)


export default router