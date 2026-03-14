import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { getToken } from "../utils/token.js";
import { sendOtpMail } from "../utils/mail.js";

export const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exist" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "password must be at least 6 characters long" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    const token = getToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "singup error" + e });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect Password!" });

    const token = getToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "singIn error" + e });
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "log out successfully!" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "singOut error" + e });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not exist" });

    const otp = Math.floor(1000 * Math.random() * 9000).toString();
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    await user.save();
    await sendOtpMail(email, otp);
    return res.status(200).json({ message : "otp sent successfully!" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "sendOtp error" + e });
  }
};

export const verifyOtp = async(req, res) =>{
  try{
    const {email, otp} = req.body
    const user = await User.findOne({email}) 
    if(!user || user.resetOtp != otp || user.otpExpires < Date.now()){
      return res.status(400).json({ message: "invalid/expired otp" });
    }
    user.resetOtp = undefined
    user.isOtpVerified = true
    user.otpExpires = undefined
    await user.save()
    return res.status(200).json({message:"otp verified successfully"})
  }catch (e) {
    console.log(e);
    return res.status(500).json({ message: "verifyOtp error" + e });
  }
}

export const resetPassword = async (req, res)=>{
  try{
    const {email, newPassword} = req.body
    const user = await User.findOne({email}) 
    if(!user ){
      return res.status(400).json({ message: "User not exist" });
    }
    if(!user.isOtpVerified){
      return res.status(400).json({ message: "Otp verification required" });
    }
    user.password = await bcrypt.hash(newPassword, 10)
    user.isOtpVerified = false
    await user.save()
    return res.status(200).json({message:"password reset successfully"})
  }catch(e){
    console.log(e);
    return res.status(500).json({ message: "resetPassword error" + e });
  }
} 

export const googleAuth= async(req,res) => {
  try{
    const {fullname, email, mobile, role} = req.body
    let user = await User.findOne({email})
    if(!user){
      user = await User.create({
        fullname, email, mobile, role
      })
    }
    const token = await getToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json(user)
  }catch(e){
    console.log(e);
    return res.status(500).json({ message: "googleAuth error" + e });
  }
}