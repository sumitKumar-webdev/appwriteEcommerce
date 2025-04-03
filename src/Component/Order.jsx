import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import Service from "../Appwrite/Config";

const Order = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState();
  const navigate = useNavigate();
  const Items = useSelector((state)=>state.cart.checkoutItems);
  console.log('Items' , Items);

  const UserData = useSelector((state)=> state.auth.userData)  
  const totalAmount = Items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  useEffect(()=>{
    setLoading(true)
    let productData = {...product};
    const fetchProduct = async () => {
    for(const item of Items){
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
    setProduct(prev => ({ ...prev, ...productData }));
    setLoading(false)
  };
  fetchProduct();
  },[Items])


  //getting user info
  useEffect(()=>{
    const fetchUserInfo = async () => {
    const userInfo = await Service.getUserInfo(UserData.$id)
    setUserInfo(userInfo.documents[0])
}
fetchUserInfo();
  },[])



  

  const handleProceed = async () => {
    try {
       await Promise.all(Items.map((item)=>Service.storeOrder({
        userId:UserData?.$id,
        productId: item?.product_id,
        quantity: item?.quantity,
        paymentMethod: paymentMethod,
        status: 'Shipped'
       })))
    
    } catch (error) {
      console.error("Error storing orders:", error);
    }
    if (paymentMethod === "COD") {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/profile");
      }, 3000);
    } else {
      navigate("/payment-gateway");
    }
    
   
  };


  return (
    <div className="p-4 w-full relative min-h-[800px] font-syne mx-auto">
      <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
      {loading ? (
       <div>
       {[1, 2, 3].map((index) => (
         <div key={index} className="flex items-center gap-4 border-b py-3 animate-pulse">
           <div className="w-16 h-16 bg-gray-300 rounded-md"></div>
           <div className="flex-1 space-y-2">
             <div className="h-4 w-3/4 bg-gray-300"></div>
             <div className="h-4 w-1/2 bg-gray-300"></div>
           </div>
           <div className="h-4 w-12 bg-gray-300"></div>
         </div>
       ))}
     </div>
      )  : (
      <div className="border rounded-lg p-4 bg-white shadow">
        
        {Items.map((item, index) => {
           const productDetail = product[item?.product_id];           
          const imgId = productDetail?.productImg[0];                           
           const imgUrl = imgId? Service.getProductImg(imgId) : null;  
          
          return (
          <div key={index} className="flex items-center gap-4 border-b py-3">
            <img src={imgUrl} alt={productDetail?.title} className="w-24 h-24 rounded-md" />
            <div className="flex-1">
              <p className="font-semibold text-lg">{productDetail?.title}</p>
              <p className="text-gray-500 text-[17px]">Size: {(item?.size)?.toUpperCase()}</p>
              <p className="text-gray-500 text-[17px]">Color: {(item?.color)?.toUpperCase()}</p>
              <p className="text-gray-500 text-[17px]">Rs. {productDetail?.price}</p>
            </div>
            <p className="font-semibold">Qty: {item.quantity}</p>
          </div>)
})}
        <div className="mt-4 font-semibold text-lg">Total: Rs. {totalAmount}</div>
      </div>
      )}

      <h2 className="text-xl font-semibold mt-6">Shipping Details</h2>
      <div className="mt-2 space-y-3">
        <p className="border p-2 rounded">{UserData.name}</p>
        <p className="border p-2 rounded">{userInfo?.countryCode} {userInfo?.phone}</p>
        <p className="border p-2 rounded">{userInfo?.address}</p>
        <p className="border p-2 rounded">{userInfo?.pincode}</p>
      </div>

      <h2 className="text-xl font-semibold mt-6">Payment Options</h2>
      <div className="mt-3 p-4 border rounded-lg bg-white shadow space-y-3">
        <div className="flex items-center gap-2">
          <input name="payment" type="radio" id="COD" className="w-5 h-5" onChange={() => setPaymentMethod("COD")} />
          <label htmlFor="COD" className="text-lg font-medium">Cash On Delivery</label>
        </div>
        <div className="flex items-center gap-2">
          <input name="payment" type="radio" disabled id="upi" className="w-5 h-5" onChange={() => setPaymentMethod("UPI")} />
          <label htmlFor="upi" className="text-lg font-medium line-through">UPI (Razor Pay)</label>
          Currently Unavailable 
        </div>
      </div>

      <button 
      onClick={handleProceed}
      disabled={loading || !paymentMethod}
      className={`w-full mt-6 py-2 rounded text-white ${!paymentMethod ? "bg-gray-500 cursor-not-allowed" : "bg-black"} ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>{loading ? "Processing..." : paymentMethod === "COD" ? "Confirm" : "Proceed To Payment"}
</button>
      
      {showPopup && (
  <div
    className="absolute  inset-0 flex items-center justify-center min-w-full min-h-full bg-black bg-opacity-50"
    onClick={() => setShowPopup(false)}
  >
    <div
      className="bg-green-100 p-6 rounded-lg shadow-lg text-center border-2 border-green-500"
      onClick={(e) => (e.stopPropagation(), navigate('/'))}
    >
      <h2 className="text-xl font-bold text-green-700"> Order Confirmed!</h2>
      <p className="mt-2 text-green-600">Your order has been placed successfully.</p>
      <p className="text-green-600">Delivery expected in the next 3 days.</p>
    </div>
  </div>
)}
    </div>
  );
};

export default Order;
