// FetchBlogs.jsx
import React, { useState, useEffect } from "react";
import "../css/fetchCard.css";
import BlogCard from "../components/FetchBlogCard";
import loader from "../assets/images/loader.gif";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const FetchBlogs = () => {
  const {  loading, published } = useAuth()
  const allBlogs = published.blogs
  // console.log(allBlogs);
  return (
    <div className="" style={{ marginTop: "3rem" }}>
      <h1 className="bg-success text-light">Trending</h1>
      {loading && (
        <div className="loading">
          <img src={loader} alt="" />
        </div>
      )}
      {allBlogs && (
        <div className="blog-container">
          {allBlogs.map((blog) => (
            <div className="shadow  p-3" key={blog._id}>
            <Link className="bg-primary"  to={`/blog/${blog._id}`}>
              <BlogCard {...blog} />
            </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 

export default FetchBlogs;
