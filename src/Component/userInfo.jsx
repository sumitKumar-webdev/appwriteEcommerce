import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from './input';
import authService from '../Appwrite/Authentication';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Service from '../Appwrite/Config';


export const UserInfo = (props) => {
    const[error, setError] = useState(null);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const userData = useSelector((state)=>state.auth.userData)

    

    const storeData = async (data) => {
      console.log('Data',data);

      const payload = {
        userId: userData?.$id,
        address: data?.address,
        pincode: data?.pincode? parseInt(data.pincode, 10) : null,
        countryCode: data.countryCode,
        phone: data?.phone
      }
      console.log('payload', payload);
      

      
        setError('')
        try {

            const userinfo = await Service.storeUserInfo(payload);
            userinfo ? console.log('User Info Stored Succesfully') : console.log('Failed to store user Data');
            if (userinfo) {
                navigate('/')
            }            
            
        } catch (error) {
            setError(error.message)
        }
    }


  return(
    <div className='shadow-[1px_2px_8px_rgba(0,0,0,0.1)] rounded-md w-[480px] h-[580px] mt-28 mb-40 bg-[#ffffff]'>
        <div className='flex flex-col items-center text-black-1'>
            <div className='text-2xl font-semibold tracking-[4px] mt-6'><h2>SIGN UP</h2></div>
            <div className='h-[3px] bg-black-1 w-28'></div>
        </div>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
   
    <form onSubmit={handleSubmit(storeData)} className='flex flex-col items-center' >

      <div className='mt-8'>
        <Input
        label='Address'
        type='Text'
        className='flex flex-col w-[380px] text-black-1 bg-[#fbfbfb] font-bold h-8 outline-none'
        {...register('address', {
          required: true
        })}
        />
        <div className='h-[2px] bg-black-1 w-[380px]'></div>
      </div>

      <div className='mt-8'>

        <Input
        label='Pincode'
        type="tel"
        step='none'
        maxLength={6}
        inputMode="numeric"
        className='flex flex-col w-[380px] text-black-1 bg-[#fbfbfb] font-bold h-8 outline-none'
        {...register('pincode', {
            pattern: {
                value: /^[1-9][0-9]{5}$/,
                message: "Invalid Pincode (Must be 6 digits)",
              },
        })}
        />
        <div className='h-[2px] bg-black-1 w-[380px]'></div>
      </div>

      <div className="flex flex-col w-[380px] mt-8">

  <label className="text-black">Mobile No.</label>
  <div className="bg-[#fbfbfb] flex text-black border-b-[2px] border-black-1 h-8 outline-none">
 
    <select
      {...register("countryCode", { required: true })}
      className="bg-transparent border-r  outline-none"
    >
      <option value="+91">🇮🇳 +91</option>
      <option value="+1">🇺🇸 +1</option>
      <option value="+44">🇬🇧 +44</option>
      <option value="+61">🇦🇺 +61</option>
      <option value="+971">🇦🇪 +971</option>
    </select>

    <input
      type="tel"
      className="w-[380px] px-3 outline-none bg-transparent font-bold"
      {...register("phone", {
        required: true,
        validate:{
            validNumber: (value) =>  /^[0-9]{10}$/.test(value) || 'invalid number' 
        },
        pattern: {
          value: /^[0-9]{10}$/,
          message: "Invalid mobile number (10 digits required)",
        },
      })}
    />
    
  </div>
  </div>

      <input 
      type="submit" 
      value="Submit" 
      className='border w-44 mt-16 h-11 rounded-3xl text-white text-lg cursor-pointer transtion duration-300 bg-black-1'/>
     

    </form>
     </div>
   )
  }
