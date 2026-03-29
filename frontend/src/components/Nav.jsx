import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { FaPlus } from "react-icons/fa";
import { LuReceipt } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function Nav() {
  const { userData, currentCity } = useSelector((state) => state.user);
  const { myShopData } = useSelector((state) => state.owner);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="w-[70%] h-[80px] flex items-center justify-between  gap-[30px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible">
      {showSearch && userData.role == "user" && (
        <div className=" mid:hidden w-[90%] h-[60px] bg-white shadow-xl round-lg items-center flex fixed top-[80px] left-[5%]">
          <div className="flex items-center w-[25%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400 mb-[10px] mt-[10px]">
            {" "}
            <FaLocationDot size="25" className="text-[#ff4d2d]" />{" "}
            <div className="w-[80%] truncate text-gray-600">{currentCity}</div>{" "}
          </div>
          <div className="flex gap-[10px] items-center w-[80%] px-[20px]">
            <IoIosSearch size="25" className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="search delicious food..."
              className="px-[5px] text-gray-700 outline-0 w-full"
            />
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">Food Delivery</h1>
      {userData.role == "user" && (
        <div className="md:w-[60%] lg:w-[40%] h-[60px] bg-white shadow-xl round-lg hidden md:flex">
          <div className="flex items-center w-[25%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400 mb-[10px] mt-[10px]">
            {" "}
            <FaLocationDot size="25" className="text-[#ff4d2d]" />{" "}
            <div className="w-[80%] truncate text-gray-600">{currentCity}</div>{" "}
          </div>
          <div className="flex gap-[10px] items-center w-[80%] px-[20px]">
            <IoIosSearch size="25" className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="search delicious food..."
              className="px-[5px] text-gray-700 outline-0 w-full"
            />
          </div>
        </div>
      )}
      <div className="flex items-center gap-4">
        {userData.role == "user" &&
          (showSearch ? (
            <RxCross1
              size="25"
              className="text-[#ff4d2d]"
              onClick={() => setShowSearch(false)}
            />
          ) : (
            <IoIosSearch
              size="25"
              className="text-[#ff4d2d] md:hidden"
              onClick={() => setShowSearch(true)}
            />
          ))}
        {userData.role == "user" && (
          <div className="relative cursor-pointer">
            <MdOutlineShoppingCart size="25" className="text-[#ff4d2d]" />
            <span className="absolute right-[-9px] top-[-12px] text-[#ff4d2d]">
              0
            </span>
          </div>
        )}
        {userData.role == "owner" && myShopData && (
          <>
            <button className="flex items-center px-3 px-3 py-1 round-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium cursor-pointer gap-[10px]" onClick={()=>navigate("/add-item")}>
              <FaPlus size="15" />
              <span className="hidden md:flex">Add Food Item</span>
            </button>
          </>
        )}


        {
          userData.role == "user" && <button className="relative flex items-center gap-[5px] px-3 px-3 py-1 round-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium cursor-pointer">
            <LuReceipt />
            <span className="hidden md:flex">My Orders</span>
            <span className="absolute -right-2 -top-2 text-xs fony-bold text-white bg-[#ff4d2d] rounded-full px-[6px] py-[1px]">0</span>
          </button>
        }

        <div
          onClick={() => setShowInfo(!showInfo)}
          className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer"
        >
          {userData?.fullname?.slice(0, 1)}
        </div>
        {showInfo && (
          <div className="fixed top-[80px] right-[10px] md:right-[10%] w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[9999]">
            <div className="text-[17px] font-semibold">
              {userData?.fullname}
            </div>
            {userData.role == "user" && <div className="md:hidden text-[#ff4d2d] font-semibold cursor-pointer">
              My Orders
            </div>}
            <div
              className="text-[#ff4d2d] font-semibold cursor-pointer"
              onClick={handleLogOut}
            >
              Log Out
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
