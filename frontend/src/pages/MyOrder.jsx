import React from 'react'
import { IoMdArrowBack } from 'react-icons/io'
import { useSelector } from 'react-redux'
import UserMyOrders from '../components/userMyOrders'
import OwnerMyOrders from '../components/OwnerMyOrders'
import { useNavigate } from 'react-router-dom'

function MyOrder() {
    const { myOrders, userData } = useSelector(state => state.user)
    const navigate = useNavigate()
    return (
        <div className='w-full min-h-screen bg-[#fff9f6] flex justify-center px-4'>
            <div className='w-full max-w-[800px] p-4'>
                <div className='flex items-center gap-[20px] mb-6 relative'>
                    <div className='z-[10] cursor-pointer' onClick={() => navigate('/')}>
                        <IoMdArrowBack size="35" className='text-[#ff4d2d]' />
                    </div>
                    <h1 className='text-2xl font-bold text-start'>My Orders</h1>
                </div>
                <div className='space-6-y'>
                    {
                        myOrders?.map((order, index) => (
                            userData?.role == "user" ?
                                <UserMyOrders data={order} index={index} /> :
                                userData.role == "owner" ?
                                    <OwnerMyOrders data={order} index={index}/> :
                                    null
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default MyOrder