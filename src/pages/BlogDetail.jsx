// FetchBlogs.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/fetchCard.css";
import loader from "../assets/images/loader.gif";
import { useParams } from "react-router-dom";
import BlogDetailCard from "../components/blogDetailCard";

const BlogDetail = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { _id } = useParams();

  const fetchApi = async () => {
    try {
      const response = await axios.get(`/blog/${_id}`);
      const blog = response.data;
      setData(blog);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="" style={{ marginTop: "3rem" }}>
      <h1 className="bg-success text-light">Blog Details</h1>
      {loading && (
        <div className="loading">
          <img src={loader} alt="" />
        </div>
      )}
      {data && <BlogDetailCard {...data} />}
    </div>
  );
};

export default BlogDetail;