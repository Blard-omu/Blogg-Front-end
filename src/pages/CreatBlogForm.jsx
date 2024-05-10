import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../css/createblog.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      setLoading(true)

      const { data } = await axios.post("/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data?.success) {
        toast.success("Blog created successfully");
        navigate("/profile");
        navigate("/");
        setLoading(false);
      } else {
        toast.error("Failed to create blog");
      }
    }catch (err) {
      if (err?.response?.data) {
        const error  = err.response.data.error;
        toast.error("Fail to create blog");
        setLoading(false);
        console.log(err);
      } else {
        toast.error("Fail to create blog");
      }
    } finally {
      setLoading(false);
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
          <label>Story</label>
          <textarea
            className="form-control"
            placeholder="Write your story here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button className="create-btn" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Create"}
          </button>
      </form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    
  );
};

export default CreateBlog;
