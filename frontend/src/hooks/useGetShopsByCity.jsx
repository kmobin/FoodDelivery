import React from 'react'
import { useEffect } from 'react'
import axios from "axios";
import { serverUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setShopsInMyCity } from "../redux/userSlice.js";

function useGetShopsByCity() {
    const dispatch = useDispatch()
    const {currentCity} = useSelector(state=> state.user)
  useEffect(()=>{
      try{
       const fetchShop = async() => {
        const {data} = await axios.get(`${serverUrl}/api/shop/get-shop-by-city/${currentCity}`,{withCredentials: true})
        console.log("data----",data)
        dispatch(setShopsInMyCity(data))
    } 
    fetchShop()

      }catch(e){
          console.log("useGetShopsByCity err: ",e)
      }
  },[currentCity])
}

export default useGetShopsByCity