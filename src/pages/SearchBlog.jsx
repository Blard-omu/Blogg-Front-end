import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import BlogCard from "../components/FetchBlogCard";

const SearchBlog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);

    try {
      if (!searchTerm) {
        toast.error("Enter a search term");
        setLoading(false);
        return;
      }

      if (searchTerm && searchTerm.length < 3) {
        toast.error("Search term must be at least 3 characters long!");
        setLoading(false);
        return;
      } else {
        const response = await axios.get("/blogs/search", {
          params: {
            term: searchTerm,
          },
        });

        setSearchResults(response.data.blogs);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error searching blogs:", error);
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h2>Search Blogs</h2>
      <div className="search-input">
        <input
          type="text"
          className=""
          placeholder="Search blog..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>
          Search
        </button>
      </div>

      {loading && <div className="mt-4">Loading...</div>}

      {!loading && searchResults.length === 0 && <div className="mt-4">No results found.</div>}

      {!loading && searchResults.length > 0 && (
        <div>
          <h3 className="mt-4">Search Results</h3>
          <div className="blog-container">
            {searchResults.map((blog) => (
              <div className="shadow  p-3" key={blog._id}>
                <Link className="link" to={`/blog/${blog._id}`}>
                  <BlogCard {...blog} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBlog;
