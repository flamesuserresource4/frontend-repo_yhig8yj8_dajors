import React from 'react'
import Hero from './components/Hero'
import FeaturedCollections from './components/FeaturedCollections'
import ProductGrid from './components/ProductGrid'
import BrandStory from './components/BrandStory'
import Guarantee from './components/Guarantee'
import Newsletter from './components/Newsletter'
import SiteFooter from './components/SiteFooter'

function App() {
  return (
    <div className="min-h-screen w-full bg-[#050509] text-white">
      <Hero />
      <FeaturedCollections />
      <ProductGrid />
      <BrandStory />
      <Guarantee />
      <Newsletter />
      <SiteFooter />
    </div>
  )
}

export default App