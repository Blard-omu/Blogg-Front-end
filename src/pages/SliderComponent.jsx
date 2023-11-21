import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "../css/SwiperCard.css";
import "swiper/css";
import SwiperCard from "../components/SwiperCard";
import "swiper/css/navigation";
import { useAuth } from "../contexts/AuthContext";

const SliderComponent = (props) => {
  const { tag = "Sport", bg = "#6726d2" } = props;
  const { published } = useAuth();
  // console.log(data);
  console.log(published.blogs);
  const blog = published.blogs


  return (
    <div style={{ marginTop: "2rem" }}>
      <div className="d-flex justify-content-between w-25 align-items-center">
        <h2>Popular</h2>
        <span
          className="popular-tag text-center"
          style={{ backgroundColor: bg }}
        >
          {tag}
        </span>
      </div>
      <Swiper spaceBetween={50} slidesPerView={2.5}>
        {blog.map((item) => {
          return (
            <SwiperSlide key={item._id}>
              <SwiperCard {...item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SliderComponent;
