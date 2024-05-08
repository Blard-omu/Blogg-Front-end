// Published.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import BlogCard from "../components/FetchBlogCard";
import { Link } from "react-router-dom";
import "../css/fetchCard.css"

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
    <div>
      <h2>Draft Blogs</h2>
      {draftBlogs && (
        <div className="blog-container">
          {draftBlogs.map((blog) => (
            <div className="shadow  p-3" key={blog._id}>
              <Link className="bg-primary" to={`/blog/update/${blog._id}`}>
                <BlogCard {...blog} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DraftBlogs;
