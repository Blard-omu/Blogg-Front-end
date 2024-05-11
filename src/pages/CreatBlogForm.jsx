import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../css/createblog.css";
import ModalCom from "../components/Modal";
import { FormModal } from "../components/CreateFormModal";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);


  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("auth");
    const parsedUsername = storedUsername
      ? JSON.parse(storedUsername).user.username
      : "";
    setAuthor(parsedUsername);
  }, []);

  const handleSubmit = async (e, state) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("author", author);
    formData.append("imageUrl", image);
    formData.append("state", state); // Add state parameter to FormData

    try {
      setLoading(true);
      const { data } = await axios.post("/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data?.success) {
        toast.success("Blog created successfully");
        setLoading(false);
        setModalShow(true)
      } else {
        toast.error("Failed to create blog");
        setLoading(false);
      }
    } catch (err) {
      if (err?.response?.data) {
        const error = err.response.data.error;
        toast.error(error);
        setLoading(false);
      } else {
        toast.error("Failed to create blog");
      }
    } finally {
      setLoading(false);
    }
  };

  function handleProfile() {
    setTimeout(() => {
      navigate("/profile");
    }, 500);
  }

  return (
    <div style={{ paddingTop: "120px" }}>
      <h1>Create A New Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="create-input">
          <label>Title</label>
          <input
            type="text"
            className="form-control py-3"
            placeholder="Enter title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="create-input">
          <label>Category</label>
          <input
            type="text"
            className="form-control py-3"
            placeholder="Enter category here"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="create-input">
          <label>Tags</label>
          <input
            type="text"
            className="form-control py-3"
            placeholder="Enter tags here e.g Trending,Popular"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </div>
        <div className="create-input">
          <label>Author</label>
          <input
            type="text"
            placeholder="Author"
            className="form-control"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            disabled
          />
        </div>
        <div className="create-input">
          <label>Upload blog image</label>
          <input
            type="file"
            accept="image/*"
            className="form-control py-3"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <div className="create-input">
          <label>Story</label>
          <textarea
            placeholder="Write your story here"
            value={content}
            className="form-control py-3"
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="create-input ">
          <label style={{ color: "#a38686" }}>
            Note: Newly created blogs will be saved directly to your drafts.
            Navigate to your drafts to publish them.
          </label>
          <button type="submit" className="create-btn">
            {loading ? "loading..." : "Create blog"}
          </button>
        </div>
      </form>
      <FormModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        handleProfile={handleProfile}
      />
    </div>
  );
};

export default CreateBlog;


