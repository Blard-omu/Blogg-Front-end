import "../css/TrendingCard.css";
import "../css/MostReadCard.css";
import React, { useEffect, useState } from "react";
import cardImg1 from "../assets/images/Frame 21.png";
import cardImg2 from "../assets/images/Frame 21 (1).png";
import cardImg3 from "../assets/images/Frame 21 (2).png";
import views from "../assets/images/ep_view.png";
import dot from "../assets/images/dot.png";
import axios from "axios";
import { Link } from "react-router-dom";

const MostReadCard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/blogs/all?page=1&limit=1000000");
        const popularBlogs = response.data.blogs.filter((blog) => {
          return blog.tags.includes("popular") && blog.state === "published";
        });
        setBlogs(popularBlogs.slice(0, 3));
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    const truncatedText = text.slice(0, maxLength);
    const lastSpaceIndex = truncatedText.lastIndexOf(" ");
    return truncatedText.slice(0, lastSpaceIndex) + "...";
  };

  return (
    <div className="most-readCard">
      <h2>Most Read</h2>
      <div className="d-flex flex-column gap-5">
        {blogs.length <= 2 ? (
          <div className="most-read-card">
            <div className="img-most">
              <img src={cardImg1} alt="most-read1" />
            </div>
            <div className="most-card-inner">
              <div className="self-defence1 d-flex justify-content-between">
                <span className="trending-tag">Construction</span>
                <div className="views1">
                  <img src={views} alt="view_icon" />
                  <span className="ms-2">4 Views</span>
                </div>
                <div className="read-time1">
                  <img src={dot} alt="dot_icon" />
                  <span className="ms-2">4 mins read</span>
                </div>
                <span className="date1">9/09/2023</span>
              </div>
              <h4>The challenges construction workers are facing</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur. Sed vel integer praesent
                eget ac urna. Sit fames aenean et orci diam. Mauris tincidunt
                ornare
              </p>
            </div>
          </div>
        ) : null}
        {loading ? (
          <p>Loading...</p>
        ) : (
          blogs.map((blog) => (
            <Link className="link" to={`/blog/${blog._id}`}>
              <div className="most-read-card" key={blog._id}>
                <div className="img-most">
                  <img src={blog.imageUrl} alt="image" />
                </div>
                <div className="most-card-inner">
                  <div className="self-defence1 d-flex justify-content-between">
                    <span className="trending-tag">{blog.category}</span>
                    <div className="views1">
                      <img src={views} alt="view_icon" />
                      <span className="ms-2">4 Views</span>
                    </div>
                    <div className="read-time1">
                      <img src={dot} alt="dot_icon" />
                      <span className="ms-2">{blog.read_time} min read</span>
                    </div>
                    <span className="date1">{formatDate(blog.updatedAt)}</span>
                  </div>
                  <h4>{truncateText(blog.title, 60)}</h4>
                  <p style={{ fontSize: "18px" }}>
                    {truncateText(blog.content, 140)}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default MostReadCard;
