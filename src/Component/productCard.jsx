import React from 'react'

/**
* @author
* @function ProductCard
**/

export const ProductCard = ({
    title,
    price=500,
    discount=10,
    width=180,
    imgSrc = 'download.jpg'
}) => {
  return(
    <div 
    className="h-[380px] cursor-pointer  transition-transform duration-700 hover:scale-105 " style={{ width: `${width}px` }}>
        <div className='flex justify-center'>
            <img 
            src={imgSrc}
            alt="product img"
            className='rounded-xl w-full object-cover '/>

        </div>

        <div className='text-center text-sm'>
            <span>{title ? title :'Premium Oversized SILVER Cotton T-Shirt'}</span>
        </div>

        <div className='text-center text-sm flex justify-center gap-3 mt-1'>
            <span className='text-[#0c0c0c] font-semibold'>
                Rs.{price? price.toFixed(2):100}
            </span>
            <span className='text-xs items-center text-opacity-50 line-through text-gray-700 mt-[3px]'>
                Rs.{discount? Math.max(price-((price*discount)/100), 0).toFixed(2) : 500 }
            </span>
        </div>
    </div>
   )
  }
