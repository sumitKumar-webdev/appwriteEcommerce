import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Service from '../Appwrite/Config';
import { CategorySection } from './CategorySection';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, setCheckoutItem } from '../store/cartSlice';
import { fetchProduct } from '../store/productSlice';
import { Loader } from './loader';


export const ProductComponent = ({discount=20}) => {
    const navigate = useNavigate();
    const [selectdSize, setSelectdSize] = useState();
    const [selectColor, setSelectColor] = useState();
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    
  const { productId } = useParams();

  
    const { product, status }= useSelector((state)=>state.product)

    
    useEffect(() => {
        if (product?.Color?.length) {
          setSelectColor(product.Color[0]);
           }
        }, [product]);

    useEffect(() => {
      dispatch(fetchProduct(productId))
    },[productId, dispatch]);


// Product Images urls
const productImgIds = product?.productImg;
const productImgUrls = productImgIds?.map((id)=>(Service.getProductImg(id)));
console.log(productImgUrls);


// main Img
const [mainImg , setMainImg] =useState();

useEffect(()=>{
  if (productImgUrls?.length) {
    setMainImg(productImgUrls?.[0])
  }
},[product])

    const handleSizeSelection = (size) => {
      setSelectdSize(size);
      setError(false)
    }

    const handleAddToCart = () =>{
      if(!selectdSize){
        setError(true)
        return
      }
      dispatch(addToCart({
       product_id: productId,
       price: product.price,
       quantity: 1,
       size: selectdSize,
      color: selectColor
    }))}

    
    const handleBuyNow = () =>{
      if(!selectdSize){
        setError(true)
        return
      }
      dispatch(setCheckoutItem([{
        product_id: productId,
       price: product.price,
       quantity: 1,
       size: selectdSize,
      color: selectColor
      }]))
      navigate('/order')
      
    }


    // default size 
    const size = product?.Size || ["s", "m"];

  return !(status=='loading') ?
    (<div className='flex flex-col justify-center'>
        <p className='font-syne caret-transparent mt-5 text-black'>
    
         
            <span 
             onClick={()=>navigate('/')} 
            className='text-gray-600 cursor-pointer hover:underline hover:text-black' >HOME</span>
            /
            <span className='text-gray-600 hover:underline hover:text-black cursor-pointer'> PRODUCTS </span>
            /
            <span className='text-gray-600 hover:underline hover:text-black cursor-pointer' onClick={()=>navigate(`/products/${product?.category}`)}>{` ${product?.category.toUpperCase()} T-SHIRTS `} </span> / {`  ${product?.title.toUpperCase()}`}
        </p>
        
       <div className='flex w-full p-10 justify-center'>
        {/* left side for images */}
          <div className='h-[600px] flex justify-center flex-grow sm:px-5 lg:pl-16'>
          {/* side Images */}
             <div className='h-full flex flex-col gap-5'>
             {productImgUrls?.map((imgUrl, index)=>(
              <img 
              src={imgUrl} 
              key={index} 
              className={`h-48 w-32 p-1 cursor-pointer ${ (mainImg?.href === imgUrl.href || (!mainImg && imgUrl === productImgUrls?.[0])) 
                ? 'border border-black' 
                : 'border border-transparent'} `}
              onClick={()=>(setMainImg(imgUrl))}
              />

            ))
          }
             </div>
          {/* Main Image */}
          <div className='flex justify-center'>
          <img src={mainImg || productImgUrls?.[0]} 
          alt={product?.title} 
          className='h-full w-[80%]'/>
          </div>
          </div>

          {/* right side area for details */}
          <div className='w-1/2 h-[550px] font-syne px-2'>
          <h1 className='md:text-lg lg:text-2xl font-bold'>{product?.title || 'Unknown'}</h1>
          <div className='font-semibold md:text-sm lg:text-xl mt-2'>
            <span>Rs.{product?.price || '100'}</span>
            <span className='px-2  text-gray-600 line-through'>Rs.{Math.round((product?.price || 100) * (1 + discount / 100))}</span>
            <span className='text-green-500'>({discount}% OFF)</span>
            <p className='text-gray-500 font-thin text-xs'>Tax Included Shipping Calculated at Checkout</p>
        </div>

        {error ? <p className='font-syne text-red-600 text-sm mt-2 transition animate-bounce'>Please select size</p> : null}

        <div className='mt-4'>
            <p className='text-sm text-black-1 font-semibold'>Available Color</p>
            
            {/* Color Selection */}
            <div className='flex gap-2 mt-2'>
            {product?.Color?.map((color,index)=>(
              <div 
              key={index}
                 className={`w-10 h-8 flex items-center justify-center rounded-full cursor-pointer transition-all border caret-transparent  ${(selectColor === color) ? "border-2 p-1 border-black " : "border-2 border-transparent"}`}
                 style={{backgroundColor: color}}
                 onClick={() => setSelectColor(color)}
                >
              </div>
               )
             )
            }
            </div>
            {/* Size Selecion*/}
            <div className='mt-4'>
            <p className='text-sm text-black-1 font-semibold'>Size </p>
            <div className='flex gap-2 mt-2'>
              {size.map((size,index)=>(

             <label key={index} htmlFor={`size-${index}`} className="cursor-pointer">
              <input
               id={`size-${index}`}
               type="radio"
               name="size"
               value={size}
               onClick={()=>handleSizeSelection(size)}
               className="hidden peer"
              />
            <div
            className="h-8 w-10 text-lg flex justify-center caret-transparent items-center border 
             transition-all duration-300 peer-checked:bg-black peer-checked:text-white 
             peer-checked:rounded-xl ">{size.toUpperCase()}
             </div>
             </label>
                ))}

            </div>
            </div>

            <div className='flex gap-16 mt-16'>
              <button 
              type="button" 
              onClick={handleAddToCart}
              className='border border-black-1 w-56 h-12 rounded-xl  text-lg cursor-pointer hover:scale-105 transtion duration-300'>Add to Cart</button>
              <button onClick={handleBuyNow} type="button" className='border border-black-1 w-56 h-12 rounded-xl text-white bg-black-1 hover:scale-105 text-lg cursor-pointer transtion duration-300'>Buy Now</button>
              </div>

{/* Badges */}
             <div className='my-2 mt-8 border w-[500px] border-black/80 '></div>
             <div className='flex text-center gap-10'>
              
              <div className=' flex items-center flex-col'>
                {/* Badge 1 */}
              <svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 511.934 511.934"
               className="h-14 text-gray-800"
               fill="currentColor" >
                <path d="M381.822 223.199a7.503 7.503 0 0 0 8.852-5.861 139.256 139.256 0 0 0 2.793-27.788c0-76.046-61.682-137.915-137.5-137.915s-137.5 61.869-137.5 137.915 61.682 137.915 137.5 137.915c51.678 0 98.521-28.632 122.248-74.722 1.9-3.692.458-8.23-3.223-10.136-3.68-1.907-8.205-.458-10.105 3.232-21.142 41.068-62.877 66.58-108.919 66.58-67.547 0-122.5-55.119-122.5-122.87s54.953-122.87 122.5-122.87 122.5 55.119 122.5 122.87c0 8.343-.837 16.677-2.489 24.771-.831 4.071 1.786 8.046 5.843 8.879z" />
                <path d="M339.413 161.572a7.506 7.506 0 0 0-6.069-5.122l-48.88-7.023-21.764-44.459c-2.486-5.525-10.98-5.524-13.465 0l-21.764 44.458-48.88 7.023c-6.014.665-8.627 8.772-4.161 12.843l35.429 34.5-8.446 48.798c-1.228 5.924 5.634 10.946 10.893 7.939l43.661-23.137 43.661 23.137c5.251 3.007 12.124-2.015 10.893-7.939l-8.446-48.798 35.429-34.5a7.533 7.533 0 0 0 1.909-7.72zm-50.629 34.195a7.538 7.538 0 0 0-2.166 6.684l6.511 37.619-33.659-17.837a7.484 7.484 0 0 0-7.007 0l-33.659 17.837 6.511-37.619a7.536 7.536 0 0 0-2.166-6.684l-27.313-26.597 37.683-5.415a7.502 7.502 0 0 0 5.669-4.131l16.778-34.273 16.778 34.273a7.504 7.504 0 0 0 5.669 4.131l37.683 5.415z" />
                <path d="m466.437 447.153-73.305-127.352c32.098-33.988 51.815-79.852 51.815-130.252C444.946 85.031 360.171 0 255.967 0c-32.061 0-63.735 8.201-91.6 23.717-3.622 2.017-4.928 6.596-2.917 10.229 2.01 3.631 6.576 4.941 10.197 2.926 25.643-14.279 54.8-21.826 84.32-21.826 95.933 0 173.979 78.283 173.979 174.504 0 96.222-78.046 174.505-173.979 174.505S81.988 285.772 81.988 189.549c0-51.62 22.607-100.309 62.026-133.581 3.169-2.675 3.576-7.421.909-10.599a7.482 7.482 0 0 0-10.567-.912c-42.813 36.137-67.368 89.021-67.368 145.092 0 50.486 19.783 96.422 51.978 130.428l-20.761 36.067c-4.975 8.35 8.189 16.07 12.99 7.523l18.873-32.787c22.579 20.271 50.027 35.185 80.345 42.74l-64.719 112.434-16.555-52.261a7.5 7.5 0 0 0-8.755-5.07l-53.401 11.75 26.71-46.403c2.071-3.598.842-8.199-2.745-10.276a7.487 7.487 0 0 0-10.245 2.753l-35.208 61.166c-3.34 5.373 1.964 12.674 8.102 11.11l63.317-13.933 19.629 61.966c1.716 6.096 10.646 7.089 13.643 1.483l75.719-131.547a188.928 188.928 0 0 0 30.059 2.408c10.313 0 20.431-.846 30.3-2.448l45.477 79.007a7.49 7.49 0 0 0 6.502 3.762 7.449 7.449 0 0 0 3.743-1.009c3.587-2.078 4.816-6.678 2.745-10.276l-42.982-74.673c30.305-7.593 57.734-22.54 80.288-42.839l62.909 109.29-53.401-11.75c-3.786-.833-7.581 1.365-8.755 5.07l-16.555 52.261-4.004-6.956a7.488 7.488 0 0 0-10.245-2.753c-3.587 2.078-4.816 6.678-2.745 10.276l12.501 21.719c2.998 5.607 11.927 4.612 13.643-1.483l19.629-61.966 63.317 13.933c6.144 1.558 11.444-5.738 8.106-11.112z" />
              </svg>
              <span className='mt-1 font-bold'>Trusted Source</span>
                </div>
                <div className=' flex items-center flex-col'>
                  {/* badge 2*/}
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 28 28"
                  fill="currentColor"
                  className="h-14 text-black"
                  >
                    <g data-name="Layer 2">
                      <path d="M26.186 5.536l-5-2a.5.5 0 0 0-.372 0l-5 2A.5.5 0 0 0 15.5 6v5.168a5.529 5.529 0 0 0 2.671 4.718l2.572 1.543a.5.5 0 0 0 .514 0l2.243-1.346v5.6a.821.821 0 0 1-.82.82H3.32a.821.821 0 0 1-.82-.82V10.5H14a.5.5 0 0 0 0-1H2.5V8.32a.821.821 0 0 1 .82-.82H14a.5.5 0 0 0 0-1H3.32A1.821 1.821 0 0 0 1.5 8.32v13.36a1.821 1.821 0 0 0 1.82 1.82h19.36a1.821 1.821 0 0 0 1.82-1.82V15.4a5.529 5.529 0 0 0 2-4.234V6a.5.5 0 0 0-.314-.464zm-.686 5.632a4.522 4.522 0 0 1-2.186 3.86L21 16.417l-2.314-1.389a4.522 4.522 0 0 1-2.186-3.86v-4.83l4.5-1.8 4.5 1.8z" />
                      <path d="M19.354 9.732a.5.5 0 0 0-.708.707l1.334 1.333a.5.5 0 0 0 .707 0l2.667-2.667a.5.5 0 0 0-.708-.707l-2.313 2.314zM5 19.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1z" />
                    </g>
                   </svg>
                   <span className='mt-1 font-bold'>Secure Payment</span>
                </div>
                <div className=' flex items-center flex-col'>
                  {/*Badge3  */}
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  className="h-14 fill-current text-black">
                    <path d="M16 40a1 1 0 0 1-.064-2c1.026-.165 8.2-2.587 10.115-8.318.354-1.06.65-2.012.914-2.864C28.333 22.422 29.086 20 33 20c4 0 4 6.26 4 10 0 3.567-3.088 7.461-3.22 7.625a1 1 0 0 1-1.561-1.25C32.247 36.341 35 32.861 35 30c0-2.394 0-8-2-8-2.359 0-2.735.946-4.125 5.414-.268.863-.568 1.828-.926 2.9C25.584 37.409 16.677 40 16 40Z" />
                    <path d="M44 44h-4a1 1 0 0 1 0-2h4a2 2 0 0 0 0-4H33a1 1 0 0 1 0-2h11a4 4 0 0 1 0 8Z" />
                    <path d="M43 50h-3a1 1 0 0 1 0-2h3a2 2 0 0 0 0-4h-3a1 1 0 0 1 0-2h3a4 4 0 0 1 0 8Z" />
                    <path d="M42 56h-2a1 1 0 0 1 0-2h2a2 2 0 0 0 0-4h-2a1 1 0 0 1 0-2h2a4 4 0 0 1 0 8Z" />
                    <path d="M41 62H16a1 1 0 0 1 0-2h25a2 2 0 0 0 0-4h-1a1 1 0 0 1 0-2h1a4 4 0 0 1 0 8Z" />
                    <path d="M16 64H6a1 1 0 0 1-1-1V35a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v28a1 1 0 0 1-1 1Zm-9-2h8V36H7Z" />
                    <path d="M20.4 26a1.978 1.978 0 0 1-1.381-.558L16 22.533l-3.019 2.909a1.989 1.989 0 0 1-3.16-2.32l1.8-3.6-3.371-1.345A1.979 1.979 0 0 1 7 16.33v-.341A1.992 1.992 0 0 1 8.989 14h4.191l.68-3.4A2 2 0 0 1 15.811 9h.36a1.988 1.988 0 0 1 1.959 1.64l.6 3.379L23 14h.007A1.989 1.989 0 0 1 25 15.993v.337a1.977 1.977 0 0 1-1.252 1.847l-3.368 1.348 1.8 3.6A1.99 1.99 0 0 1 20.4 26Z" />
                    <path d="M54.4 26a1.978 1.978 0 0 1-1.381-.558L50 22.533l-3.019 2.909a1.989 1.989 0 0 1-3.16-2.32l1.8-3.6-3.37-1.348A1.979 1.979 0 0 1 41 16.33v-.341A1.992 1.992 0 0 1 42.989 14h4.191l.68-3.4A2 2 0 0 1 49.811 9h.36a1.988 1.988 0 0 1 1.959 1.64l.6 3.379L57 14h.007A1.989 1.989 0 0 1 59 15.993v.337a1.977 1.977 0 0 1-1.252 1.847l-3.368 1.348 1.8 3.6A1.99 1.99 0 0 1 54.4 26Z" />
                    <path d="M38.375 20a2.076 2.076 0 0 1-1.293-.454L33 16.281l-4.082 3.265a2.132 2.132 0 0 1-3.022-.477 2.064 2.064 0 0 1-.176-1.956l1.932-4.508-4.237-1.412A2.069 2.069 0 0 1 22 9.228v-.3a2.081 2.081 0 0 1 1.778-2.05l5.469-.778 1.56-4.682A2.069 2.069 0 0 1 32.772 0h.456a2.069 2.069 0 0 1 1.965 1.416l1.56 4.684 5.469.781A2.081 2.081 0 0 1 44 8.929v.3a2.069 2.069 0 0 1-1.416 1.965l-4.237 1.412 1.932 4.508A2.072 2.072 0 0 1 38.375 20Z" />
                    </svg>
                   <span className='mt-1 font-semibold'>Good Quality</span>

                </div>
             </div>
             <div className='my-2 border w-[500px] border-black/80 '></div>
              

            
        </div>
          
          
          </div>
       </div>
       <div className='w-full flex flex-col items-center mt-40 mb-20'>
        <div className=' flex justify-center font-syne text-3xl font-bold'>
          <h3>Related Products</h3>
          </div>
          <CategorySection 
          sectionTitle='' 
          limit= {4} 
          Category= {product?.category}
          button={false}
          />
        
       </div>
    </div>
    ) : (<Loader />)
   
  }
