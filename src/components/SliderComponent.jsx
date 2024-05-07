import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "../css/SwiperCard.css";
import "swiper/css";
import SwiperCard from "./SwiperCard";
import "swiper/css/navigation";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const SliderComponent = (props) => {
  const { tag = "Sport", bg = "#6726d2" } = props;
  const { published } = useAuth();
  // console.log(published?.blogs);
  const blog = published?.blogs;
  console.log(blog);

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
      <Swiper className="swiper-lg" spaceBetween={50} slidesPerView={2}>
        {blog.map((item) => {
          return (
            <SwiperSlide key={item._id}>
              <Link className="swiper-link" to={`/blog/${item._id}`}>
                <SwiperCard {...item} />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="row swiper-mobile">
        {blog.map((item) => {
          return (
            <div className="" key={item._id}>
              <SwiperCard {...item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SliderComponent;
