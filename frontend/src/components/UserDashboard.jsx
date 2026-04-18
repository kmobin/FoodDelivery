import React, { useEffect, useRef, useState } from 'react'
import { categories } from '../category'
import CategoryCard from './CategoryCard'
import { FaChevronCircleRight } from "react-icons/fa";
import { FaChevronCircleLeft } from "react-icons/fa";
import { useSelector } from 'react-redux';
import FoodCard from './FoodCard';

function UserDashboard() {
  const cateScrollRef = useRef(null)
  const shopScrollRef = useRef(null)
  const itemsScrollRef = useRef(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(true)
  const [showShopLeftButton, setShowShopLeftButton] = useState(false)
  const [showShopRightButton, setShowShopRightButton] = useState(false)
  const [showItemsLeftButton, setShowItemsLeftButton] = useState(false)
  const [showItemsRightButton, setShowItemsRightButton] = useState(false)
  const { currentCity, shopsInMyCity, itemsInCity } = useSelector(state => state.user)

  const scrollHandler = (ref, direction) => {
    console.log("scrollHandler---")
    if (ref.current) {
      ref.current.scrollBy({
        left: direction == "left" ? -200 : 200,
        behavior: "smooth"
      })
    }
  }

  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current
    console.log("")
    if (element) {
      setLeftButton(element.scrollLeft > 0)
      setRightButton(element.scrollLeft + element.clientWidth < element.scrollWidth)
      console.log("scroller", element.scrollWidth, element.clientWidth, element.scrollLeft)
    }
  }

  useEffect(() => {
    if (cateScrollRef.current) {
      cateScrollRef.current.addEventListener("scroll", () => {
        updateButton(cateScrollRef, setShowLeftButton, setShowRightButton)
      })
    }

    if (shopScrollRef.current) {
      shopScrollRef.current.addEventListener("scroll", () => {
        updateButton(shopScrollRef, setShowShopLeftButton, setShowShopRightButton)
      })
    }

    if (itemsScrollRef.current) {
      itemsScrollRef.current.addEventListener("scroll", () => {
        updateButton(itemsScrollRef, setShowItemsLeftButton, setShowItemsRightButton)
      })
    }
    return () => {
      if (cateScrollRef.current) {
        cateScrollRef.current.removeEventListener("scroll", () => {
          updateButton(cateScrollRef, setShowLeftButton, setShowRightButton)

        })
      }
      if (shopScrollRef.current) {
        shopScrollRef.current.removeEventListener("scroll", () => {
          updateButton(shopScrollRef, setShowShopLeftButton, setShowShopRightButton)
        })
      }

      if (itemsScrollRef.current) {
        itemsScrollRef.current.removeEventListener("scroll", () => {
          updateButton(itemsScrollRef, setShowItemsLeftButton, setShowItemsRightButton)
        })
      }
    }
  }, [])

  return (
    <div className='w-[67%] min-h-screen bg-[#fff9f6] flex flex-col'>

      <h1 className='text-gray-800 text-2xl sm:text-3xl pb-4'>Inspiration for your first order</h1>
      <div className='w-full relative'>
        {
          showLeftButton && <button className='absolute left-0 top-18 -transition-y-1/2 bg-[#ff4d2d] text-white p-2
         rounded-full shadow-lg hover:bg-[#e64528] z-10 cursor-pointer' onClick={() => scrollHandler(cateScrollRef, "left")}>
            <FaChevronCircleLeft />
          </button>
        }
        <div className='w-full flex overflow-x-auto gap-4 pb-2 scrollbar-thin 
                scrollbar-thumb=[#ff4d2d] scrollbar-track-transparent scroll-smooth' ref={cateScrollRef}>
          {categories.map((cate, index) => <CategoryCard name={cate.category} image={cate.image} index={index} />)}
        </div>
        {showRightButton && <button className='absolute right-0 top-18 -transition-y-1/2 bg-[#ff4d2d] text-white p-2
        rounded-full shadow-lg hover:bg-[#e64528] z-10 cursor-pointer' onClick={() => scrollHandler(cateScrollRef, "right")}>
          <FaChevronCircleRight />
        </button>}
      </div>
      <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
        <h1 className='text-gray-800 text-2xl sm:text-3xl pb-4'>Best Shop in {currentCity}</h1>

        <div className='w-full relative'>
          {
            showShopLeftButton && <button className='absolute left-0 top-18 -transition-y-1/2 bg-[#ff4d2d] text-white p-2
         rounded-full shadow-lg hover:bg-[#e64528] z-10 cursor-pointer' onClick={() => scrollHandler(shopScrollRef, "left")}>
              <FaChevronCircleLeft />
            </button>
          }
          <div className='w-full flex overflow-x-auto gap-4 pb-2 scrollbar-thin 
                scrollbar-thumb=[#ff4d2d] scrollbar-track-transparent scroll-smooth' ref={shopScrollRef}>
            {shopsInMyCity?.map((shop, index) => <CategoryCard name={shop.name} image={shop.image} key={index} />)}
          </div>
          {showShopRightButton && <button className='absolute right-0 top-18 -transition-y-1/2 bg-[#ff4d2d] text-white p-2
        rounded-full shadow-lg hover:bg-[#e64528] z-10 cursor-pointer' onClick={() => scrollHandler(shopScrollRef, "right")}>
            <FaChevronCircleRight />
          </button>}
        </div>

      </div>

      <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
        <h1 className='text-gray-800 text-2xl sm:text-3xl pb-4'>Suggested Food items {currentCity}</h1>

        <div className='w-full relative'>
          {
            showItemsLeftButton && <button className='absolute left-0 top-18 -transition-y-1/2 bg-[#ff4d2d] text-white p-2
         rounded-full shadow-lg hover:bg-[#e64528] z-10 cursor-pointer' onClick={() => scrollHandler(itemsScrollRef, "left")}>
              <FaChevronCircleLeft />
            </button>
          }
          <div className='w-full flex overflow-x-auto gap-4 pb-2 scrollbar-thin 
                scrollbar-thumb=[#ff4d2d] scrollbar-track-transparent scroll-smooth' ref={itemsScrollRef}>
            {itemsInCity?.map((item, index) => <FoodCard data={item} index={index} />)}
          </div>
          {showItemsRightButton && <button className='absolute right-0 top-18 -transition-y-1/2 bg-[#ff4d2d] text-white p-2
        rounded-full shadow-lg hover:bg-[#e64528] z-10 cursor-pointer' onClick={() => scrollHandler(itemsScrollRef, "right")}>
            <FaChevronCircleRight />
          </button>}
        </div>

      </div>
    </div>
  )
}

export default UserDashboard