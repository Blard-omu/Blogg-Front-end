// Published.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import Dots from '../assets/images/quill_meatballs-v.png'
import Dot from '../assets/images/dot.png'
import View from '../assets/images/ep_view.png'
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEditSquare } from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const DraftBlogs = () => {
  const [draftBlogs, setDraftBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [optionsOpenIndex, setOptionsOpenIndex] = useState(null); // Track the index of the blog with open options

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

  const toggleOptions = (index) => {
    setOptionsOpenIndex(index === optionsOpenIndex ? null : index);
  };

  const createdAt = "2021-03-20T19:40:59.495Z";
const date = new Date(createdAt);
const formattedDate = date.toISOString().split('T')[0];
console.log(formattedDate);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div >
      {draftBlogs.length === 0 ? (
        <>
          <h2>No blogs yet...</h2>
          <button className="button-primary">Create Blog</button>
        </>
      ) : 
      draftBlogs.map((blog,index) => (
        <div className="published-main  d-flex justify-content-between mb-4" key={blog._id}>
        <div className="published-img">
          <img src={blog.imageUrl} alt="blog image" style={{ height:"100%", width: "100%", borderRadius:"10px"}}/>
        </div>
        <div className="published-info" style={{fontFamily:"Montserrat"}}>
          <div className="publised-dot d-flex align-items-center justify-content-end"  onClick={() => toggleOptions(index)}>
          <BsThreeDotsVertical />
          </div>
          {optionsOpenIndex === index && ( // Show options only for the clicked blog
              <div className="options-publish">
                <button className="pub">
                  <FaTelegramPlane />
                  Publish
                </button>
                <button className="ed">
                  <MdEditSquare />
                  Edit
                </button>
                <button className="del">
                  <MdDelete />
                  Delete
                </button>
              </div>
            )}
          <div clasName="published-det d-flex justify-content-between">
            <div className="published-show d-flex justify-content-between">
              <span className="span-btn p-1">{blog.category}</span>
              <span><img src={View}/> Views</span>
              <span><img src={Dot}/> 4 mins read</span>
              <span>{formattedDate}</span>
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
