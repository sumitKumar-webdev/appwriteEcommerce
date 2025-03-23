import React from 'react'
import { Search, User, ShoppingCart } from "lucide-react";
import { Logo } from '../Logo/Logo'
import { useNavigate } from "react-router-dom";
import Container from '../Container/Container';



export const Header = () => {
    // const navigate = useNavigate();
    
    const navItem =[
        {
            name: "Home",
            slug: "/"
        },
        {
            name: "About",
            slug: "/about"
        },
        {
            name: "Products",
            slug: "/products"
        },
        {
            name: "Contact",
            slug: "/contact"
        }
    ]




  return(
    <header className='w-full py-4   border-t-[1px] shadow bg-black-1'>

        <nav className='flex justify-between '>
            {/* -----------------Logo--------------- */}
            <div className=' cursor-pointer ml-8' onClick={()=>navigate('/')}>
               <Logo width={110}/>
            </div>

{/* ------------------------------NAv Buttons------------------------------ */}

            <div >
                <ul className='flex mt-1 space-x-14 '>
                    {navItem.map((item)=>(
                        <li key={item.name} className='text-white font-syne '>
                            {/* <Link to={item.slug}> {item.name} </Link>//add after confuring router */}
                            {item.name}
                            
                        </li>
                    ))}
                </ul>
            </div>

            {/* -------------------------Social Icons------------------------------- */}
            <div>
                <ul className='flex items-center space-x-4 mt-[6px] mr-8 ' >
                    <li className='cursor-pointer'>
                        <Search size={22} color='white'/>
                    </li>
                    <li className='cursor-pointer'>
                        <User size={22} color='white'/>
                    </li>
                    <li className='cursor-pointer'>
                        <ShoppingCart size={22} color='white' />
                    </li>
                </ul>
            </div>
        </nav>
  
    </header>
   )
  }
