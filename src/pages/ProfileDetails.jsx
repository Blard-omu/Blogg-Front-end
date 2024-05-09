import React, { useEffect, useState } from "react";
// import Profilepics from "../assets/images/Ellipse 3.png"
import { useParams } from "react-router-dom";
import "../css/ProfileDetails.css"
import axios from "axios";
import Dot from '../assets/images/dot.png'

const ProfileDetails = () => {
    const { userId } = useParams();
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
    const fetchProfileDetails = async () => {
        try {
          const response = await axios.get(`/user/${userId}`);
  
          setProfile(response.data);
          console.log(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
  
      fetchProfileDetails();
    }, [userId]);
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!profile || Object.keys(profile).length === 0) {
        return <div>No profile data available.</div>;
    }

    const {username } = profile;

  return (
    <div className="profile-main d-flex">
        <div className="profile-det d-flex justify-content-between ">
            <div className="profile-pics ">
                {/* <img src={Profilepics} alt="" style={{ height:"100%"}}/> */}
                <p className="profile-img">{username.charAt(0).toUpperCase() }</p>
            </div>
            <div className="profile-info py-4" style={{fontFamily:"Montserrat"}}>
                <h2 style={{fontWeight: '600'}}>{username}</h2>
                <p style={{fontSize:"1rem"}}>Lorem ipsum dolor sit amet consectetur. Ridiculus in tellus cras vitae donec pellentesque condimentum feugiat. Massa id vestibulum enim nunc netus aliquet id feugiat hac. Vel malesuada odio volutpat magna quis. Feugiat sodales cras diam dictum se</p>
                <div className="profile-more d-flex justify-content-between">
                    <span>15,000 views</span>
                    <span>  <img src={Dot}/></span>
                    <span>60 published</span>
                </div>
            </div>
        </div>
        <div className="edit d-flex align-items-center justify-content-end">
            <button className='edit-btn b'>Edit</button>
        </div>
    </div>
  )
}

export default ProfileDetails