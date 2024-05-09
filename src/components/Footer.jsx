import React from "react";
import "../css/footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
    const line = {
        width: "100%",
        border: "1px solid #26bdd2",
      };
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="footer-content">
            <div>
              <p className="logo" style={{fontSize: '40px'}}>Blogg</p>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Voluptas eaque cum odio voluptates excepturi, mollitia libero
                ratione iure enim exercitationem, inventore, at molestiae optio
                natus quia amet sequi
              </p>
              <label>
                <input type="email" placeholder="Email" />
                <button className="footer-btn">Subscribe</button>
              </label>
            </div>
            <div className="d-flex justify-content-around">
            <div>
              <h4>Quick Link</h4>
              <Link className="footer-link" to="/">
                <li>Home</li>
              </Link>
              <Link className="footer-link" to="/blogs">
                <li>Blog</li>
              </Link>
              <li href="#notavailbe">About</li>
              <li href="#notavailbe">Create</li>
            </div>
            <div>
              <h4>Quick Link</h4>
              <Link className="footer-link" to="/">
                <li>Home</li>
              </Link>
              <Link className="footer-link" to="/blogs">
                <li>Blog</li>
              </Link>
              <li href="#notavailbe">About</li>
              <li href="#notavailbe">Create</li>
            </div>
            </div>
          </div>
          <div className="footer-end">
            <p style={line}></p>
            <div className="right">
                <span style={{fontWeight: 500}}>@2024 BLOGG</span><span>All rights reserved</span><span>Privacy Policy</span><span>Terms of Service</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
