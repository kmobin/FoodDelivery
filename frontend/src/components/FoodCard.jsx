import React, { useEffect, useState } from 'react'
import { FaLeaf } from "react-icons/fa";
import { FaDrumstickBite } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/userSlice';
import axios from 'axios';
import { serverUrl } from '../App';

function FoodCard({ data, index }) {
    const { cartItems } = useSelector(state => state.user)
    const [cartItem, setCartItem] = useState()
   
    const [quantity, setQuantity] = useState(0)
    const dispatch = useDispatch()

    console.log("cartItems----", cartItems)
    useEffect(() => {
        if (cartItems){
            const item = cartItems.find(item => item.id == data._id)
            setCartItem(item)
            setQuantity(item?.quantity ? item?.quantity : 0)
        }
           
    }, [cartItems])
    const renderStars = (rating) => {
        const stars = []
        for (let index = 0; index < 5; index++) {
            if (index < rating)
                stars.push(<FaStar className='text-yellow-600 text-lg' />)
            else stars.push(<FaRegStar className='text-yellow-600 text-lg' />)
        }
        return stars
    }
    const increase = () => {
        setQuantity(quantity + 1)
    }
    const decrease = () => {
        if (quantity - 1 >= 0)
            setQuantity(quantity - 1)
    }

    return (
        <div key={index} className='w-[250px] rounded-2xl border-2 border-[#ff4d2d] bg-white shadow-md overflow-hidden hover:shadow-xl
                    transition-all duration-300 flex flex-col'>
            <div className='w-full relative h-[170px] flex justify-center items-center bg-white'>
                <div className='absolute top-3 right-3 bg-white rounded-full p-1 shadow '>
                    {data.foodType == "veg" ? <FaLeaf className="text-green-600 text-lg" /> : <FaDrumstickBite className="text-red-600 text-lg" />}
                </div>

                <img src={data.image} alt="" className='w-full h-full object-cover transition-transform    
                                                duration-300 hover:scale-105' />

            </div>
            <div className='flex-1 flex flex-col p-4'>
                <h1 className='font-semibold text-gray-900 text-base truncate'>{data.name}</h1>
                <div className='flex items-center gap-1 mt-1'>
                    {renderStars(data?.rating?.average || 0)}
                    <span>
                        {data?.rating?.count || 0}
                    </span>
                </div>
            </div>
            <div className='flex items-center justify-between mt-auto p-3'>
                <span className='font-bold text-gray-900 text-lg'>{data.price}</span>
                <div className='flex items-center border rounded-full overflow-hidden shadow-sm'>
                    <button onClick={decrease} className='px-2 py-1 hover:bg-gray-100 transition cursor-pointer'>
                        <FaMinus size={12} />
                    </button>
                    <span>{quantity}</span>
                    <button onClick={increase} className='px-2 py-1 hover:bg-gray-100 transition cursor-pointer'>
                        <FaPlus size={12} />
                    </button>
                    <button className={`${cartItem ? "bg-gray-800" : "bg-[#ff4d2d]"}  text-white px-3 py-2 transition-colors cursor-pointer`} onClick={async () => {
                        if (quantity === 0) return;
                        const res = await axios.post(`${serverUrl}/api/cart/add-cart-items`, { quantity: quantity, itemId: data?._id }, { withCredentials: true })
                        console.log("res---", res)
                        dispatch(addToCart({
                            id: data?._id,
                            name: data.name,
                            price: data.price,
                            image: data.image,
                            shop: data.shop,
                            quantity: quantity,
                            foodType: data.foodType
                        }))
                    }}>
                        <FaShoppingCart />
                    </button>
                </div>

            </div>
        </div>
    )
}

export default FoodCard
