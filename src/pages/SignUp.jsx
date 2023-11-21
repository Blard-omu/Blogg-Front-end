import React from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {

  // navigation
  const navigate = useNavigate()
  // Hook
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


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
      // Sending a request for registration
      const { data } = await axios.post(`/register`, {
        username,
        email,
        password,
      });
      // Check for a success message or response
      if (!data?.error) {
        toast.success("Registration successful");
        navigate('/login');
      }else{
        toast.error(data.error)
      }
    } catch (err) {
      if (err?.data && err.response.data) {
        const { error } = err.response.data;
        if (error === 'password must be at least 6 characters long!') {
          return toast.error(error);
        }
        toast.error(error);
      } else {
        toast.error("Registration failed");
      }
    }
  };
  
  
  // console.log(username);
  // console.log(email);
  return (
    <div>
      <h1 className="bg-primary my-4 p-3 text-light text-center">Register</h1>
      <form className="col-12 col-md-6 offset-md-3" onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            className="form-control p-3"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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

export default Register;
