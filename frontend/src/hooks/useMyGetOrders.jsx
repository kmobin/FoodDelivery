import React from 'react'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setMyOrders } from '../redux/userSlice.js'
import axios from 'axios'

function useMyGetOrders() {
    const dispatch = useDispatch()
    useEffect(() => {
        try {
            const fetchMyOrders = async () => {
                const result = await axios.get(`${serverUrl}/api/order/my-orders`, { withCredentials: true })
                dispatch(setMyOrders(result.data))
                console.log("result---", result.data)
            }
            fetchMyOrders()
        } catch (e) {
            console.log("useGetShopsByCity err: ", e)
        }
    },[]) 
}

export default useMyGetOrders