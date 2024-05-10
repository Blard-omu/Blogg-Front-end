import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PopularCard from "./PopularCard";

const Popular = (props) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const { tag, bg } = props;


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true)
        const response = await axios.get("/blogs/all?page=1&limit=10000");
        const trendingBlogs = response.data.blogs.filter((blog) => {
          return blog.tags.includes("popular") && blog.state === "published";
        });
        setBlogs(trendingBlogs.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);
  useEffect(() => {
    console.log(blogs);
  }, [blogs]);

  return (
    <>
      <div className="d-flex align-items-center gap-4 mt-5 mb-2">
        <h2>Popular</h2> <span className="trending-tag">{tag}</span>
      </div>
      <div className="recommend-grid">
        {loading ? <h3>Loading. . .</h3> : <PopularCard blogs={blogs} />}
      </div>
    </>
  );
};

export default Popular;
