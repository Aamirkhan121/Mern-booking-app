import mongoose from "mongoose";

const roomSchema=mongoose.Schema({
    name:{type:String,required:true},
    maxcount:{type:Number,required:true},
    phonenumber:{type:Number,required:true},
    rentperday:{type:Number,required:true},
    imageurls:[],
    currentbooking:[],
    type:{type:String,required:true},
    description:{type:String,required:true},
    type:{type:String,required:true},
},{timestamp:true});

const RoomModel=mongoose.model('rooms',roomSchema);
export default RoomModel