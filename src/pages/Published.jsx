// Published.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import Publish from '../assets/images/Frame 66 (1).png'
import "../css/Published.css"
import View from '../assets/images/ep_view.png'
import Dots from '../assets/images/quill_meatballs-v.png'
import Dot from '../assets/images/dot.png'
import { Modal, Button } from 'react-bootstrap'; 

const Published = () => {
  const [publishedBlogs, setPublishedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleShowModal = (blog) => {
    setShowModal(true);
    setSelectedBlog(blog);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const { user } = useAuth();
  console.log(user);
  console.log(publishedBlogs);
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
  console.log("showModal:", showModal);
console.log("selectedBlog:", selectedBlog);
  return (
    <div >
      {/* <h2>Published Blogs</h2>
      {publishedBlogs.map((blog) => (
        
        <div key={blog._id}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <b>{blog.author}</b>
          <br />
          <em>{blog.state}</em>
        </div>
      ))} */}
      {publishedBlogs.map((blog) => (
      <div className="published-main d-flex justify-content-between mb-4" key={blog._id}>
        <div className="published-img">
          <img src={blog.imageUrl} alt="blog image" style={{ height:"100%", width: "100%", borderRadius:"10px"}}/>
        </div>
        <div className="published-info" style={{fontFamily:"Montserrat"}}>
          <div className="publised-dot d-flex align-items-center justify-content-end">
            <img src={Dots} onClick={() => handleShowModal(blog)}/>
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
       <>
       <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedBlog ? selectedBlog.title : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBlog && (
            <>
              <p>{selectedBlog.content}</p>
              <Button variant="primary" onClick={handleCloseModal}>
                Publish
              </Button>
              <Button variant="secondary" onClick={handleCloseModal}>
                Edit
              </Button>
              <Button variant="danger" onClick={handleCloseModal}>
                Delete
              </Button>
            </>
          )}
        </Modal.Body>
      </Modal>
       </>
    </div>
  );
};

export default Published;
