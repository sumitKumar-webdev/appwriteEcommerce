import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from './input';
import authService from '../Appwrite/Authentication';
import {logout, login } from '../store/authSlice'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeClosed } from 'lucide-react';

/**
* @author
* @function Signup
**/

export const Signup = (props) => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [error ,setError] = useState(null);

    const passVisibility = () =>{
      setShowPassword(!showPassword)
    }
    const navigate = useNavigate();

    const create = async (data) => {
      setError('')
      try {
         if (data) {
        const accData = await authService.createAccount(data);
        console.log('accData',accData);
        
        
        if (accData) {
          const userData = await authService.getCurrentUser();
          console.log('userData-',userData);
          
          dispatch(login(userData))
          navigate('/userInfo')
        } else {
          dispatch(logout())
        }
      }
      } catch (error) {
        setError(error.message)
        console.log(error);
        
      }
     

    }

  return(
    <div className='shadow-[1px_2px_8px_rgba(0,0,0,0.1)] rounded-md  w-[480px] min-h-[590px] mt-28 mb-40 bg-[#ffffff]'>
        <div className='flex flex-col items-center text-black-1'>
            <div className='text-2xl font-semibold tracking-[2px] mt-6'><h2>SIGN UP</h2></div>
            <div className='h-[3px] bg-black-1 w-28'></div>
        </div>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
   
    <form onSubmit={handleSubmit(create)} className='flex flex-col items-center' >

      <div className='mt-8'>
        <Input
        label='Name'
        type='Text'
        className='flex flex-col w-[380px] text-black-1 bg-[#fbfbfb] font-bold h-8 outline-none'
        {...register('name', {
          required: true
        })}
        />
        <div className='h-[2px] bg-black-1 w-[380px]'></div>
      </div>

      <div className='mt-9'>
        <Input
        label='Email'
        type='email'
        className='flex flex-col w-[380px] bg- text-black-1 bg-[#fbfbfb] font-bold h-8 outline-none'
        {...register('email', {
          required: true,
           validate: {
            validEmail: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || "Invalid Email",
           }

        })}
        />
        <div className='h-[2px] bg-black-1 w-[380px]'></div>
      </div>
      <div className='w-[380px] relative mt-9 mb-10'>

        <Input
        label='Password'
        type={showPassword ? 'Text' : 'password'}
        className='flex flex-col w-[380px] text-black-1 bg-[#fbfbfb] font-bold h-8 outline-none'
        {...register('password', {
          required: true,
          minLength: 4,
          maxLength: 20
        })}
        />
         <button 
            onClick={passVisibility} 
            className='absolute right-3 top-1/2 transform -translate-y-1/2"'>
                {showPassword? <Eye /> : <EyeClosed />}
            </button>
        <div className='h-[2px] bg-black-1 w-[380px]'></div>
      </div>

      <button
      type="submit"  
      className='border w-44 mt-8 h-11 rounded-3xl text-white text-lg cursor-pointer transtion duration-300 bg-black-1'>Continue</button>
      <p className='lassName="mt-2 text-center text-base text-black/60 mt-2'>Already have an account?
      <Link
        to="/login"
       className="font-medium text-primary transition-all duration-200 hover:underline"
       >Login In</Link>
      </p>
      

    </form>
     </div>
   )
  }
