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

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignUp = async() => {
      try{
        
        if(!fullName || !email || !password || !role || !mobile){
          setError("All fields are required")
          setTimeout(()=> setError(""),4000)
          return 
        }
        setIsLoading(true)
          const result = await axios.post(`${serverUrl}/api/auth/signup`,{
              fullname: fullName,email, password, role, mobile
          },{withCredentials: true})
          console.log("result---",result)
          dispatch(setUserData(result.data))
          setFullName("")
          setPassword("")
          setMobile("")
          setEmail("")
          setRole("user")
          setIsLoading(false)
          navigate("/signin")
          
      }catch(e){
        setIsLoading(false)
        setError(e.message)
      }
  }

  const handleGoogleAuth = async() => {
    try{
      if(!mobile) {
        setError("Mobile number is required")
        return
      }
      setIsLoading(true)
      const provider = new GoogleAuthProvider()
      let result = await signInWithPopup(auth, provider)
      console.log("result---",result)
      const {data} = await axios.post(`${serverUrl}/api/auth/google-auth`,{
        fullname: result.user.displayName,
        email: result.user.email,
        role,
        mobile
      },{withCredentials: true})
      dispatch(setUserData(data))
      setIsLoading(false)
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
          Create your account to get started with delicious food deliveries
        </p>
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-700 font-medium mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          />
        </div>

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
        </div>

        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-gray-700 font-medium mb-1"
          >
            Mobile
          </label>
          <input
            type="text"
            name="mobile"
            placeholder="Enter your mobile number"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
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
            htmlFor="role"
            className="block text-gray-700 font-medium mb-1"
          >
            Role
          </label>
          <div className="flex gap-2">
            {["user", "owner", "deliveryPartner"].map((r) => (
              <button
                onClick={() => setRole(r)}
                style={
                  role == r
                    ? { background: primaryColor, color: "white" }
                    : { border: `1px solid ${borderColor}`, color: "#333" }
                }
                className=" cursor-pointer flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors focus:outline-none focus:border-orange-500"
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleSignUp}
          style={{ background: primaryColor, color: "white" }}
          className="w-full mt-4 flex items-center justify-center rounded-lg border px-4 py-2 transition duration-200 cursor-pointer focus:outline-none focus:border-orange-500 hover:bg-[#e64323]"
        >
          {isLoading ? <ClipLoader size="20" color="white"  /> : "Sign Up"}
        </button>
        <p className="text-red-500 text-left my-[10px] text-sm">{error}</p>
        <button onClick={handleGoogleAuth} className="cursor-pointer w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transistion duration-200 border-gray-200 hover:bg-gray-200">
          <FcGoogle size={20} />
          <span>Sign Up with Google</span>
        </button>
        <p className="text-center mt-6">Already have an account ? <span className="text-[#ff4d2d] cursor-pointer" onClick={()=>navigate('/signin')} >Sign In</span></p>
      </div>
    </div>
  );
}

export default SignUp;
