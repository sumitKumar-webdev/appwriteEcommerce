import React from 'react'
import { ImgSlider } from '../Component/imgSlider'
import { CategorySection } from '../Component/CategorySection'

/**
* @author
* @function Home
**/

export const HomePage = (props) => {
  return(
    <>
    <ImgSlider />
    <CategorySection
    sectionTitle='Oversized T-Shirts' 
    Category='Oversized'/>

    <CategorySection 
    sectionTitle='Regular T-Shirts'
    Category='Regular'/>


   </>
   )
  }
