import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    verficationCode:{type:String},
    isVerified:{type:Boolean,default:false},
    verificationCodeExpires: { type: Date },
    isAdmin:{type:Boolean,default:false},
},{timestamps:true});

const User=mongoose.model("User",userSchema);
export default User