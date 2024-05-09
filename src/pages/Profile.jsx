import React, {useState} from 'react'
import Published from './Published'
import DraftBlogs from './DraftBlogs'
import ProfileDetails from './ProfileDetails'
import "../css/Profile.css"

const Profile = () => {
  const [activeSection, setActiveSection] = useState('published');

  const handleToggle = (section) => {
    setActiveSection(section);
  };
  return (
    // <div style={{paddingTop: "20rem"}}>
    //   <ProfileDetails/>
    //   <Published/>
    //   <DraftBlogs/>
    // </div>
    <div style={{ paddingTop: '8rem' }}>
     <div className="mb-4">
     <ProfileDetails />
     </div>
      <div className="toggle-btn " style={{ marginBottom: '1rem' }}>
        <button
          style={{ marginRight: '1rem' }}
          onClick={() => handleToggle('published')}
          className={`toggle-bttn ${activeSection === 'published' ? 'active' : ''}`}
        >
          Published
        </button>
        <button
          onClick={() => handleToggle('draft')}
          className={`toggle-bttn ${activeSection === 'draft' ? 'active' : ''}`}
        >
          Drafts
        </button>
      </div>
      {activeSection === 'published' && <Published />}
      {activeSection === 'draft' && <DraftBlogs />}
    </div>
  )
}


export default Profile;
