import React from 'react'
import { useEffect } from 'react'
import axios from "axios";
import { serverUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setItemsInCity } from '../redux/userSlice';

function useGetItemsByCity() {
    const { currentCity } = useSelector(state=>state.user)
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchItems = async() => {
            const { data } = await axios.get(`${serverUrl}/api/item/get-item-by-city/${currentCity}`,{withCredentials: true})
            dispatch(setItemsInCity(data))
        }
        fetchItems()
    },[currentCity])
}

export default useGetItemsByCity