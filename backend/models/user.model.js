import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, require: true, unique: true },
    password: { type: String},
    mobile: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "owner", "deliveryPartner"],
      required: true,
    },
    resetOtp:{
      type: String
    },
    isOtpVerified:{
      type: Boolean,
      default: false
    },
    otpExpires:{
      type: Date
    }
  },
  { timestamp: true }
);

export const User = mongoose.model("User", userSchema);
