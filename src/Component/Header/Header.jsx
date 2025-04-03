import React, { useState } from 'react'
import { Search, User, ShoppingCart } from "lucide-react";
import { Logo } from '../Logo/Logo'
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';



export const Header = () => {
    const navigate = useNavigate();
    const cartItems = useSelector((state)=>state.cart.totalItem)
    const user = useSelector((state)=>state.auth.status)
    
    const [showDropdown ,setShowDropdown] = useState(false)





  return(
    <header className='w-full py-2 border-t-[1px] relative top-0 shadow bg-black-1'>

        <nav className='flex justify-between '>
            {/* -----------------Logo--------------- */}
            <div className=' cursor-pointer ml-8' onClick={()=>navigate('/')}>
               <Logo width={110}/>
            </div>

{/* ------------------------------NAv Buttons------------------------------ */}

            <div >
                <ul className='flex mt-1 space-x-14 text-white font-syne text-lg'>
                    
                    <li className='cursor-pointer'>
                        <NavLink to='/'>
                            Home
                        </NavLink>
                        
                    </li>
                    <li className='cursor-pointer'>
                        <NavLink to='/about'>
                            About
                        </NavLink>
                        
                    </li>
                    <li 
                            className='cursor-pointer relative'
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                           
                        > Products
                          
                            {showDropdown && (
                                <ul className='absolute z-50 w-48 bg-white text-black shadow-lg transition-all duration-300 scale-95 transform origin-top animate-dropdown'>
                                    <li 
                                    onClick={()=> navigate('/products/Oversized')}
                                    className='px-4 py-2 border-b-2 hover:bg-gray-200 cursor-pointer'>
                                        Oversized T-Shirts
                                    </li>
                                    <li 
                                   
                                     onClick={()=> navigate('/products/Regular')}
                                    className='px-4 py-2 hover:bg-gray-200 cursor-pointer'>Regular T-Shirts</li>
                                </ul>
                            )}
                        </li>
                    <li className='cursor-pointer'>
                        <NavLink to='/contact'>
                         Contact
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* -------------------------Social Icons------------------------------- */}
            <div className='relative'>
                <ul className='flex items-center space-x-4 mt-[6px] mr-8 ' >
                    <li className='cursor-pointer'>
                        <Search size={22} color='white'/>
                    </li>
                    <li
                    onClick={user ? ()=>navigate('/profile') : ()=>navigate('/login')}
                     className='cursor-pointer'>
                        <User size={22} color='white'/>
                    </li>
                    <li 
                    onClick={()=>navigate('/cart')}
                    className='cursor-pointer'>
                        <ShoppingCart size={22} color='white' />
                    </li>
                </ul>
                {cartItems>0 ? <span className='absolute -top-1 right-[18px] bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>{cartItems}</span>: null }
               
            </div>
        </nav>
  
    </header>
   )
  }
