import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decQuantity, fetchCart, incQuantity, syncCart } from '../store/cartSlice'
import { Cross } from 'lucide-react'

/**
* @author
* @function Cart
**/

export const Cart = ({deliveryCharge=0}) => {
    const userData = useSelector((state)=>state.auth.userData)
    // const userId = userData.$id
    const dispatch = useDispatch()
    const totalItem = useSelector((state)=>state.cart.totalItem)
    const totalAmount = useSelector((state)=>state.cart.totalAmount)
    const cartItems = useSelector((state)=>state.cart.items)

    // syncing data in appwrite
    // useEffect(()=>{
    //     if(userId){
    //         dispatch(fetchCart(userId))
    //         const interval = setInterval(()=>{
    //             dispatch(syncCart())
    //         }, 30000)
    //         return ()=> clearInterval(interval)
    //     }

    // },[userId])



  return(
    <div className='font-syne text-black-1'>
        <div>
            <p className='font-syne text-m font-semibold mt-10 px-5 text-slate-600'><span className='underline cursor-pointer'>T-Shirt Lelo</span> / Cart</p>
        </div>
        <div className='font-extrabold text-2xl mt-14'>
            <h2>SHOPPING CART</h2>
        </div>
{/* Cart Content */}
{/* FIXME: here change it after completing project */}
      {!cartItems.length>0 ?  <div className='flex w-screen mt-10 px-5'>
            <div className='h-[700px] w-2/3 pr-2 py-5'>
            {/* Cart Products */}
            <div className='w-full h-60 border-b flex relative'>
                <div className='px-2 py-2'>
                    <img src="test.jpg" alt="" className='h-full object-cover' />
                </div>
                <div>
                    <div className='flex flex-col py-3 text-black-1 '>
                          {/* FIXME: there fix item.price price will come fomr product id get product and then the product price */}
                        <h3 className='font-syne font-bold text-xl'>{ProductCard.title}</h3>
                        <span className='font-syne text-sm'>{item.color}</span>
                        <span className='font-syne text-sm'>{item.size}</span>
                        {/* FIXME: there fix item.price price will come fomr product id get product and then the product price */}
                        <span className='font-syne text-sm font-bold'>{Product.price}</span>
                        
                    </div>
                    <div className='flex mt-8'>
                        <div>
                            <span className='font-syne text-m font-bold'>Quantity</span>
                            <div className='mt-2 text-lg px-4 border rounded-3xl flex justify-between items-center'>
                                <button onClick={dispatch(decQuantity(item))}>-</button>
                                <span className='mx-7'>1</span>
                                <button onClick={dispatch(incQuantity(item))}>+</button>
                            </div>
                        </div>
                        <div className='absolute right-2 flex justify-center flex-col items-center'>
                            <p className='font-syne font-bold text-lg'>SubTotal</p>
                                {/* FIXME: there fix item.price price will come fomr product id get product and then the product price */}
                            <span>{item.price*item.quantity}</span>
                        </div>
                    </div>
               <button 
               onClick={() => dispatch(removeFromCart(item))} 
               className="text-black/80 hover:text-black text-3xl absolute top-2 right-2"
               >
                  ✖
              </button>
             </div>
            </div>
            {/* card end */}
            
            </div>

            <div className='w-1/3 px-5'>

            {/* //order Summarybox */}
               <div className='w-full mt-5 border h-auto p-2 py-2 px-5 font-raleway'>

                   <h4 className='font-bold font-syne text-xl'>{`Order Summary | ${totalItem} ITEM(S)`}</h4>
                  <div>
                      
                  <div className='flex justify-between font-syne text-[15px] mt-5'>
                        <div><p>Item(s) subtotal</p></div>
                        <div><p>Rs. {totalAmount}</p></div>
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
                <button className='h-14 text-lg w-full rounded-md bg-black-1 text-white'>Continue</button></div>
            </div>
        </div> : <div> Your Cart is empty</div>}
       

    </div>
   )
  }
