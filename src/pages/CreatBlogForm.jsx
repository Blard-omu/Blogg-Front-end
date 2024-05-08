import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("auth");
    const parsedUsername = storedUsername
      ? JSON.parse(storedUsername).user.username
      : "";
    setAuthor(parsedUsername);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("tags", tags);
      formData.append("imageUrl", image);

      const response = await axios.post("/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data?.success) {
        toast.success("Blog created successfully");
        navigate("/profile");
      } else {
        toast.error("Failed to create blog");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.error || "Failed to create blog");
      } else {
        toast.error("Failed to create blog");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-center bg-primary text-light">Create Blog</h1>
      <form className="col-12 col-md-6 offset-md-3" onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            className="form-control p-3"
            type="text"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <input
            className="form-control p-3"
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <input
            className="form-control p-3"
            type="text"
            placeholder="Author"
            value={author}
            // onChange={(e) => setCategory(e.target.value)}
            disabled
          />
        </div>
        <div className="form-control">
          <input
            className="form-control p-3"
            type="text"
            placeholder="Tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <textarea
            className="form-control"
            placeholder="Type content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
