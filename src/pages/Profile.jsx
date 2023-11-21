import React from 'react'
import Published from './Published'
import DraftBlogs from './DraftBlogs'

const Profile = () => {
  return (
    <div>
      <Published/>
      <DraftBlogs/>
    </div>
  )
}

export default Profile