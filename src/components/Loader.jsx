import React from 'react'
import loader from '../assets/images/loader.gif'

const CustomLoader = () => {
  return (
    <>
        <div className="loading">
          <img src={loader} alt="" />
        </div>
    </>
  )
}

export default CustomLoader