import React, { useState } from 'react'
import { MdPhone } from "react-icons/md";
import { serverUrl } from '../App'
import axios from 'axios'
import { updateOrderStatus } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

function OwnerMyOrders({ data, index }) {
  console.log("data---", data)
  const dispatch = useDispatch()
  const [availableBoys, setAvailableBoys] = useState([])
  const handleUpdateStatus = async(orderId, shopId, status) =>{
    try{
        const result = await axios.post(`${serverUrl}/api/order/update-status/${orderId}/${shopId}`,{status},{withCredentials:true})
        console.log("result:",result)
        dispatch(updateOrderStatus({orderId, shopId, status}))
        setAvailableBoys(result.data.availableBoys)
      }catch(error){
        console.log("handleUpdateStatus error:",error)
    }
  }


  return (
    <div key={index} className='bg-white rounded-lg shadow p-2 space-y-4 mb-4'>
      <div>
        <h2 className='text-lg font-semibold text-gray-800'>{data.user.fullname}</h2>
        <p className='text-sm text-gray-500'>{data.user.email}</p>
        <p className='flex items-center gap-2 text-sm text-gray-600 mt-1'><MdPhone /><span>{data.user.mobile}</span></p>
      </div>
      <div className='flex items-start flex-col gap-2 text-gray-600 text-sm'>
        <p> {data?.deliveryAddress?.text}</p>
        <p className='text-xs text-gray-500'>Lat: {data?.deliveryAddress?.latitude}, Long: {data?.deliveryAddress?.longitude}</p>
      </div>
      <div className='flex space-x-4 overflow-x-auto pb-2'>
        {data.shopOrders?.shopOrderItems.map((element, index) => (
          <div className='flex-shrink-0 w-40 border rounded-lg p-2 bg-white' key={index}>
            <img src={element.item.image} className='w-full h-24 object-cover rounded' />
            <p className='text-sm font-semibold mt-1'>{element.name}</p>
            <p className='text-xs text-gray-500'>{element.quantity} x {element.price}</p>
          </div>
        ))}
      </div>
      <div className='flex justify-between items-center mt-auto pt-3 border-t border-gray-400'>
        <span className='text-sm'>status: <span className='font-semibold capitalize text-[#ff4d2d]'>{data?.shopOrders?.status}</span> </span>
      <select  onChange={(e)=>handleUpdateStatus(data._id,data?.shopOrders.shop._id, e.target.value)} className="rounded-md border px-3 py-1 text-sm focus:outline-none focus:ring-2
      border-[#ff4d2d] text-[#ff4d2d]">
        <option value="change status">Change Status</option>
        <option value="pending">Pending</option>
        <option value="preparing">Preparing</option>
        <option value="out for delivery">Out for delivery</option>
      </select>
      </div>
      <div className='text-right font-bold text-gray-800 text-sm'>
        Total: {data?.shopOrders?.subTotal}
      </div>
    </div>
  )
}

export default OwnerMyOrders
