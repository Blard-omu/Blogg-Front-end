import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BlogUpdate = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    state: '',
    // Add other fields as needed
    imageUrl: null, // Add the image field
  });

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`/blog/${_id}`);
        const existingBlogData = response.data;
        setBlogData(existingBlogData);
      } catch (error) {
        console.error('Error fetching blog data:', error.message);
      }
    };

    fetchBlogData();
  }, [_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setBlogData((prevData) => ({
      ...prevData,
      imageUrl: imageFile,
    }));
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('title', blogData.title);
      formData.append('content', blogData.content);
      formData.append('state', blogData.state);
      formData.append('imageUrl', blogData.image);

      const response = await axios.patch(`/blog/${_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
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
    <div className="" style={{paddingTop: "20rem"}}>
      <h1>Update Blog</h1>
      <form>
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

        <label>Content:</label>
        <textarea
          name="content"
          value={blogData.content}
          onChange={handleInputChange}
        />

        <label>State:</label>
        <input
          type="text"
          name="state"
          value={blogData.state}
          onChange={handleInputChange}
        />

        <label>Image:</label>
        <input type="file" name="image" onChange={handleImageChange} />

        <button type="button" onClick={handleUpdate}>
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default BlogUpdate;
