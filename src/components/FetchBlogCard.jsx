import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({
  _id,
  title,
  content,
  author,
  imageUrl,
  read_time,
  category,
}) => {
  return (
    <>
      <div className="" key={_id}>
        <div className="card-img">
          <img src={imageUrl} alt="" />
        </div>
        <div className="card-content">
          <h3>{title}</h3>
          <p>{content.slice(0, 100)}</p>
          <b>Author:</b>
          <em>{author}</em>
          <div className="">
            <p>
              <b>category:</b> {category}
            </p>
            {read_time > 1 ? <p>{read_time} mins</p> : <p>{read_time} min</p>}
            {/* <span>{read_time}</span> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
