import User from "../models/users-models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { SendVerficationCode, WelcomeEmail } from "../middlerware/Email.js";
import { validationResult } from "express-validator";


//controller for user action

//Register a new User
export const registerUser=async(req,res)=>{
    const {firstName,lastName,email,password,isAdmin}=req.body
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        //check if the user already exists
        const userExists=await User.findOne({email})
        if (userExists) {
            return res.status(400).json({message:"User Already Exists"})
        }

        //hash the password before saving 
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const verficationCode=Math.floor(100000+Math.random()*900000).toString();
        const verificationCodeExpires = Date.now() + 5 * 60 * 1000;

        //create a New User
        const newUser=new User({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            verficationCode,
            verificationCodeExpires,
            isAdmin:isAdmin || false
        })


        //saved the user in database
        const savedUser=await newUser.save()

       await SendVerficationCode(savedUser.email,verficationCode)

        res.status(201).json({
            message:"Registered SuccessFully",
            user:{
                id:savedUser._id,
                firstName:savedUser.firstName,
                lastName:savedUser.lastName,
                email:savedUser.email,
                isAdmin: savedUser.isAdmin
            }
        })
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
}
// verifiEmail code
export const VerifyEmail=async(req,res)=>{
try {
    const {code}=req.body;
    const user=await User.findOne({
        verficationCode:code
    })
    if (!user) {
       return res.status(400).json({success:false,message:"Invalid or Expire code" }); 
    }
    user.isVerified=true
    user.verficationCode=undefined
    user.verificationCodeExpires = undefined;
    await user.save()
    await WelcomeEmail(user.email,user.firstName)
    return res.status(200).json({success:true,message:"Email verified Successfully" }); 
} catch (error) {
    return res.status(500).json({success:false,message:"internal server error" }); 
}
}


//login user

export const loginUser=async(req,res)=>{
    const{email,password}=req.body;
    try {
        // check if  userExists
        const user=await User.findOne({email});
        if (!user) {
            return res.status(400).json({message:"Invalid Email or Password"})         
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if (!isMatch) {
            return res.status(400).json({message:"Invalid Email or Password"})            
        }

        //generate jwt
        const expiresIn=60 * 60
        const token=jwt.sign({
            userId:user._id,
            email:user.email
        },process.env.JWT_SECRET,{expiresIn});

        
    // Calculate expiration time in milliseconds
    const expirationTime=Date.now()+expiresIn * 1000;

        res.json({token,expirationTime,userId:user._id,firstName:user.firstName, isVerified:user.isVerified})
    } catch (error) {
        res.status(500).json({success:false,message:"Error Logging",error})
    }
}

//get user details
export const getUserDetails = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password'); // Exclude password from the response
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user details', error });
    }
  };

  //update user
  export const updateUser=async(req,res)=>{
    const {firstName,lastName,email,isAdmin}=req.body;
    try {
        const user=await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({message:"user not found"})
        }
        //update user files
        user.firstName=firstName ||user.firstName;
        user.lastName=lastName ||user.lastName;
        user.email=email ||user.email;

        // Only update `isAdmin` if the user making the request is an admin
        if (req.user && req.user.isAdmin) {
            user.isAdmin = isAdmin !== undefined ? isAdmin : user.isAdmin;
        }

        const updateUser=await user.save()
        
        res.json({
            message:"user update successfully",
            user:{
                id:updateUser._id,
                firstName:updateUser.firstName,
                lastName:updateUser.lastName,
                email:updateUser.email,
                isAdmin:updateUser.isAdmin
            }
        })
    } catch (error) {
        res.status(500).json({message:"Error update user",error})
    }
  }

  //delete user

  export const deleteUser=async(req,res)=>{
      const userId= req.params.id
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message:"User not found"})
        }
        // console.log('User found:', user);
        await user.deleteOne({userId});
        res.json({message:"User Deleted SuccessFully "})
    } catch (error) {
        res.status(500).json({message:"Error Delete User",error:error.message})
    }
  }