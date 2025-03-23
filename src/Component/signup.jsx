import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from './input';
import authService from '../Appwrite/Authentication';
import {logout, login as storeLogin } from '../store/authSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
    // const navigate = useNavigate();

    const create = (data) => {
      setError('')
      try {
         if (data) {
        const userData = authService.createAccount(data);
        if (userData) {
          dispatch(storeLogin(data))
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
    <div className='shadow-[1px_2px_8px_rgba(0,0,0,0.1)] rounded-md w-[400px] h-[470px] bg-[#ffffff]'>
        <div className='flex flex-col items-center text-black-1'>
            <div className='text-2xl font-semibold tracking-[4px] mt-6'><h2>SIGN UP</h2></div>
            <div className='h-[3px] bg-black-1 w-28'></div>
        </div>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
   
    <form onSubmit={handleSubmit(create)} className='flex flex-col items-center' >

      <div className='flex flex-col items-center w-80 mt-8'>
        <Input
        label='Name'
        type='Text'
        className='flex flex-col w-80 bg- text-black-1 bg-[#fbfbfb] font-bold h-8 outline-none'
        {...register('name', {
          required: true
        })}
        />
        <div className='h-[0.5px] bg-black-1 w-80'></div>
      </div>

      <div className='flex flex-col items-center w-80 mt-8'>
        <Input
        label='Email'
        type='email'
        className='flex flex-col w-80 bg- text-black-1 bg-[#fbfbfb] font-bold h-8 outline-none'
        {...register('email', {
          required: true,
           validate: {
            validEmail: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || "Invalid Email",
           }

        })}
        />
        <div className='h-[1px] bg-black-1 w-80'></div>
      </div>
      <div className='relative flex flex-col items-center w-80 mt-8'>

        <Input
        label='Password'
        type={showPassword ? 'Text' : 'password'}
        className='flex flex-col w-80 bg- text-black-1 bg-[#fbfbfb] font-bold h-8 outline-none'
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
        <div className='h-[1px] bg-black-1 w-80'></div>
      </div>

      <input 
      type="submit" 
      value="Continue" 
      className='border w-44 mt-14 h-11 rounded-3xl text-white text-lg cursor-pointer transtion duration-300 bg-black-1'/>
      <p className='lassName="mt-2 text-center text-base text-black/60 mt-2'>Already have an account?
      <a
        to="/userInfo"
       className="font-medium text-primary transition-all duration-200 hover:underline"
       >Sign In</a>
      </p>
      <a to></a>

    </form>
     </div>
   )
  }
