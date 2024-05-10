// FetchBlogs.jsx
import React, { useState, useEffect } from "react";
import "../css/fetchCard.css";
import BlogCard from "../components/FetchBlogCard";
import loader from "../assets/images/loader.gif";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "../components/Pagination";

const FetchBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/blogs/all?page=1&limit=1000000");
        const allBlogs = response.data.blogs.filter((blog) => {
          return blog.state === "published";
        });
        setBlogs(allBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);
  useEffect(() => {
    console.log(blogs);
  }, [blogs]);

  //------------Pagination----------

  const handlePageChange = (pageNumber) => {
    console.log("Changing page to:", pageNumber);
    setCurrentPage(pageNumber);
    localStorage.setItem("currentPage", pageNumber);
  };

  useEffect(() => {
    // Retrieve current page from local storage
    const storedPage = localStorage.getItem("currentPage");
    if (storedPage) {
      console.log(storedPage);
      setCurrentPage(parseInt(storedPage));
    } else {
      setCurrentPage(1); // Set default page to 1 if not found in local storage
    }
  }, []);

  // Pagination logic
  const productsPerPage = 12;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const paginate = blogs.slice(indexOfFirstProduct, indexOfLastProduct);

  // ---------------Pagination End---------

  return (
    <div className="" style={{ marginTop: "8rem" }}>
      <h1
        className="text-light"
        style={{ background: "#26bdd2", textAlign: "center" }}
      >
        All blogs
      </h1>
      {paginate && (
        <div className="blog-container">
          {paginate.map((blog) => (
            <div className="shadow  p-3" key={blog._id}>
              <Link className="link" to={`/blog/${blog._id}`}>
                <BlogCard {...blog} />
              </Link>
            </div>
          ))}
        </div>
      )}
      {
        blogs.length > 12 ? <Pagination
        totalItems={blogs.length}
        itemsPerPage={productsPerPage}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      /> : " "
      }
      
    </div>
  );
};

export default FetchBlogs;
