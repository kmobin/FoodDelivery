import React, { useState } from "react";
import { bgColor, borderColor, primaryColor } from "../colors/colors.js";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase.js";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      if(!email || !password){
        setError("All fields are required")
        setTimeout(()=> setError(""),4000)
        return 
      }
      setIsLoading(true)
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log("result---", result);
      dispatch(setUserData(result.data))
      setPassword("");
      setEmail("");
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      setError(e.message)
    }
  };

  const handleGoogleAuth = async() => {
    try{
      setIsLoading(true)
      const provider = new GoogleAuthProvider()
      let result = await signInWithPopup(auth, provider)
      console.log("result---",result)
      const {data} = await axios.post(`${serverUrl}/api/auth/google-auth`,{
        email: result.user.email
      },{withCredentials: true})
      setIsLoading(false)
      dispatch(setUserData(data))
      console.log("data---",data)
    }catch(e){
      setIsLoading(false)
      setError(e.message)
    }
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{
        background: bgColor,
      }}
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 `}
        style={{
          border: `1px solid ${borderColor}`,
        }}
      >
        <h1
          className={`text-3xl font-bold mb-2`}
          style={{ color: primaryColor }}
        >
          Food Delivery
        </h1>
        <p className={"text-gray-600 mb-8"}>
          Sign in to your account to get started with delicious food deliveries
        </p>

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
            required
            placeholder="Enter your email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

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
              required
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
        <div className={`text-right mb-4 text-[#ff4d2d] cursor-pointer`} onClick={()=>navigate("/forgot-password")}>Forgot Password</div>
        <button
          onClick={handleSignIn}
          style={{ background: primaryColor, color: "white" }}
          className="w-full mt-4 flex items-center justify-center rounded-lg border px-4 py-2 transition duration-200 cursor-pointer focus:outline-none focus:border-orange-500 hover:bg-[#e64323]"
        >
          {isLoading ? <ClipLoader size="20" color="white"  /> : "Sign In"}
        </button>
        <p className="text-red-500 text-left my-[10px] text-sm">{error}</p>
        <button onClick={handleGoogleAuth} className="cursor-pointer w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transistion duration-200 border-gray-200 hover:bg-gray-200">
          <FcGoogle size={20} />
          <span>Sign In with Google</span>
        </button>
        <p className="text-center mt-6">
         Want to create new account?{" "}
          <span
            className="text-[#ff4d2d] cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
