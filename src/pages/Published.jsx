import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import Modal from "../components/Modal";
import "../css/Published.css";
import View from "../assets/images/ep_view.png";
import Dots from "../assets/images/quill_meatballs-v.png";
import Dot from "../assets/images/dot.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEditSquare } from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Published = () => {
  const [publishedBlogs, setPublishedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
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

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isOptionsOpen && (
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
      {publishedBlogs.map((blog) => (
        <div
          className="published-main d-flex  justify-content-between mb-4"
          key={blog._id}
        >
          <div className="published-img">
            <img
              src={blog.imageUrl}
              alt="blog image"
              style={{ height: "100%", width: "100%", borderRadius: "10px" }}
            />
          </div>
          <div className="published-info" style={{ fontFamily: "Montserrat" }}>
            <div
              className="publised-dot d-flex align-items-center justify-content-end"
              onClick={toggleOptions}
            >
              <BsThreeDotsVertical />
            </div>
            <div clasName="published-det d-flex justify-content-between">
              <div className="published-show d-flex justify-content-between">
                <span className="span-btn p-1">{blog.category}</span>
                <span>
                  <img src={View} /> Views
                </span>
                <span>
                  <img src={Dot} /> 4 mins read
                </span>
                <span>9/09/2023</span>
              </div>
              <h2 style={{ fontWeight: "600" }}>{blog.title}</h2>
              <p style={{ fontSize: "1.07rem" }}>
                {blog.content.slice(0, 550)}
              </p>
            </div>
          </div>
        </div>
      ))}

      <div>
        <button onClick={handleOpenModal}>Open Modal</button>
        <Modal isOpen={isOpen} onClose={handleCloseModal}>
          <h2>This is a modal</h2>
          <p>Modal content goes here.</p>
          <button onClick={handleCloseModal}>Close</button>
          <button>Another Button</button>
        </Modal>
      </div>
    </div>
  );
};

export default Published;
