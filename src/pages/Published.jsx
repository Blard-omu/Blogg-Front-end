import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import "../css/Published.css";
import View from "../assets/images/ep_view.png";
import Dot from "../assets/images/dot.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEditSquare, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Paginations from "../components/Paginations";
import toast from "react-hot-toast";

const Published = () => {
  const [publishedBlogs, setPublishedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [optionsOpenIndex, setOptionsOpenIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sliceLimit, setSliceLimit] = useState(450); // Initial slice limit

  const { user } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      // Adjust slice limit based on screen width
      const width = window.innerWidth;
      let newSliceLimit = 450;
      if (width < 768) {
        newSliceLimit = 0; // Set slice limit for small screens
      } else if (width < 1024){
        newSliceLimit = 150; // Set default slice limit for larger screens
      }
      setSliceLimit(newSliceLimit);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchPublishedBlogs = async () => {
      try {
        const response = await axios.get("/blogs/all?page=1&limit=1000000", {
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

  const toggleOptions = (index) => {
    setOptionsOpenIndex(index === optionsOpenIndex ? null : index);
  };


  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`/blog/${blogId}`);
      // Remove the deleted blog from the publishedBlogs array
      setPublishedBlogs(publishedBlogs.filter((blog) => blog._id !== blogId));
      toast.success('Blog deleted successfully');
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog");
    }
  };

  

  if (loading) {
    return <div>Loading...</div>;
  }

  // Pagination logic
  const productsPerPage = 5; // Adjust the number of items per page as needed
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const paginate = publishedBlogs.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {paginate.length === 0 ? (
        <>
          <h2>No blogs yet...</h2>
          <Link to={`/create`}>
          <button className="button-primary">Create Blog</button>
          </Link>
        </>
      ) : 
      paginate.map((blog, index) => (
        <div
          className="published-main d-flex  justify-content-between mb-4 "
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
              onClick={() => toggleOptions(index)} // Pass index to toggleOptions
            >
              <BsThreeDotsVertical />
            </div>
            {optionsOpenIndex === index && ( // Show options only for the clicked blog
              <div className="options-publish">
                <Link to={`/blog/update/${blog._id}`}>
                  <button className="ed" >
                    <MdEditSquare />
                    Edit
                  </button>
                </Link>
                
                <button className="del" onClick={() => handleDelete(blog._id)}>
                  <MdDelete />
                  Delete
                </button>
                  
              </div>
            )}
            
            <div clasName="published-det d-flex justify-content-between">
              <div className="published-show d-flex justify-content-between">
                <span className="span-btn p-1">{blog.category}</span>
                <span className="view">
                  <img src={View} alt="Views" /> Views
                </span>
                <span className="min">
                  <img src={Dot} alt="Time" /> {blog.read_time > 1 ? <span>{blog.read_time} mins</span> : <span>{blog.read_time} min</span>}
                </span>
                <span className="dates">{new Date(blog.createdAt).toISOString().split('T')[0]}</span>
                <div
              className="published-dot d-flex align-items-center justify-content-end"
              onClick={() => toggleOptions(index)} // Pass index to toggleOptions
            >
              <BsThreeDotsVertical />
            </div>
              </div>
              <h2 className="pt-2" style={{ fontWeight: "600" }}>{blog.title}</h2>
              <p className="content" style={{ fontSize: "1.2rem" }}>
                {blog.content.slice(0, sliceLimit)}
              </p>
              <div className="published-show d-flex justify-content-between">
                <span className="time">
                  <img src={Dot} alt="Time" /> {blog.read_time > 1 ? <span>{blog.read_time} mins</span> : <span>{blog.read_time} min</span>}
                </span>
                <span className="time">{new Date(blog.createdAt).toISOString().split('T')[0]}</span>
                
              </div>
              <Link to={`/blog/${blog._id}`} className="times">
                <button className="read">Read More...</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
      <Paginations
       totalItems={publishedBlogs.length}
       itemsPerPage={productsPerPage}
       onPageChange={handlePageChange}
       currentPage={currentPage}
      />
      
    </div>
  );
};

export default Published;
