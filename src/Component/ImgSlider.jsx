import React, { useEffect, useState } from 'react'


const images =[
    'https://cloud.appwrite.io/v1/storage/buckets/67cef615000af5d7467d/files/67e67a2a00143da8ec0f/view?project=67cee1e8002271eb6b57&mode=admin',
    'https://cloud.appwrite.io/v1/storage/buckets/67cef615000af5d7467d/files/67e67a310027b7db363c/view?project=67cee1e8002271eb6b57&mode=admin',
    'https://cloud.appwrite.io/v1/storage/buckets/67cef615000af5d7467d/files/67e67a6a000da49bd30a/view?project=67cee1e8002271eb6b57&mode=admin'
];

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
    <div className=' w-full relative h-[700px] overflow-clip' >


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
