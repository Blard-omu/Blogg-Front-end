import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import "../css/createblog.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const UpdateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const { auth } = useAuth();
  const { _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("auth");
    const parsedUsername = storedUsername ? JSON.parse(storedUsername).user.username : "";
    setAuthor(parsedUsername);
    loadProduct();
  }, [_id]);

  const loadProduct = async () => {
    try {
      const { data } = await axios.get(`/blog/${_id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      console.log(data);
      const pd = data?.blog;
      setTitle(pd.title);
      setContent(pd.content);
      setTags(pd.tags);
      setCategory(pd.category);
      setImage(pd.image_url);
      setId(pd._id);
    } catch (err) {
      console.error('Error loading blog data:', err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await handleUpdate();
    } catch (error) {
      console.error('Error updating blog:', error.message);
      toast.error("Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("tags", tags);
      formData.append("author", author);
      formData.append("imageUrl", image);

      const response = await axios.patch(`/blog/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (response.status === 200) {
        console.log(response.data.message);
        console.log(response.data.blog);
        navigate(`/blog/${_id}`);
      } else {
        console.error('Failed to update blog:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating blog:', error.message);
    }
  };

  return (
    <div style={{ paddingTop: "120px" }}>
      <h1 className="">Update Blog</h1>
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
        <div className="form-control">
          <input
            className="form-control p-3"
            type="text"
            placeholder="Enter tags here"
            value={tags}
            onChange={(e) => setTags(e.target.value.split(","))}
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
        <button className="btn btn-primary" type="submit" disabled={loading} onClick={handleSubmit}>
          {loading ? "Loading..." : "Update"}
        </button>
      </form>

      {/* <Modal show={show} onHide={handleClose}>
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
      </Modal> */}
    </div>
  );
};

export default UpdateBlog;
