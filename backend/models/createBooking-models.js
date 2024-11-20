import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
  room: { type: Object, required: true },
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    userid:{type:String,required:true}
  },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  totalDays: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  transactionId: { type: String, required: true }, // assuming transaction Id from payment gateway
  status:{type:String, required:true, default:'booked'}
}, { timestamps: true });

const Booking = mongoose.model('bookingrooms', bookingSchema);
export default Booking
