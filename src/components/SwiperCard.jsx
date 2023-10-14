import React from "react";
import "../css/SwiperCard.css";
import viewss from "../assets/images/ep_view.png";
import dot from "../assets/images/dot.png";

const SwiperCard = ({
  img,
  id,
  read_time,
  published_date,
  title,
  body,
  views,
}) => {
  return (
    <>
      <div className="swiper-container" key={id}>
        <img src={img} alt="" />
        <div className="self-defence">
          <div className="views ms-2">
            <img src={viewss} alt="view_icon" />
            <span className="ms-2">{views} views</span>
          </div>
          <div className="read-time">
            <img src={dot} alt="dot_icon" />
            <span className="ms-2">{read_time} mins read</span>
          </div>
          <span className="date">{published_date}</span>
        </div>
        <div className="trending-down mt-3">
          <h4>{title}</h4>
          <p>{body}</p>
        </div>
      </div>
    </>
  );
};

export default SwiperCard;
