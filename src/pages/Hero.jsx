import React from 'react'
import '../css/Hero.css'
import heroImg from '../assets/images/hero_image.png'
import Button from 'react-bootstrap/Button';

const Hero = () => {
  return (
    <div className='hero-container'>
        <div className="hero-content">
            <h1>From You <br /> To The World</h1>
           <div className="hero-content-text">
           <p>Lorem ipsum dolor sit amet consectetur. Elementum diam volutpat ultrices nisi. Ligula eu aliquet sagittis sit. In justo lectus at rhoncus faucibus nulla sapien.</p>
            <Button className='button-primary'>Get Started</Button>
           </div>
        </div>
        <div className="hero-image">
            <img src={heroImg} alt="" />
        </div>
    </div>
  )
}

export default Hero