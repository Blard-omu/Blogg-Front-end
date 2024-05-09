import React, { useEffect, useState } from "react";
import "../css/TrendingCard.css";
import defence from "../assets/images/defence_img1.png";
import views from "../assets/images/ep_view.png";
import dot from "../assets/images/dot.png";
import axios from "axios";
import { Link } from "react-router-dom";

const TrendingCard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/blogs/all?page=1&limit=1000000");
        const trendingBlogs = response.data.blogs.filter((blog) => {
          return blog.tags.includes("popular trending") && blog.state === "published";
        });
        setBlogs(trendingBlogs.slice(0, 1));
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  return (
    <div className="trending-card">
      <h2>Trending</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="">
          {blogs.map((blog) => (
            <Link className="link" to={`/blog/${blog._id}`}>
              <div key={blog._id} className="trending-card-image">
                <img src={blog.imageUrl} alt="" />
                <div className="self-defence">
                  <span className="trending-tag">{blog.category}</span>
                  <div className="views ms-2">
                    <img src={views} alt="view_icon" />
                    <span className="ms-2">Views</span>
                  </div>
                  <div className="read-time">
                    <img src={dot} alt="dot_icon" />
                    <span className="ms-2">{blog.read_time} min read</span>
                  </div>
                  <span className="date">{formatDate(blog.updatedAt)}</span>
                </div>
                <div className="trending-down mt-3">
                  <h4>{blog.title}</h4>
                  <p style={{ fontSize: "18px" }}>{blog.content.slice(0, 400)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingCard;
