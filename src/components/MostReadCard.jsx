import '../css/TrendingCard.css'
import '../css/MostReadCard.css'
import React from 'react'
import cardImg1 from '../assets/images/Frame 21.png'
import cardImg2 from '../assets/images/Frame 21 (1).png'
import cardImg3 from '../assets/images/Frame 21 (2).png'
import views from '../assets/images/ep_view.png'
import dot from '../assets/images/dot.png'

const MostReadCard = () => {
  return (
    <div className='most-readCard'>
      <h2>Most Read</h2>
      <div className='d-flex flex-column gap-5'>
      <div className="most-read-card">
        <div className="img-most">
        <img src={cardImg1} alt="most-read1" />
        </div>
        <div className="most-card-inner">
        <div className="self-defence1 d-flex justify-content-between">
          <span className="tag1 t1">Construction</span>
          <div className="views1">
            <img src={views} alt="view_icon" />
            <span className="ms-2">Views</span>
          </div>
          <div className="read-time1">
            <img src={dot} alt="dot_icon" />
            <span className="ms-2">4 mins read</span>
          </div>
          <span className="date1">9/09/2023</span>
        </div>
        <h4>The challenges construction workers are facing</h4>
        <p>Lorem ipsum dolor sit amet consectetur. Sed vel integer praesent eget ac urna. Sit fames aenean et orci diam. Mauris tincidunt ornare facilisis dolor enim.</p>
        </div>
      </div>
      <div className="most-read-card">
        <div className="img-most">
        <img src={cardImg2} alt="most-read1" />
        </div>
        <div className="most-card-inner">
        <div className="self-defence1 d-flex justify-content-between">
          <span className="tag1 t2">Construction</span>
          <div className="views1">
            <img src={views} alt="view_icon" />
            <span className="ms-2">Views</span>
          </div>
          <div className="read-time1">
            <img src={dot} alt="dot_icon" />
            <span className="ms-2">4 mins read</span>
          </div>
          <span className="date1">9/09/2023</span>
        </div>
        <h4>The challenges construction workers are facing</h4>
        <p>Lorem ipsum dolor sit amet consectetur. Sed vel integer praesent eget ac urna. Sit fames aenean et orci diam. Mauris tincidunt ornare facilisis dolor enim.</p>
        </div>
      </div>
      <div className="most-read-card">
        <div className="img-most">
        <img src={cardImg3} alt="most-read1" />
        </div>
        <div className="most-card-inner">
        <div className="self-defence1 d-flex justify-content-between">
          <span className="tag1 t3">Construction</span>
          <div className="views1">
            <img src={views} alt="view_icon" />
            <span className="ms-2">Views</span>
          </div>
          <div className="read-time1">
            <img src={dot} alt="dot_icon" />
            <span className="ms-2">4 mins read</span>
          </div>
          <span className="date1">9/09/2023</span>
        </div>
        <h4>The challenges construction workers are facing</h4>
        <p>Lorem ipsum dolor sit amet consectetur. Sed vel integer praesent eget ac urna. Sit fames aenean et orci diam. Mauris tincidunt ornare facilisis dolor enim.</p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default MostReadCard