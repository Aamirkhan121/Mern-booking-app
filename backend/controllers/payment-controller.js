// import { Payment } from "../models/payment-models.js";
// import { instance } from "../server.js"
// import crypto from "crypto"
// // import {saveBookingController} from "./booking-controller.js";


// export const checkOut=async(req,res)=>{
// const options={
// amount: Number(req.body.amount * 100),
// currency:"INR",
// };
// const order=await instance.orders.create(options);


// res.status(200).json({
//     success:true,
//     order
// })
// }
// export const paymentverification=async(req,res)=>{
// const {razorpay_order_id,razorpay_payment_id,razorpay_signature,bookingDetails}=req.body

// const body=razorpay_order_id + "|" +razorpay_payment_id;

// const expectedSignature=crypto.createHmac('sha256',process.env.RAZORPAY_API_KEY).update(body.toString()).digest('hex');
// console.log('sit received',razorpay_signature)
// console.log('sit generate',expectedSignature)

// const isAuthentic=expectedSignature===razorpay_signature

// if (!isAuthentic) {
//     try {
//         await Payment.create({
//             razorpay_order_id,
//             razorpay_payment_id,
//             razorpay_signature
//         })
        
//         // res.json({
//         //     success: true,
//         //     redirectUrl: `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
//         //   });
    
//         // save database 
//          // Save booking data if payment is successful
//          await saveBookingController(bookingDetails, razorpay_payment_id);
//         res.redirect(`http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`)
//     } catch (error) {
//         console.error("Error saving booking data:", error);
//         res.status(500).json({ success: false, message: "Failed to save booking data." });
//     }

   
// }else {
//     res.status(400).json({ success: false, message: "Payment verification failed." });
//   }
// }