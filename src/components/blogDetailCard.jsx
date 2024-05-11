import React from "react";
import "../css/blogDetailCard.css";
// import "../css/SwiperCard.css";
import viewss from "../assets/images/ep_view.png";
import dot from "../assets/images/dot.png";
import "../css/blogDetailCard.css";

const BlogDetailCard = ({
  imageUrl,
  read_time,
  published_date,
  title,
  content,
  views,
  category,
  createdAt
}) => {

  // let catColor = '#26bdd2'
  // if (category ==='sport') {
  // catColor = 'red'
  // }

  return (
    <>
      <div className="detail row">
        <h2 className="mb-4">{title}</h2>
        <div className="detail-info mb-2">
          {category && (
            <button>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          )}
          <div className="views-detail">
            <img src={viewss} alt="view_icon" />
            <span className="ms-2">{views ? views : 4} views</span>
          </div>
          <div className="read-time-detail">
            <img src={dot} alt="dot_icon" />
            <span className="ms-2">{read_time ? read_time : 2} mins read</span>
          </div>
          <span className="date-detail">
            {createdAt ? new Date(createdAt)
                      .toISOString()
                      .split("T")[0]
                      .replace(/-/g, "/") : '2023/02/11'}
          </span>
        </div>
        <div className="detail-content">
          <div className="detail-hero">
            <img src={imageUrl} alt="" />
          </div>
          <div className="">
            <div className="trending-down">
              <p>{content}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetailCard;
