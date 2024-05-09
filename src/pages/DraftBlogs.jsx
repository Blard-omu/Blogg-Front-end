// Published.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import Dots from '../assets/images/quill_meatballs-v.png'
import Dot from '../assets/images/dot.png'
import View from '../assets/images/ep_view.png'

const DraftBlogs = () => {
  const [draftBlogs, setDraftBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  // console.log(user);
  // console.log(publishedBlogs);
  useEffect(() => {
    const fetchPublishedBlogs = async () => {
      try {
        const response = await axios.get("/blogs/all", {
          params: {
            state: "draft",
            author: user.username,
          },
        });

        setDraftBlogs(response.data.blogs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching published blogs: ", error);
      }
    };

    fetchPublishedBlogs();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div >
      {draftBlogs.map((blog) => (
        <div className="published-main  d-flex justify-content-between mb-4" key={blog._id}>
        <div className="published-img">
          <img src={blog.imageUrl} alt="blog image" style={{ height:"100%", width: "100%", borderRadius:"10px"}}/>
        </div>
        <div className="published-info" style={{fontFamily:"Montserrat"}}>
          <div className="publised-dot d-flex align-items-center justify-content-end">
            <img src={Dots} />
          </div>
          <div clasName="published-det d-flex justify-content-between">
            <div className="published-show d-flex justify-content-between">
              <span className="span-btn p-1">{blog.category}</span>
              <span><img src={View}/> Views</span>
              <span><img src={Dot}/> 4 mins read</span>
              <span>9/09/2023</span>
            </div>
            <h2 style={{fontWeight: '600'}}>{blog.title}</h2>
            <p style={{fontSize:"1.07rem"}}>{blog.content.slice(0,550)}</p>
          </div>
        </div>
      </div>
      ))}
    </div>
  );
};

export default DraftBlogs;
