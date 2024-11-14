import React from 'react'
import ImageSlider from '../components/ImageSlider'
import Movies from '../components/Movies'
import CustomerForm from '../components/CustomerForm'

const Home = () => {
  return (
    <div>
        <ImageSlider/>
        <Movies/>
        <CustomerForm/>
    </div>
  )
}

export default Home