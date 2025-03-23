import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { Link, useNavigate } from 'react-router-dom'
import { logout, login as storeLogin } from '../store/authSlice'
import {useForm} from 'react-hook-form'
import authService from '../Appwrite/Authentication'
import { Input } from './input'
import { Eye, EyeClosed } from 'lucide-react'



export const Login = (props) => {
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const passVisibility = () => {
        setShowPassword(!showPassword);
      }
    

    
    const login = async (data) => {
        setError('');
        try {
              const session = await authService.login(data);
        if (session) {
            const userData = await authService.getCurrentUser()
            if(userData){
                dispatch(storeLogin(userData));
                // navigate('/');
            }else{
                dispatch(logout())
            }
        }

        } catch (error) {
            setError(error.message)
        }
    } 


  return(

        <div className='shadow-[1px_2px_8px_rgba(0,0,0,0.1)] rounded-md w-[400px] h-[470px] bg-[#ffffff]'>
            {/* //card start */}
            <div className='text-black-1 flex flex-col items-center'>
                <h2 className='font-semibold text-2xl tracking-[4px] mt-6'>LOGIN</h2>
                <div className='bg-black-1 h-[2px] w-20' ></div>
                </div>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        {/* //form start */}
        <form onSubmit={handleSubmit(login)} className='flex flex-col items-center w-full'>

            <div className='mt-8'>
            <Input 
            label='Email' 
            type='email' 
            className='flex flex-col w-80 bg- text-black-1 bg-[#fbfbfb] font-bold h-8 outline-none'
            {...register('email',
                {required: true,
                    validate:{
                        validEmail: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || "Invalid Email",
                    }
                }
            )}
            />

            <div className='bg-black-1 h-[1px] w-80 ' ></div>
            </div>

            <div className='mt-10 relative'>
            <Input 
            label='Password' 
            type={showPassword ? 'Text' : 'Password'} 
            className='flex flex-col w-80 bg- text-black-1 bg-[#fbfbfb] font-bold h-8 outline-none'
            {...register('password', {
                required: true,
                minLength: 6,
                maxLength: 20,
            })}
            />

            <button 
            onClick={passVisibility} 
            className='absolute right-3 top-3/4 transform -translate-y-1/2'>
                {showPassword? <Eye /> : <EyeClosed />}
            </button>
            <div className='bg-black-1 h-[1px] w-80 ' ></div>
            </div>
               
               <input type="submit" value='Login' name='submit' className='border w-44 mt-14 h-11 rounded-3xl text-white text-lg cursor-pointer transtion duration-300 bg-black-1'/>
               <p className="mt-2 text-center text-base text-black/60">
               Don&apos;t have an account?&nbsp;
               {/* TODO: //add Link After configuring react router */}<a
               to="/signup"
               className="font-medium text-primary transition-all duration-200 hover:underline">Sign Up</a>

          </p>

            
        </form> 
        </div>
        

   )
  }
