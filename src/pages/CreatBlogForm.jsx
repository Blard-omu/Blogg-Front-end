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

  const navigate = useNavigate()

  useEffect(() => {
    const storedUsername = localStorage.getItem("auth");
    const parsedUsername = storedUsername ? JSON.parse(storedUsername).user.username : "";
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
        navigate('/profile')
        setLoading(false);
        
      } else {
        toast.error("Failed to create a blog");
        setLoading(false);
      }
    } catch (err) {
      if (err?.response?.data) {
        // console.log(err);
        const { error } = err.response.data;
        toast.error(error);
      } else {
        toast.error("Login failed");
      }
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
            placeholder="Tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </div>
        <div className="form-control my-3">
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
        <div className="form-control">
          <textarea
            className="form-control"
            placeholder="Type content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="form-control my-3">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          { loading ? 'Loading' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
