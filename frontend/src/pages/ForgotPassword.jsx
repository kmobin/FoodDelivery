import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { bgColor, borderColor, primaryColor } from "../colors/colors";
import { IoMdArrowBack } from "react-icons/io";
import { serverUrl } from "../App";
import axios from "axios";
import { ClipLoader } from "react-spinners";

function ForgotPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [steps, setSteps] = useState(1);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  const handleReset = async () => {
    if (password != confirmPassword) return;

    try {
      setIsLoading(true)
      const result = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { email, newPassword: confirmPassword },
        { withCredentials: true }
      );
      setIsLoading(false)
      navigate("/signin");
    } catch (e) {
      setIsLoading(false)
      setError(e.message);
    }
  };

  const handleSendOtp = async () => {
    try {
      setIsLoading(true)
      const result = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true }
      );
      setSteps(2);
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      setError(e.message);
    }
  };

  const verifyOtp = async () => {
    try {
      setIsLoading(true)
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email, otp: OTP },
        { withCredentials: true }
      );
      setSteps(3);
      setIsLoading(false)
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{
        background: bgColor,
      }}
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8`}
        style={{
          border: `1px solid ${borderColor}`,
        }}
      >
        <div className="flex items-center gap-3 mb-4 ">
          <IoMdArrowBack
            size="20"
            onClick={() => navigate("/signin")}
            className="cursor-pointer"
            style={{ color: primaryColor }}
          />
          <h1 className={`text-xl font-bold`} style={{ color: primaryColor }}>
            Forgot Password
          </h1>
        </div>
        {steps == 1 && (
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <button
              onClick={handleSendOtp}
              style={{ background: primaryColor, color: "white" }}
              className="w-full mt-4 flex items-center justify-center rounded-lg border px-4 py-2 transition duration-200 cursor-pointer focus:outline-none focus:border-orange-500 hover:bg-[#e64323]"
            >
              {isLoading ? <ClipLoader size="20" color="white"  /> : "Send OTP"}
            </button>
          </div>
        )}{" "}
        {steps == 2 && (
          <div className="mb-4">
            <label
              htmlFor="OTP"
              className="block text-gray-700 font-medium mb-1"
            >
              OTP
            </label>
            <input
              type="text"
              name="OTP"
              placeholder="Enter OTP"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
              onChange={(e) => setOTP(e.target.value)}
              value={OTP}
            />
            <button
              onClick={verifyOtp}
              style={{ background: primaryColor, color: "white" }}
              className="w-full mt-4 flex items-center justify-center rounded-lg border px-4 py-2 transition duration-200 cursor-pointer focus:outline-none focus:border-orange-500 hover:bg-[#e64323]"
            >
              {isLoading ? <ClipLoader size="20" color="white" /> : "Verify"}
            </button>
          </div>
        )}{" "}
        {steps == 3 && (
          <>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute cursor-pointer right-3 top-[12px] text-gray-500"
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirm-password"
                  placeholder="Enter your password"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
                <button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute cursor-pointer right-3 top-[12px] text-gray-500"
                >
                  {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>
            </div>
            <button
              onClick={handleReset}
              style={{ background: primaryColor, color: "white" }}
              className="w-full mt-4 flex items-center justify-center rounded-lg border px-4 py-2 transition duration-200 cursor-pointer focus:outline-none focus:border-orange-500 hover:bg-[#e64323]"
            >
              {isLoading ? <ClipLoader size="20" color="white"  /> : "Reset Password"}
            </button>
            <p className="text-red-500 text-left my-[10px] text-sm">{error}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
