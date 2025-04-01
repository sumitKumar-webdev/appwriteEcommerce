import React, { useEffect, useState } from 'react'
import { ProductCard } from './productCard'
import Service from '../Appwrite/Config';
import { useNavigate } from 'react-router-dom';


export const CategorySection = ({Category='Oversized',limit=4, sectionTitle='Oversized T-Shirt', button=true}) => {
    const navigate =useNavigate();
    const [products, setProducts] = useState([]);
   

    useEffect(()=>{
        const fetchProducts = async ()=>{
            try {
                const response = await Service.getAllProducts(Category,limit);
                   setProducts(response.documents)
            
            } catch (error) {
                console.log('Category Section || Fetch Products', error);
                
            }          
        }
          fetchProducts();
    },[Category, limit]);


  return(
    <div className='w-full mt-10 px-4 py-6 md:px-6 lg:px-8 flex flex-col mb-16'>
         <div className='flex content-start'>
               <h2 className='text-black-1 font-syne font-bold text-2xl md:text-3xl'>{sectionTitle}
              </h2>
         </div>
           
            <div className='flex justify-center mt-6'> 
            <div className='grid sm:grid-cols-1 sm:gap-20 sm:mt-10 md:grid-cols-2 lg:grid-cols-4 gap-10'>
                {products ? (products.map((product)=>{
                    const productImages = product.productImg;
                    const imgId = productImages[0]
                    const imgUrl = Service.getProductImg(imgId);
                    
                    return (
                        <div 
                        onClick={()=>(navigate(`/product/${product.$id}`), window.scrollTo({top: 0, behavior: 'instant'}))}
                        className='flex justify-center' 
                        key={product.$id}> 
                        <ProductCard
                        width={'300' }
                        // key={product.$id} 
                        title={product.title}
                        price={product.price}
                        imgSrc={imgUrl.href}
                        className=' sm:w-60 md:w-72 lg:w-[300px] caret-transparent' 
                    /></div>
                      
                    )
                   }))
                 : <p className='col-span-full text-center text-gray-500'>No Product Found</p>
                }
                
            </div>
        </div>
        {button &&  <div className='flex justify-center overflow-hidden'>
            <button type="button" className='bg-black-1 mt-32 border w-36 h-14 rounded-3xl text-white text-lg cursor-pointer transtion duration-300' onClick={()=>navigate(`/products/${Category}`)}>View All</button>
        </div> }

       
        

    </div>
   )
  }
