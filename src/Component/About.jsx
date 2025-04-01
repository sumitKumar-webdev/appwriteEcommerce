import React from 'react'

/**
* @author
* @function About
**/

export const About = (props) => {
  return(
    <div className="container mx-auto px-4 py-12 font-syne">
        <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
        <div className="text-center text-gray-700 max-w-2xl mx-auto mb-8">
          <p>
            Welcome to T-ShirtLelo.com, your one-stop destination for stylish and premium quality t-shirts.
            We believe in comfort, quality, and affordability, making fashion accessible for everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className='p-7'>
            <img src="https://cloud.appwrite.io/v1/storage/buckets/67cef615000af5d7467d/files/67e57dc800094c819476/view?project=67cee1e8002271eb6b57&mode=admin" alt="Our Team" className="rounded-lg shadow-md" />
          </div>
          <div className="text-gray-700">
            <h2 className="text-2xl text-black font-semibold mb-4">Our Story</h2>
            <p className="mb-4">
              Founded in 2024, T-ShirtLelo.com was born out of a passion for trendy and comfortable apparel.
              Our journey began with a simple idea: to create high-quality t-shirts that resonate with style-conscious
              individuals like you.
            </p>
            <p>
              From classic designs to bold prints, we ensure that every piece tells a story and stands out in your wardrobe.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg shadow-md bg-white">
              <h3 className="font-semibold mb-2">Premium Quality</h3>
              <p>We use the finest fabrics to ensure durability and comfort in every product.</p>
            </div>
            <div className="p-6 border rounded-lg shadow-md bg-white">
              <h3 className="font-semibold mb-2">Affordable Pricing</h3>
              <p>We believe fashion should be accessible, offering great designs at unbeatable prices.</p>
            </div>
            <div className="p-6 border rounded-lg shadow-md bg-white">
              <h3 className="font-semibold mb-2">Customer Satisfaction</h3>
              <p>Your happiness is our priority. We offer easy returns and 24/7 customer support.</p>
            </div>
          </div>
        </div>
      </div>
   )
  }
