import React from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AuthLogin from '../assets/images/Authimage.jpeg'
import '../css/login.css'
import fb from '../assets/images/facebook-icon.png'
import apple from '../assets/images/Apple_logo_black.svg.png'
import google from '../assets/images/Google_Icons.webp'
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5"; 

const Login = () => {
  // navigation
  const navigate = useNavigate();
  // Hook
  const [email, setEmail] = useState("example@email.com");
  const [password, setPassword] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)


  const { auth, setAuth } = useAuth();
  // handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Please fill in all fields");
    }

    try {
      setLoading(true)
      const { data } = await axios.post(`/login`, {
        email,
        password,
      });

      if (data?.error) {
        toast.success(data.error);
        setLoading(false)
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        localStorage.setItem("token", data.token);
        setAuth({ ...auth, token: data.token, user: data.user });
        toast.success("Login successful");
        navigate("/");
        setLoading(false)
      }
    } catch (err) {
      if (err?.response?.data) {
        const { error } = err.response.data;
        setError(error);
        toast.error(error);
        setLoading(false)
      } else {
        toast.error("Login failed");
        setLoading(false)
      }
    }
  };

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
            Welcome Back
          </h3>
          <p className="text-center ">
            Enter your email and password to continue with us
          </p>
          <form className="form-login" onSubmit={handleSubmit}>
            <div className="form-input my-4">
              <label>Username</label>
              <input
                className="form-control p-3"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <button className="login-btn">{loading ? 'Loading...' : 'Sign In' }</button>
          </form>
          <div className="line">
          <span className="login-border"></span>
          or
          <span className="login-border"></span>
          </div>
          <p>Sign in with</p>
          <div className="box-auth">
            <span><img src={fb} alt="facebook" /></span>
            <span><img src={apple} alt="apple" /></span>
            <span><img src={google} alt="google" /></span>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
