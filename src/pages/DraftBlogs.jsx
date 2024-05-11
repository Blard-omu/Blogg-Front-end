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
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import toast from "react-hot-toast";

const DraftBlogs = () => {
  const [draftBlogs, setDraftBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [optionsOpenIndex, setOptionsOpenIndex] = useState(null); // Track the index of the blog with open options
  const [showModal, setShowModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

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

  const handleDeleteClick = (blogId) => {
    setBlogToDelete(blogId);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/blog/${blogToDelete}`);
      // Remove the deleted blog from the publishedBlogs array
      // setPublishedBlogs(publishedBlogs.filter((blog) => blog._id !== blogToDelete));
      toast.success('Blog delete successful');
      setTimeout(() => {
        navigate("/profile");
      }, 3000);
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error('Blog delete failed');

    }
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setBlogToDelete(null);
    setShowModal(false);
  };

//   const createdAt = "2021-03-20T19:40:59.495Z";
// const date = new Date(createdAt);
// const formattedDate = date.toISOString().split('T')[0];
// console.log(formattedDate);
const navigate = useNavigate();

const handlePublish = async (blogId) => {
  try {
    await axios.patch(`/blog/${blogId}`, { state: "published" });
    // Update the state of the blog in the UI
    setDraftBlogs(draftBlogs.map(blog => {
      if (blog._id === blogId) {
        return { ...blog, state: "published" };
      }
      return blog;
    }));
    toast.success('Blog published sucessfully');
    setTimeout(() => {
      navigate("/profile");
    }, 2000);
  } catch (error) {
    console.error("Error publishing blog:", error);
    toast.error("Failed to publish", error);

  }
};

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
                <button className="pub" onClick={() => handlePublish(blog._id)}>
                  <FaTelegramPlane />
                  Publish
                </button>
                <Link to={`/blog/update/${blog._id}`}>
                <button className="ed" >
                  <MdEditSquare />
                  Edit
                </button>
                </Link>
                <button className="del" onClick={() => handleDeleteClick(blog._id)}>
                  <MdDelete />
                  Delete
                </button>
                
              </div>
            )}
          <div clasName="published-det d-flex justify-content-between">
            <div className="published-show d-flex justify-content-between">
              <span className="span-btn p-1">{blog.category}</span>
              <span><img src={View}/> Views</span>
              <span><img src={Dot}/> {blog.read_time > 1 ? <span>{blog.read_time} mins</span> : <span>{blog.read_time} min</span>}</span>
              <span>{new Date(blog.createdAt).toISOString().split('T')[0]}</span>
            </div>
            <h2 style={{fontWeight: '600'}}>{blog.title}</h2>
            <p style={{fontSize:"1.07rem"}}>{blog.content.slice(0,550)}</p>
          </div>
        </div>
      </div>
      ))}
      {showModal && (
                     <div >
                      <Modal.Dialog className="position-absolute " style={{ display: "flex", alignItems:"center", justifyContent:"center", top: '40%', left: '20%'}}>
                       <Modal.Header >
                         <Modal.Title>Confirm Delete</Modal.Title>
                       </Modal.Header>
               
                       <Modal.Body>
                         <p>Are you sure you want to delete this blog?</p>
                       </Modal.Body>
               
                       <Modal.Footer>
                         <Button variant="secondary" onClick={handleCloseModal}>No</Button>
                         <Button variant="danger"  className="mx-2" onClick={handleDelete}>Delete</Button>
                       </Modal.Footer>
                     </Modal.Dialog>
                  </div>
        // <div className="modal">
        //   <div className="modal-content">
        //     <h2>Confirm Delete</h2>
        //     <p>Are you sure you want to delete this blog?</p>
        //     <div className="modal-buttons">
        //       <button onClick={handleDelete}>Delete</button>
        //       <button onClick={handleCloseModal}>No</button>
        //     </div>
        //   </div>
      
      )}
    
    </div>
  );
};

export default DraftBlogs;
