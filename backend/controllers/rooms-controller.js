import RoomModel from "../models/rooms-model.js";


export const getAllRooms=async(req,res)=>{
    try {
        const rooms=await RoomModel.find();
        res.status(200).json({rooms})
    } catch (error) {
        res.status(500).json({message:"Erron find rooms",error})
    }
};

export const getRoomById=async(req,res)=>{
    try {
        const roomid = req.params.id; // Get the ID from the request parameters
        const room = await RoomModel.findById({_id:roomid}); // Fetch the room by ID from the database

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        res.status(200).json({ room });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}


export const AdminAddRoom=async(req,res)=>{
    const { name, maxcount, phonenumber, rentperday, imageurls, type, description } = req.body;
    try {
        const newRoom=new RoomModel({name, maxcount, phonenumber, rentperday, imageurls, type, description,currentbooking:[],})
        await newRoom.save();
        res.status(200).json({message:"Room Add Successfully"})
    } catch (error) {
        res.status(500).json({message:"Error AddRooms"})
    }
}