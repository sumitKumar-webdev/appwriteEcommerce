import './App.css'
import { Footer } from './Component/Footer/Footer.jsx'
import { Header } from './Component/Header/Header.jsx'
import { ImgSlider } from './Component/imgSlider.jsx'
import { OfferBanner } from './Component/OfferBanner/OfferBanner.jsx'
import { Login } from './Component/login.jsx'
import { ProductCard } from './Component/productCard.jsx'
import { Signup } from './Component/signup.jsx'
import { UserInfo } from './Component/userInfo.jsx'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react'
import authService from './Appwrite/Authentication.js'
import { login, logout } from './store/authSlice.js'
import { CategorySection } from './Component/CategorySection.jsx'



function App() {
const [loading, setLoading] = useState(true)
const dispatch = useDispatch();

useEffect(()=>{
  authService.getCurrentUser()
  .then((userData)=> {
    if (userData) {
      dispatch(login(userData));
    }else{
      logout();
    }
  })
  .finally(()=>setLoading(false))
})

  return loading ?(<div></div>) : (
    <div className='min-h-screen flex flex-wrap content-between'>
     {/* <OfferBanner /> */}
     {/* <Header /> */}
       
        <CategorySection />

         {/* <outlet /> */}
 
     {/* <Footer /> */}

  </div>
  )
}

export default App
