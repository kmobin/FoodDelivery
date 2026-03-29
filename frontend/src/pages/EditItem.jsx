import React, { useEffect, useState } from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUtensils } from "react-icons/fa";
import axios from 'axios';
import { serverUrl } from '../App';
import { setMyShopData } from '../redux/ownerSlice';
import { ClipLoader } from 'react-spinners';


function EditItem() {
    const navigate = useNavigate()
    const [currentItem, setCurrentItem] = useState(null)
    const { itemId } = useParams()
    const [name, setName] = useState(currentItem?.name || "")
    const [price, setPrice] = useState(currentItem?.price || "")
    const [frontendImage, setFrontendImage] = useState(currentItem?.image || null)
    const [backendImage, setBackendImage] = useState(null)
    const [category, setCategory] = useState(currentItem?.category || "")
    const [foodType, setFoodType] = useState(currentItem?.foodType || "veg")
    const [loading, setLoading] = useState(false)
    const categories = ["Snacks",
        "Main Course",
        "Desserts",
        "Pizza",
        "Burgers",
        "Sandwiches",
        "South Indian",
        "North indian",
        "Chinese",
        "Fast Foods",
        "Other"]
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("name", name)
            formData.append("category", category)
            formData.append("price", price)
            formData.append("foodType", foodType)

            if (backendImage)
                formData.append("image", backendImage)

            const { data } = await axios.put(`${serverUrl}/api/item/edit-item/${itemId}`, formData, { withCredentials: true })
            console.log("data----", data)
            dispatch(setMyShopData(data))
            setLoading(false)
            navigate("/")
        } catch (e) {
            console.log("handleSubmit err ", e)
        }
    }

    const handleImage = async (e) => {
        const file = e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }

    useEffect(() => {
        const handleGetItemById = async () => {
            try {
                const { data } = await axios.get(`${serverUrl}/api/item/get-by-id/${itemId}`, {
                    withCredentials: true
                })
                setCurrentItem(data)
                setName(data.name)
                setPrice(data.price)
                setFrontendImage(data.image)
                setFoodType(data.foodType)
                setCategory(data.category)
            } catch (e) {
                console.log("handleGetItemById error ", e)
            }
        }
        handleGetItemById()
    }, [])

    return (
        <div className='flex justify-center flex-col items-center p-6 bg-gradient-to-br from-orange-50 relative  to-white min-h-screen'>
            <div className='absolute top-[20px] left-[20px] z-[10] mb-[10px] cursor-pointer' onClick={() => navigate('/')}>
                <IoMdArrowBack size="35" className='text-[#ff4d2d]' />
            </div>
            <div className='max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100'>
                <div className='flex flex-col items-center mb-6'>
                    <div className='bg-orange-100 p-4 rounded-full mb-4'>
                        <FaUtensils className='text-[#ff4d2d] w-16 h-16' />

                    </div>
                    <div className='text-3xl font-extrabold text-gray-900'>
                        Edit Food
                    </div>

                </div>
                <form className='space-y-5' onSubmit={handleSubmit}>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Enter Shop Name' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'></input>
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Price</label>
                        <input value={price} onChange={(e) => setPrice(e.target.value)} type='number' placeholder='Enter Shop Name' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'></input>
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Shop Image</label>
                        <input onChange={handleImage} type='file' placeholder='Enter Shop Name' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'></input>
                        {
                            frontendImage && <div>
                                <img src={frontendImage} alt="" className='w-full h-48 object-cover rounded-lg border mt-2 mb-2' />
                            </div>
                        }
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Catergory</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'>
                            {
                                categories.map((cat, index) => <option value={cat} key={index}>{cat}</option>)
                            }
                        </select>
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Price</label>
                        <select value={foodType} onChange={(e) => setFoodType(e.target.value)} className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'>
                            <option value="veg">veg</option>
                            <option value="non veg">non veg</option>
                        </select>
                    </div>

                    <button className='w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semi-bold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-200 cursor-pointer'>
                        {loading ? <ClipLoader size="20" color="white" /> : "Save"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditItem