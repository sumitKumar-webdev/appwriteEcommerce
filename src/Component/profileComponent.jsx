import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Service from '../Appwrite/Config';
import authService from '../Appwrite/Authentication';
import { logout } from '../store/authSlice'
import { useNavigate } from 'react-router-dom';

export const ProfileComponent = () => {

    const [userDetails, setUserDetails] = useState()
    const [orderItems, setOrderItems] = useState()
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state)=> state.auth?.userData);
    

    


    //fething userDetails from Database
    useEffect(()=>{
        setLoading(true)
        const fetchUserDetails = async () =>{
            try {
                 const response = await Service.getUserInfo(userData.$id);
           setUserDetails(response.documents[0])
            } catch (error) {
                console.error('error fetching user details:', error)
                
            }
        }
        fetchUserDetails();
        setLoading(false)
    },[])

    //fetch Order Items
    useEffect(()=>{
        setLoading(true)
        const fetchOrders = async () =>{
            try {
                const response = await Service.getOrderItems(userData.$id);
                setOrderItems(response.documents)
            } catch (error) {
                console.error('error fetching user details:', error)
            }
        }
        fetchOrders()
        setLoading(false)
    },[userData?.$id])

    //fetch product from Items

    useEffect(()=>{
      if (!orderItems?.length) return;
      setLoading(true)
      const fetchProduct = () =>{
          const productDetails = {...product}
          orderItems.map(async (item)=>{
            if (!productDetails[item.$id]) {
              
              try {
                const productId = item?.productId                
                  const response = await Service.getProduct(productId);
                  productDetails[item?.$id] = response                  
                  setProduct(prev => ({ ...prev, ...productDetails}))
              } catch (error) {
                console.error("Error Fetching Products in profile:", error);   
              }
            }
      })
        }
        fetchProduct();
        setLoading(false)
    },[orderItems])
 
    //Handle Logout

    const handleLogOut = () =>{
      authService.logout()
      .then(()=>dispatch(logout()))
      .catch(error => console.error("Logout failed:", error))
      .finally(()=>navigate('/'))
    }

 const user = {
        name: userData?.name,
        email: userData?.email,
        phone: `${userDetails?.countryCode}  ${userDetails?.phone}`,
        address: userDetails?.address,
      };
      
      

  return(

    <div className="min-h-dvh mx-auto p-6 font-syne">

    <p className="text-black mb-6">
      <span className='text-gray-600 hover:underline hover:text-black cursor-pointer'>Home</span> / Profile
    </p>

    {/* Profile Section */}
    <div className="bg-gray-100 border border-gray-300 p-6 rounded-xl flex justify-between items-center">
      <div className="flex items-center space-x-6">
      <div className="w-20 h-20 flex items-center justify-center rounded-full border border-gray-400 bg-gray-300 text-gray-800 text-4xl font-semibold">
        {user?.name?.charAt(0).toUpperCase()}
      </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-500">{user.phone}</p>
          <p className="text-gray-500">{user.address}</p>
        </div>
      </div>
      <button 
      onClick={handleLogOut}
      className="border border-gray-900 text-gray-900 px-4 py-2 rounded-md hover:bg-gray-900 hover:text-white transition">
        Logout
      </button>
    </div>

    {/* Order History */}
    <h3 className="text-lg font-semibold text-gray-900 mt-10 mb-4">Order History</h3>
    <div className="space-y-4">

    {!loading?( 
      <div>{orderItems?.map((item) => {
        const productDetails = product[item?.$id]        
        
        return(
        <div key={item?.$id} className="border border-gray-300 bg-gray-100 p-4 rounded-lg flex justify-between items-center">
          <div>
            <p className="font-medium text-gray-900">{productDetails?.title}</p>
            <p className="text-gray-600 text-sm">{(item?.$createdAt)?.slice(0,10)}</p>
          </div>
          <p className="text-gray-900 font-medium">{item?.price}</p>
          <p className="text-gray-600">{item?.paymentMethod === 'COD' ? 'Cash on Delivery' : 'UPI'}</p>
          <span
            className={`px-3 py-1 rounded-md text-sm ${
              item.status === "Delivered"
                ? "bg-green-200 text-green-800"
                : item.status === "Shipped"
                ? "bg-blue-200 text-blue-800"
                : "bg-yellow-200 text-yellow-800"
            }`}
          >
            {item.status}
          </span>
        </div>
)})} </div>) : (
  [1, 2, 3, 4].map(()=>(<div className="border border-gray-300 bg-gray-100 p-4 rounded-lg flex justify-between items-center animate-pulse">
  <div className="space-y-2">
    <div className="h-4 w-32 bg-slate-300 rounded"></div>
    <div className="h-3 w-24 bg-gray-300 rounded"></div>
  </div>
  <div className="h-4 w-20 bg-gray-300 rounded"></div>
  <div className="h-6 w-20 bg-gray-400 rounded-md"></div>
</div>))
  
)}
     
    </div>
  </div>
  );
  }
