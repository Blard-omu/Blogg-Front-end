import React from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AuthLogin from "../assets/images/Authimage.jpeg";
import "../css/login.css";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import fb from "../assets/images/facebook-icon.png";
import apple from "../assets/images/Apple_logo_black.svg.png";
import google from "../assets/images/Google_Icons.webp";

const Register = () => {
  // navigation
  const navigate = useNavigate();
  // Hook
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!username || !email || !password) {
      return toast.error("Please fill in all fields");
    }

    // Email pattern validation
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      return toast.error("Invalid email address");
    }

    try {
      setLoading(true)
      // Sending a request for registration
      const { data } = await axios.post(`/register`, {
        username,
        email,
        password,
      });
      // Check for a success message or response
      if (!data?.error) {
        toast.success("Registration successful");
        setLoading(false)
        navigate("/login");
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      if (err?.data && err.response.data) {
        const { error } = err.response.data;
        if (error === "password must be at least 6 characters long!") {
          return toast.error(error);
        }
        toast.error(error);
        setLoading(false)
      } else {
        toast.error("Registration failed");
        setLoading(false)
      }
    }
  };

  // console.log(username);
  // console.log(email);
  return (
    <>
      <main className="m-main">
        <div className="left-login-img">
          <img src={AuthLogin} alt="" />
        </div>
        <div className="right-login-content">
          <h1 className="text-center logo" style={{ fontSize: "4rem" }}>
            BLOGG
          </h1>
          <h3 className="text-center" style={{ fontSize: "2rem" }}>
            Join Blogg
          </h3>
          <p className="text-center ">
            Enter your email address to create an account with us
          </p>
          <form className="form-login" onSubmit={handleSubmit}>
            <div className="form-input">
              <label>Email Address</label>
              <input
                className="form-control p-3"
                type="email"
                placeholder="name@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-input">
              <label>Username</label>
              <input
                className="form-control p-3"
                type="text"
                placeholder="enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-input show">
              <label>Password</label>
              <input
                className="form-control p-3"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="eye" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <IoEyeOutline className="icon-m" />
                ) : (
                  <IoEyeOffOutline className="icon-m" />
                )}
              </span>
            </div>
            <button className="login-btn">{loading ? 'Loading...' : 'Sign up' }</button>
          </form>
          <div className="line">
            <span className="login-border"></span>
            or
            <span className="login-border"></span>
          </div>
          <p>Sign in with</p>
          <div className="box-auth">
            <span>
              <img src={fb} alt="facebook" />
            </span>
            <span>
              <img src={apple} alt="apple" />
            </span>
            <span>
              <img src={google} alt="google" />
            </span>
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;
