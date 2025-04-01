import React from 'react'
import { CategorySection } from '../Component/CategorySection'
import Container from '../Component/Container/Container'
import { useParams } from 'react-router-dom'

/**
* @author
* @function Products
**/

export const AllProductsPage = () => {
  const {category} = useParams();
  const title = " T-Shirts"
  return(
    <Container>
    <CategorySection
    sectionTitle={category+title}
    Category={category}
    limit={'5'}
    button={false} />
    </Container>


   )
  }
