import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import "../css/ProfileDetails.css"
import axios from "axios";
import Dot from '../assets/images/dot.png'

const ProfileDetails = () => {
  const [publishedBlogs, setPublishedBlogs] = useState([]);
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();
    console.log(user);
    useEffect(() => {
    const fetchProfileDetails = async () => {
        try {
          const response = await axios.get(`/user/${user._id}`);
  
          setProfile(response.data);
          console.log(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
  
      fetchProfileDetails();
    }, [user]);
    
    useEffect(() => {
      const fetchPublishedBlogs = async () => {
        try {
          const response = await axios.get("/blogs/all", {
            params: {
              state: "published",
              author: user.username,
            },
          });
  
          setPublishedBlogs(response.data.blogs);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching published blogs:", error);
        }
      };
  
      fetchPublishedBlogs();
    }, [user]);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!profile || Object.keys(profile).length === 0) {
        return <div>No profile data available.</div>;
    }

    const {username } = profile;

  return (
    <>
    <div className="profile-main d-flex">
        <div className="profile-det d-flex justify-content-between ">
            <div className="profile-pics ">
                <span className="profile-img">{username.charAt(0).toUpperCase() }</span>
            </div>
            
            <div className="profile-info py-4" style={{fontFamily:"Montserrat"}}>
                <h2 style={{fontWeight: '600'}} className="names">{username.toUpperCase() }</h2>
                <p style={{fontSize:"1rem"}} className="d-md-none d-lg-block param">Lorem ipsum dolor sit amet consectetur. Ridiculus in tellus cras vitae donec pellentesque condimentum feugiat. Massa id vestibulum enim nunc netus aliquet id feugiat hac. Vel malesuada odio volutpat magna quis. Feugiat sodales cras diam dictum se</p>
                <p style={{fontSize:"1.1rem"}} className="d-md-block d-lg-none param">Lorem ipsum dolor sit amet consectetur. Ridiculus in tellus cras vitae donec pellentesque condimentum feugiat. </p>
                
                <div className="profile-more d-flex justify-content-between">
                    <span>15,000 views</span>
                    <span>  <img src={Dot}/></span>
                    <span>{publishedBlogs.length} published</span>
                </div>
            </div>
        </div>
        
        <div className="edit d-flex align-items-center justify-content-end">
            <button className='edit-btn b'>Edit</button>
        </div>
    </div>
    <div className="addy">
    <h2 style={{fontWeight: '600'}}>{username.toUpperCase() }</h2>
    <div className="profile-mores d-flex justify-content-between">
                <span>15,000 views</span>
                <span>  <img src={Dot}/></span>
                <span>60 published</span>
            </div>
    </div>
    </>
  )
}

export default ProfileDetails