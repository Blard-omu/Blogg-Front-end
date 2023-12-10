import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const SearchBlog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);

    try {
      if(!searchTerm){
        toast.error("Enter a search term")
        setLoading(false);
        return;
      }

      if(searchTerm && searchTerm.length < 3){
        toast.error("Search term must be at least 3 characters long!")
        setLoading(false);
        return;
      }else{
        const response = await axios.get('/blogs/search', {
          params: {
            term: searchTerm,
          },
        });
  
        setSearchResults(response.data.blogs);
        setLoading(false);
      }
      
    } catch (error) {
      console.error('Error searching blogs:', error);
      setLoading(false);
    }
  };

//   useEffect(() => {
//     // handleSearch();
//   }, []); 

  return (
    <div>
      <h2>Search Blogs</h2>
      <div>
        <input
          type="text"
          placeholder="Search blog..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <div>Loading...</div>}

      {!loading && searchResults.length === 0 && (
        <div>No results found.</div>
      )}

      {!loading && searchResults.length > 0 && (
        <div>
          <h3>Search Results</h3>
          {searchResults.map(blog => (
            <div key={blog._id}>
              <h3>{blog.title}</h3>
              <p>{blog.content}</p>
              {/* Other blog details */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBlog;
