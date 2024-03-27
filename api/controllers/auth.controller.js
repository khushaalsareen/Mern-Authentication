import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"

export const signup = async (req,res,next)=>{
  try{
  const {username, email, password} = req.body;
  //Missing Details
  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }
  // Validate email format
  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, message: "Invalid email format"});
  }
  const hashedPassword = await bcryptjs.hash(password,10);
  const newUser = new User({username,email,password:hashedPassword});
    await newUser.save();
    return res.status(200).json({
      success: true,
      message: 'User created successfully',
    })
  } catch(error){
    next(error);
  }
}

export const signin = async (req,res,next)=>{
  try{
    const {email, password} = req.body;
    const validUser = await User.findOne({email});
    if(!validUser){
      return next(errorHandler(404,"No such user exists"))
    }
    const validPassword = await bcryptjs.compare(password,validUser.password);
    if(!validPassword){
      return next(errorHandler(401,"Invalid Credentials"))
    }
   const token = jwt.sign({id:validUser._id}, process.env.JWT__SECRET)
   const {password:hashedPassword, ...rest} = validUser._doc;
   const expiryDate = new Date(Date.now() + 3600000) // 1hour
   res.cookie('access_token',token,{httpOnly:true, expires: expiryDate}).status(200).json({
    success: true,
    message: 'Login Success',
    rest
   })
  }
  catch(error){
    next(error);
  }

}

function isValidEmail(email) {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}