import React from "react";
import notFound from '../assets/images/undraw_page_not_found_re_e9o6.svg'
import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <div className="err-pb">
      <img src={notFound} alt="" />

      <div className="pb-bt">
        <Link to="/">
          <button className="button-primary">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
