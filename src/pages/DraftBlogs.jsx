// Published.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

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
        console.error("Error fetching published blogs:", error);
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
      {draftBlogs.map((blog) => (
        <div key={blog._id}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <b>{blog.author}</b> <br />
          <em>{blog.state}</em>
        </div>
      ))}
    </div>
  );
};

export default DraftBlogs;
