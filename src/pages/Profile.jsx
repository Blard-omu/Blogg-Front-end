import React, { useState } from "react";
import Published from "./Published";
import DraftBlogs from "./DraftBlogs";

const Profile = () => {
  const [page, setPage] = useState("published");

  const toggleBtn = () => {
    setPage((prevPage) => (prevPage === "published" ? "drafts" : "published"));
  };

  return (
    <div>
      <div>
        <button className="btn btn-primary" onClick={toggleBtn}>{page === "published" ? "Published" : "Draft"}</button>
        {page === "published" ? <Published /> : <DraftBlogs />}
      </div>

      
    </div>
  );
};

export default Profile;
