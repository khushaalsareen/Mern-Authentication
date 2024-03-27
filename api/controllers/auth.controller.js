import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

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

function isValidEmail(email) {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}