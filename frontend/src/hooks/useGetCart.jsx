import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { serverUrl } from '../App'
import { saveToCart, setTotalAmount } from '../redux/userSlice'

function useGetCart() {
    const dispatch = useDispatch()
 useEffect(()=>{
    const fetchCart = async() => {
      try{
           const {data} = await axios.get(`${serverUrl}/api/cart/get-cart-items`, {withCredentials: true})
       
       dispatch(saveToCart(data))
       const total = data.reduce((sum, item) => sum + (item.price * item.quantity), 0)
       dispatch(setTotalAmount(total))
      }catch(err){
         console.log("fetchCart err:",err)
      }
    } 
    fetchCart()
 },[])
}

export default useGetCart