import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../css/createblog.css";

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

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("author", author);
    formData.append("imageUrl", image);

    try {
      const { data } = await axios.post("/create", formData);

      if (data?.message === "Blog created successfully") {
        toast.success("Blog created successfully");
        navigate("/");
        setLoading(false);
      } else {
        toast.error("Failed to create a blog");
        setLoading(false);
      }
    } catch (err) {
      if (err?.response?.data) {
        const { error } = err.response.data;
        toast.error(error);
      } else {
        toast.error("Login failed");
      }
    }
  };

  return (
    <div style={{ paddingTop: "120px" }}>
      <h1 className="">Create A New Blog</h1>
      <form className="" onSubmit={handleSubmit}>
        <div className="create-input">
          <label>Title</label>
          <input
            className="form-control p-3"
            type="text"
            placeholder="Enter title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="create-input">
          <label>Category</label>
          <input
            className="form-control p-3"
            type="text"
            placeholder="Enter category here"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="create-input">
          <label>Tags</label>
          <input
            className="form-control p-3"
            type="text"
            placeholder="Enter tags here"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </div>
        <div className="create-input">
          <label>Author</label>
          <input
            className="form-control p-3"
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            disabled
          />
        </div>
        <div className="create-input">
          <label>Upload blog image</label>
          <input
            className="form-control file"
            type="file"
            aria-label="File browser example"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
            placeholder=""
          />
        </div>
        <div className="create-input">
          <textarea
            className="form-control"
            placeholder="Type content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          {loading ? "Loading" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
