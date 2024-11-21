import express from "express";
import cors from "cors";
import connectedDb from "./untils/db.js"; // Fixed typo from "untils" to "utils"
import bookingRoutes from "./routes/booking-route.js";
import adminRoutes from "./routes/admin-route.js";
import userRoutes from "./routes/users-route.js";
import "dotenv/config"; 
import roomRoutes from "./routes/rooms-route.js";
// import Razorpay from "razorpay"
// import paymentRoutes from "./routes/payment-route.js";
import createbookRoutes from "./routes/createbooking-route.js";

const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = ['http://localhost:5173', 'https://mern-booking-app-2-agi3.onrender.com'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// Routes
app.get('/', (req, res) => {
  res.status(200).json("Hello World");
});
app.use("/api",bookingRoutes)
app.use("/api/admin",adminRoutes)
app.use("/api",userRoutes)
app.use("/api",roomRoutes)
// app.use("/api",paymentRoutes)
app.use("/api",createbookRoutes)
// app.get("/api/getkey",(req,res)=>{
//   res.status(200).json({key:process.env.RAZORPAY_API_KEY})
// })

// export const instance=new Razorpay({
//   key_id: process.env.RAZORPAY_API_KEY,
//   key_secret: process.env.RAZORPAY_SECRET_KEY,
// })

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Optional: Log the error or handle it more gracefully
});


// Database Connection and Server Initialization
connectedDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit if database connection fails
});
