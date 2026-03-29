import React, { useEffect } from 'react'
import axios from "axios";
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setMyShopData } from '../redux/ownerSlice';

function useGetMyShops() {
    const dispatch = useDispatch()

    useEffect(()=>{
        const fetchShops = async()=>{
            try{
                const {data} = await axios.get(`${serverUrl}/api/shop/get-my-shop`,{withCredentials: true})
                dispatch(setMyShopData(data))
            }catch(e){
                console.log(`fetch shops ${e}`)
            }
        }
        fetchShops()
    },[])
}

export default useGetMyShops