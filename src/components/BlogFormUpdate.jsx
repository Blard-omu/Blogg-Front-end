import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams,useNavigate } from "react-router-dom";
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
  const [existingImage, setExistingImage] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { _id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("auth");
    const parsedUsername = storedUsername
      ? JSON.parse(storedUsername).user.username
      : "";
    setAuthor(parsedUsername);

   // Fetch existing blog details
   axios.get(`/blog/${_id}`)
   .then(response => {
     const { title, content, category, tags, imageUrl} = response.data;
     setTitle(title);
     setContent(content);
     setCategory(category);
     setTags(tags);
     setExistingImage(imageUrl);
   })
   .catch(error => {
     console.error("Error fetching blog details:", error);
     toast.error("Failed to fetch blog details");
   });
 }, [_id]);

 const handleImageChange = (e) => {
  setImage(e.target.files[0]);
};

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

      const { data } = await axios.patch(`/blog/${_id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data?.success) {
        toast.success("Blog updated successfully");
        navigate("/profile");
        setLoading(false);
      } else {
        toast.error("Failed to update blog");
      }
    }catch (err) {
      console.error("Error updating blog:", err);
    if (err?.response?.data) {
      const error = err.response.data.error;
      toast.error(error); // Display the specific error message returned from the server
    } else {
      toast.error("Failed to update blog");
    }
      setLoading(false);
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
          {existingImage && ( // Render existing image if available
            <img src={existingImage} alt="Existing blog image" style={{ maxWidth: "200px", marginTop: "10px" }} />
          )}
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
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Update"}
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

export default UpdateBlog;
