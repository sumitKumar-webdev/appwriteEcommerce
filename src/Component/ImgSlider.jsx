import React, { useEffect, useState } from 'react'
import  img1   from '../assets/img1.jpg'
import  img2  from '../assets/img2.jpg'
import  img3  from '../assets/img3.jpg'

const images =[img1,img2,img3];

export const ImgSlider = (props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(false);

    useEffect(()=>{
        const interval = setInterval(()=>{
            setFade(true);
            setTimeout(() => {
                setCurrentIndex((index)=>index===images.length-1 ? 0 : index+1);
            }, 5000);
            setFade(false)
        }, 5000);
        return ()=>clearInterval(interval);
    },[]);

  return(
    <div className='relative w-full h-[500px] overflow-hidden' >


            <div className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((img, index) => (
                    <img key={index} src={img} alt="T-Shirt" className="w-full h-[500px]object-cover" />
                ))}
            </div>

       <button className='absolute text-white bg-gray-800 top-1/2 left-2 p-2 rounded-full' onClick={()=>setCurrentIndex((index) => index === 0 ? images.length-1 : index-1)}>
       ❮
       </button>

       <button className='absolute  text-white bg-gray-800 top-1/2 right-2 p-2 rounded-full' onClick={()=>setCurrentIndex((index) => index === images.length-1 ? 0 : index+1)}>
       ❯
       </button>



    </div>
   )
  }
