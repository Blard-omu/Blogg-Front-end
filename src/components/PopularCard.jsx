import React from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuDot } from "react-icons/lu";
import "../css/Recommended.css";
import { Link } from "react-router-dom";


const PopularCard = ({blogs}) => {
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
          return text;
        }
        const truncatedText = text.slice(0, maxLength);
        const lastSpaceIndex = truncatedText.lastIndexOf(" ");
        return truncatedText.slice(0, lastSpaceIndex) + "...";
      };

  return (
    <>
        {blogs.map((b, i) => (
          <Link className="link" to={`/blog/${b._id}`} key={b._id}>
            <div className="blog-card-recom">
              <img src={b.imageUrl} alt={b.title} />
              <div className="content-recom">
                <div className="content-info">
                  <span>
                    <MdOutlineRemoveRedEye />
                    views
                  </span>
                  <span>
                    <LuDot style={{ color: "green" }} />
                    {b.read_time} mins read
                  </span>
                  <span>
                    {new Date(b.createdAt)
                      .toISOString()
                      .split("T")[0]
                      .replace(/-/g, "/")}
                  </span>
                </div>
              </div>
              <h3>{truncateText(b.title,60)}</h3>
              <p>
                {truncateText(b.content, 180)}{" "}
                <Link className="link" to={`/blog/${b._id}`}>
                  <b>Read more</b>
                </Link>{" "}
              </p>
            </div>
          </Link>
        ))}
    </>
  );
};

export default PopularCard;
