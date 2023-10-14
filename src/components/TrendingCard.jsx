import React from "react";
import "../css/TrendingCard.css";
import defence from "../assets/images/defence_img1.png";
import views from "../assets/images/ep_view.png";
import dot from "../assets/images/dot.png";

const TrendingCard = () => {
  return (
    <div className="trending-card">
      <h2>Trending</h2>
      <div className="trending-card-image">
        <img src={defence} alt="self_defence" />
        <div className="self-defence">
          <span className="tag">Self defence</span>
          <div className="views ms-2">
            <img src={views} alt="view_icon" />
            <span className="ms-2">Views</span>
          </div>
          <div className="read-time">
            <img src={dot} alt="dot_icon" />
            <span className="ms-2">4 mins read</span>
          </div>
          <span className="date">9/09/2023</span>
        </div>
        <div className="trending-down mt-3">
          <h4>The importance of self defense: In teenagers</h4>
          <p>Lorem ipsum dolor sit amet consectetur. Rhoncus magna porttitor sed et vitae dolor. Duis nunc lectus suspendisse accumsan consequat id. Commodo scelerisque urna donec volutpat imperdiet.</p>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;
