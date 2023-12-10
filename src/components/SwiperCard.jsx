import React from "react";
import "../css/SwiperCard.css";
import viewss from "../assets/images/ep_view.png";
import dot from "../assets/images/dot.png";

const SwiperCard = ({
  imageUrl,
  _id,
  read_time,
  published_date,
  title,
  content,
  views,
}) => {
  return (
    <>
      <div className="swiper-container" key={_id}>
        <img src={imageUrl} alt="" className="w-100"/>
        <div className="self-defence">
          <div className="views ms-2">
            <img src={viewss} alt="view_icon" />
            <span className="ms-2">{views ? views : 4} views</span>
          </div>
          <div className="read-time">
            <img src={dot} alt="dot_icon" />
            <span className="ms-2">{read_time ? read_time : 2} mins read</span>
          </div>
          <span className="date">{published_date ? published_date : "23/11/2023"}</span>
        </div>
        <div className="trending-down mt-3">
          <h4>{title}</h4>
          <p>{content.slice(0,150)}</p>
        </div>
      </div>
    </>
  );
};

export default SwiperCard;
