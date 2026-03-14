import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";

function Nav() {
  const { userData } = useSelector((state) => state.user);
  const [showInfo, setShowInfo] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  console.log("userData----", userData, userData?.fullname?.slice(0, 1));
  return (
    <div className="w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible">
      {/* {showSearch && } */}
      <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">Food Delivery</h1>
      <div className="md:w-[60%] lg:w-[40%] h-[60px] bg-white shadow-xl round-lg hidden md:flex">
        <div className="flex items-center w-[25%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400 mb-[10px] mt-[10px]">
          {" "}
          <FaLocationDot size="25" className="text-[#ff4d2d]" />{" "}
          <div className="w-[80%] truncate text-gray-600">Jhansi</div>{" "}
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
      <div className="flex items-center gap-4"> 
      <IoIosSearch size="25" className="text-[#ff4d2d] md:hidden" />
      <div className="relative cursor-pointer">
        <MdOutlineShoppingCart size="25" className="text-[#ff4d2d]" />
        <span className="absolute right-[-9px] top-[-12px] text-[#ff4d2d]">
          0
        </span>
      </div>
      <button className="hidden md:block px-3 px-3 py-1 round-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium cursor-pointer">
        My Orders
      </button>
      <div onClick={()=> setShowInfo(!showInfo)} className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer">
        {userData?.fullname?.slice(0, 1)}
      </div>
      {showInfo && <div className="fixed top-[80px] right-[10px] md:right-[10%] w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[9999]">
        <div className="text-[17px] font-semibold">{userData?.fullname}</div>
        <div className="md:hidden text-[#ff4d2d] font-semibold cursor-pointer">My Orders</div>
        <div className="text-[#ff4d2d] font-semibold cursor-pointer">Log Out</div>
      </div>}
      </div>
    </div>
  );
}

export default Nav;
