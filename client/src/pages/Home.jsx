import React from 'react'
import Navbar  from '../components/Navbar.jsx'
import Slider from '../components/Slider.jsx'
import ProductList from '../components/ProductList.jsx'
import RecommendationPanel from '../components/RecommendationPanel.jsx'
import Footer from '../components/Footer.jsx'

const Home = () => {
  return (
    <div>
    <Slider />
    <ProductList />
    <RecommendationPanel />
    </div>
  )
}

export default Home
