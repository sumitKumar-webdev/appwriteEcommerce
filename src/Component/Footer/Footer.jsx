import React from 'react'
import { Logo } from '../Logo/Logo'
import { Phone } from 'lucide-react'
import { Mail } from 'lucide-react'
import { Input } from '../input'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const Footer = (props) => {
    const navigate = useNavigate();
  return(
   <footer className='w-full relative bottom-0 h-[500px] bg-black-1 font-syne text-white'>
    <div className='flex justify-between pt-7 h-1/2'>
    <div 
       onClick={()=>(navigate('/'), window.scrollTo({top: 0, behavior: 'smooth'}))} className='ml-4 cursor-pointer w-1/4'>
       <Logo width={250} />
    </div>
    <div className='w-1/4'>
        <h2 className='font-bold text-xl'>QUICK LINKS</h2>
        <ul>
            <li 
            className='cursor-pointer' 
            onClick={()=>(navigate('/'),
            window.scrollTo({top: 0, behavior: 'smooth'}))}>
                Home
            </li>
            <li 
            className='cursor-pointer' 
            onClick={()=>(navigate('/about'),
            window.scrollTo({top: 0, behavior: 'smooth'}))}>
                About
            </li>
            <li 
            className='cursor-pointer' 
            onClick={()=>(window.scrollTo({top: 0, behavior: 'smooth'}))}>
                Product
            </li>
            <li 
            className='cursor-pointer' 
            onClick={()=>(navigate('/contact'),
            window.scrollTo({top: 0, behavior: 'smooth'}))}>
                Contact
            </li>
        </ul>
    </div>
    <div className='w-1/4'>
        <h2  className='font-bold text-xl'>POLICIES</h2>
        <ul>
            <li className='cursor-pointer' 
            onClick={()=>(window.scrollTo({top: 0, behavior: 'smooth'}))}>Privacy Policy</li>
            <li className='cursor-pointer' 
            onClick={()=>(window.scrollTo({top: 0, behavior: 'smooth'}))}>Refund Policy</li>
            <li className='cursor-pointer' 
            onClick={()=>(window.scrollTo({top: 0, behavior: 'smooth'}))}>Terms of Policy</li>
            <li className='cursor-pointer' 
            onClick={()=>(window.scrollTo({top: 0, behavior: 'smooth'}))}>Shipping Policy</li>
        </ul>
    </div>
    <div className='w-1/4'>
        <h2  className='font-medium'><big>Contact Details</big></h2>
        <ul className='space-y-1 '>
            <li className='flex items-center gap-2 text-sm'> <Phone color='white' size={18}/>  +91 9999999999</li>
            <li className='flex items-center gap-2 text-sm'><Mail size={18} /> abc@gmail.com</li>
            <li className='text-sm max-w-[250px]'>Address: Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016
            </li>
        </ul>
    </div>
    </div>
    <div className='flex justify-center items-center flex-col py-3 mt-5 text-center'>
        <p className='text-lg font-medium'>SUBSCRIBE TO STAY IN THE LOOP WITH THE LATEST UPDATES!</p>
        <div className='relative'><Input placeholder=' Email' className='mt-1 h-10 w-96 border border-white bg-black-1 '  />
        <button type='submit' className='absolute right-2 top-1/2 transform -translate-y-1/2'>
        <ArrowRight  />
        
        </button>
        
         </div>
        
    </div>
    <p className='mt-16'>Designed & Developed By <span className='text-blue-600 font-semibold'> Sumit Kumar</span></p>
    <div className='text-white text-center border-t py-2 h-1'>
        <p className="text-sm bottom-0 " >T-ShirtLelo.com © 2024 - 2025 All rights reserved</p>
    </div>

   </footer>

   )
  }
