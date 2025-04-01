import { Outlet } from 'react-router-dom'
import './App.css'
import { Footer } from './Component/Footer/Footer.jsx'
import { Header } from './Component/Header/Header.jsx'
import { OfferBanner } from './Component/OfferBanner/OfferBanner.jsx'








function App() {


  return(
    <div className="flex flex-col min-h-screen">
      <OfferBanner />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
