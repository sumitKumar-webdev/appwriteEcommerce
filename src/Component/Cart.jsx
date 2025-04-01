import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decQuantity, fetchCart, incQuantity, syncCart, deleteFromAppwrite, removeFromCart } from '../store/cartSlice'
import { Cross } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Service from '../Appwrite/Config'
import { set } from 'react-hook-form'

/**
* @author
* @function Cart
**/

export const Cart = ({deliveryCharge=0}) => {
    const navigate = useNavigate();
    const userData = useSelector((state)=>state.auth.userData)
    const userId = userData?.$id
    const dispatch = useDispatch()
    const totalItem = useSelector((state)=>state.cart.totalItem)
    const totalAmount = useSelector((state)=>state.cart.totalAmount)
    const cartItems = useSelector((state)=>state.cart.items)
    const [product, setProduct ] = useState({});
    const [loading, setLoading] = useState(false);


    
    

    // fetching Cart data in appwrite
    useEffect(()=>{
        if(userId){
            dispatch(fetchCart(userId))
        }
    },[userId])

    //syncing cartData in Database

    useEffect(()=>{
        if (userId && cartItems.length > 0) {
            const interval = setInterval(()=>{
            dispatch(syncCart())
        }, 30000)
        return ()=> clearInterval(interval)
        }
    },[cartItems, userId])

    //fetch Products details
    useEffect(()=>{
        setLoading(true)
        let productData = {...product};
        const fetchProduct = async () => {
        for(const item of cartItems){
            if (!productData[item.product_id]) {
                
                try {
                    const productId = item?.product_id;                                       
                    const response = await Service.getProduct(productId);
                    productData[productId] = response                
                } catch (error) {
                    console.error("Error Fetching Products:", error);            
                }
                
            }
        }
        console.log(productData);
        setProduct(prev => ({ ...prev, ...productData }));
        setLoading(false)
    };
    if (cartItems.length>0) {
        fetchProduct()
    }else{
        setLoading(false)
    }
    },[])



  return(
    <div className='font-syne mb-40 text-black-1 '>
        <div className='caret-transparent'>
            <p className='font-syne text-m font-semibold mt-7 px-5'>
                <span
                onClick={()=>navigate('/')}
                className='hover:underline hover:text-black cursor-pointer text-slate-600'>
                    T-Shirt Lelo
                </span> / Cart</p>
        </div>
        <div className='font-extrabold text-xl mt-14 px-5'>
            <h2>SHOPPING CART</h2>
        </div>
{/* Cart Content */}

      {cartItems.length>0 ?  <div className='flex w-screen mt-10 px-5'>
            <div className='min-h-[700px] w-2/3 pr-2 py-5'>
            {/* Cart Products */}

            {!loading ?  (cartItems.map((item, index)=>{
                const productDetail = product[item?.product_id];      
               const imgId = productDetail?.productImg[0];                           
                const imgUrl = imgId? Service.getProductImg(imgId) : null;                  
                
                return(
                <div key={`${index}-${item?.size || "NA"}-${item?.$id}`} className='w-full h-60 border-b flex relative'>
                <div className='px-2 py-2'>
                    <img src={imgUrl} alt={productDetail?.title} className='h-full object-cover' />
                </div>

                <div>
                    <div className='flex flex-col py-3 text-black-1 '>
                        <h3 className='font-syne font-bold text-xl'>{productDetail?.title}</h3>
                        <span className='font-syne text-sm'>Color : {item?.color}</span>
                        <span className='font-syne text-sm'>Size : {item?.size?.toUpperCase()}</span>
                        <span className='font-syne text-sm font-bold'>Rs. {productDetail?.price}</span>
                        
                    </div>
                    <div className='flex mt-8'>
                        <div>
                            <span className='font-syne text-m font-bold'>Quantity</span>
                            <div className='mt-2 text-lg px-4 caret-transparent border rounded-3xl flex justify-between items-center'>
                                <button onClick={()=>dispatch(decQuantity(item))}>-</button>
                                <span className='mx-7'>{item.quantity}</span>
                                <button onClick={()=>dispatch(incQuantity(item))}>+</button>
                            </div>
                        </div>
                        <div className='absolute right-2 flex justify-center flex-col items-center'>
                            <p className='font-syne font-semibold text-xl'>SubTotal</p>
                            <span className='text-xl'><big>{productDetail?.price*item.quantity}</big></span>
                        </div>
                    </div>
               <button 
               onClick={() =>{
                userId ?  dispatch(deleteFromAppwrite(item)) : dispatch(removeFromCart(item))}} 
               className="text-black/60 hover:text-black text-xl absolute top-2 right-2"
               >
                  ✖
              </button>
             </div>
            </div>)
        })) : (<div className="w-full flex gap-4 p-4 animate-pulse">
            <div className="w-52 h-52 bg-gray-300 rounded-md"></div>
    
            <div className="flex flex-col flex-grow mt-2 space-y-4">
                <div className="w-3/4 h-9 bg-gray-300 rounded"></div> 
                <div className="w-1/2 h-7 bg-gray-300 rounded"></div>
                <div className="w-1/3 h-6 bg-gray-300 rounded"></div>
                
                <div className="w-20 h-5 bg-gray-300 rounded-md"></div>
            </div>
        
            <div className="w-16 h-6 bg-gray-300 rounded"></div>
        </div>)
        }
           
            
        
            
            </div>

            <div className='w-1/3 px-5'>

            {/* //order Summarybox */}
               <div className='w-full mt-5 border h-auto p-2 py-2 px-5 font-raleway'>

                   <h4 className='font-bold font-syne text-xl'>{`Order Summary | ${totalItem} ITEM(S)`}</h4>
                  <div>
                      
                  <div className='flex justify-between font-syne text-[15px] mt-5'>
                        <div><p>Item(s) subtotal</p></div>
                        <div><p>Rs.{totalAmount}</p></div>
                   </div>

                  <div className='flex font-syne justify-between text-sm '>
                        <div>
                            <p>Delivery fee</p>
                        </div>
                        <div className='flex'> 
                            <p>
                                {deliveryCharge > 0 ? `Rs. ${deliveryCharge}` : 'Free'}
                            </p>
                        </div>


                   </div>
                        <div className='my-6 border border-black/80 border-dashed'></div>

                  <div className='flex  font-syne justify-between text-lg font-semibold '>
                        <div><p>Grand Total</p></div>
                        <div><p>Rs. {totalAmount+deliveryCharge}</p></div>
                   </div>
                   <p className='text-gray-600  font-syne'>(Inclusive of all taxes)</p>
                   <div className='my-5 border  border-black/80 border-dashed'></div>
                   <p className='font-syne'>Average delivery time: 3-5 days</p>
                   <div className='h-16 p-1 border rounded-sm bg-green-100'>
                    <p className='text-green-700 text-m font-syne'>You have saved total 10% on your order! Yay!</p>
                    </div>


                       
                 </div>

               </div>
               {/* boc Ended */}
               <div className='w-full h-20 flex items-center border p-2'>
                <button 
                onClick={()=>(dispatch(setCheckoutItem(cartItems)),navigate('/order'))}
                className='h-14 text-lg w-full rounded-md bg-black-1 text-white'>Continue</button></div>
            </div>
        </div> : 
        <div className='w-screen flex justify-center'>
         <div className='flex flex-col justify-center items-center mt-16'>
            <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 383.997 383.997"
        className="w-40 text-gray-500 hover:text-gray-900 transition-colors"
        fill="currentColor"
      >
        <path d="M71.997 80h-24a7.997 7.997 0 0 0-7.88 9.367l27.824 160.001a8.008 8.008 0 0 0 7.848 6.633l244.176.999a7.991 7.991 0 0 0 7.584-5.371l56-161A7.999 7.999 0 0 0 375.997 80h-248c-4.416 0-8 3.584-8 8s3.584 8 8 8h236.744l-50.424 144.975-231.76-.946L57.509 96h14.488c4.416 0 8-3.584 8-8s-3.584-8-8-8z" />
        <path d="M103.997 80h-8c-4.416 0-8 3.584-8 8s3.584 8 8 8h8c4.416 0 8-3.584 8-8s-3.584-8-8-8z" />
        <path d="m7.997 39.996 23.535.009 41.972 241.364a8.017 8.017 0 0 0 7.885 6.635l134.609.001c4.412 0 7.996-3.591 7.996-8.004 0-4.413-3.578-8.005-7.998-8.006l-127.883.002c.008.001-41.972-241.364-41.972-241.364a8.017 8.017 0 0 0-7.885-6.635H7.995C3.584 23.998 0 27.589 0 32.002c0 4.413 3.585 7.994 7.997 7.994zM240.001 287.998l7.993.007c4.42.001 8.004-3.591 8.004-8.003 0-4.413-3.586-8.006-7.998-8.006l-8 .005a8 8 0 1 0 .001 15.997zM271.996 287.998l16.002.002c4.412 0 7.996-3.591 7.996-8.004a7.995 7.995 0 0 0-7.997-7.994L271.995 272c-4.412 0-7.996 3.579-7.996 8.004 0 4.413 3.586 7.994 7.997 7.994zM111.997 296c-17.664 0-32 14.336-32 32s14.336 32 32 32 32-14.336 32-32-14.336-32-32-32zm0 16c8.832 0 16 7.168 16 16s-7.168 16-16 16-16-7.168-16-16 7.168-16 16-16zM271.997 296c-17.664 0-32 14.336-32 32s14.336 32 32 32 32-14.336 32-32-14.336-32-32-32zm0 16c8.832 0 16 7.168 16 16s-7.168 16-16 16-16-7.168-16-16 7.168-16 16-16z" />
            </svg>
            <span className='font-syne font-semibold'>Your cart is empty</span>
            <span className='font-syne text-gray-600'>Looks like you haven't made your choice yet..</span>
           
            <button
            onClick={()=>navigate('/')}
             className='h-10 w-44 mt-10 rounded-lg bg-black-1 text-white' >Back to homepage</button>
         </div>
        </div>
        }
       

    </div>
   )
  }
