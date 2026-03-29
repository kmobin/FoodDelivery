import React, { useEffect, useRef, useState } from 'react'
import { categories } from '../category'
import CategoryCard from './CategoryCard'
import { FaChevronCircleRight } from "react-icons/fa";
import { FaChevronCircleLeft } from "react-icons/fa";
import { useSelector } from 'react-redux';


function UserDashboard() {

  const cateScrollRef = useRef(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(true)
  const {currentCity} = useSelector(state=> state.user)
  
  const scrollHandler = (ref, direction) => {
    if(ref.current){
      ref.current.scrollBy({
        left: direction == "left" ? -200 : 200,
        behavior: "smooth"
      })
    }
  }

  const updateButton = (ref, setLeftButton, setRightButton) =>{
      const element = ref.current
      if(element){
        setLeftButton(element.scrollLeft > 0)
        setRightButton(element.scrollLeft + element.clientWidth < element.scrollWidth)
        console.log("scroller",element.scrollWidth, element.clientWidth,element.scrollLeft)
      }
  }

  useEffect(()=>{
    if(cateScrollRef.current){
      
      cateScrollRef.current.addEventListener("scroll",()=>{
        updateButton(cateScrollRef, setShowLeftButton, setShowRightButton)
      })
    }
    return ()=>{
      cateScrollRef.current.removeEventListener("scroll",()=>{
        updateButton(cateScrollRef, setShowLeftButton, setShowRightButton)
      })
    }
  },[])

  return (
    <div className='w-[67%] min-h-screen bg-[#fff9f6] flex flex-col'>

      <h1 className='text-gray-800 text-2xl sm:text-3xl pb-4'>Inspiration for your first order</h1>
      <div className='w-full relative'>
       {
         showLeftButton &&  <button className='absolute left-0 top-18 -transition-y-1/2 bg-[#ff4d2d] text-white p-2
         rounded-full shadow-lg hover:bg-[#e64528] z-10' onClick={()=>scrollHandler(cateScrollRef, "left")}>
         <FaChevronCircleLeft />
         </button>
       }
        <div className='w-full flex overflow-x-auto gap-4 pb-2 scrollbar-thin 
                scrollbar-thumb=[#ff4d2d] scrollbar-track-transparent scroll-smooth' ref={cateScrollRef}>
          {categories.map((cate, index) => <CategoryCard data={cate} key={index} />)}
        </div>
       {showRightButton &&  <button className='absolute right-0 top-18 -transition-y-1/2 bg-[#ff4d2d] text-white p-2
        rounded-full shadow-lg hover:bg-[#e64528] z-10' onClick={()=>scrollHandler(cateScrollRef, "right")}>
          <FaChevronCircleRight />
          </button>}
      </div>
      <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
      <h1 className='text-gray-800 text-2xl sm:text-3xl pb-4'>Best Shop in {currentCity}</h1>
      </div>
    </div>
  )
}

export default UserDashboard