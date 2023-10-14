import React from 'react'
import '../css/Trending.css';
import TrendingCard from '../components/TrendingCard'
import MostReadCard from '../components/MostReadCard';


const Trending = () => {
  return (
    <div className='trending'>
        <div className="trending-card-container">
          <TrendingCard/>
        </div>
        <div className="most-read-container">
          <MostReadCard/>
        </div>
    </div>
  )
}

export default Trending