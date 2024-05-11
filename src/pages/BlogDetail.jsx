// FetchBlogs.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/fetchCard.css";
import loader from "../assets/images/loader.gif";
import { useParams } from "react-router-dom";
import BlogDetailCard from "../components/blogDetailCard";
import Recommended from "../components/Recommended";

const BlogDetail = () => {
  const [data, setData] = useState([]);
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const { _id } = useParams();

  const fetchApi = async () => {
    try {
      const response = await axios.get(`/blog/${_id}`);
      const res = await axios.get(`/blogs/all`);
      const blog = response.data;
      const blogsFetch = res.data.blogs;
      setData(blog);
      setAll(blogsFetch);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const sameCategory = all
    .filter(
      (blog, i) => blog.category === data.category && blog.state === "published"
    )
    .slice(0, 3);

  return (
    <div className="" style={{ marginTop: "3rem" }}>
      <h1 className="bg-success text-light">Blog Details</h1>
      {loading && (
        <div className="loading">
          <img src={loader} alt="" />
        </div>
      )}
      {data && <BlogDetailCard {...data} />}
      {sameCategory.length > 0 ? <h1>Recommended</h1> : ""}
      <div className="recommend-grid">
        <Recommended sameCategory={sameCategory} />
      </div>
    </div>
  );
};

export default BlogDetail;
