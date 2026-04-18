import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { serverUrl } from '../App'
import { saveToCart, setTotalAmount } from '../redux/userSlice'

function useGetCart() {
    const dispatch = useDispatch()
 useEffect(()=>{
    const fetchCart = async() => {
        const {data} = await axios.get(`${serverUrl}/api/cart/get-cart-items`, {withCredentials: true})
       console.log("useGetCart---",data)
       dispatch(saveToCart(data))
       const total = data.reduce((sum, item) => sum + (item.price * item.quantity), 0)
       dispatch(setTotalAmount(total))
    } 
    fetchCart()
 },[])
}

export default useGetCart