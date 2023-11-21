import React from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  // navigation
  const navigate = useNavigate();
  // Hook
  const [email, setEmail] = useState("example@email.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState(null);

  const {auth,  setAuth} = useAuth();
  // handling form submission 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      return toast.error("Please fill in all fields");
    }
  
    try {
      const { data } = await axios.post(`/login`, {
        email,
        password,
      });
  
      if (data?.error) {
        toast.success(data.error);
      }else{
        localStorage.setItem("auth", JSON.stringify(data));
        localStorage.setItem('token', data.token);
        setAuth({ ...auth, token: data.token, user: data.user });
        toast.success("Login successful");
        navigate("/");
      }
    } catch (err) {
      if (err?.response?.data) {
        const { error } = err.response.data;
        setError(error);
        toast.error(error);
      } else {
        toast.error("Login failed");
      }
    }
  };
  
  return (
    <div>
      <h1 className="bg-primary my-4 p-3 text-light text-center">Login</h1>
      <form className="col-12 col-md-6 offset-md-3" onSubmit={handleSubmit}>
        <div className="form-control my-4">
          <input
            className="form-control p-3"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control">
          <input
            className="form-control p-3"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary mt-4">Submit</button>
      </form>
    </div>
  );
};

export default Login;
