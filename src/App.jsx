// App.jsx
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/NavbarComponent";
import Login from "./pages/SignIn";
import Register from "./pages/SignUp";
import CreateBlog from "./pages/CreatBlogForm";
import Profile from "./pages/Profile";
import PrivateRoutes from "./pages/PrivateRoutes";
import BlogUpdate from "./pages/UpdateBlog";
import FetchBlogs from "./pages/FetchBlogs";
import BlogDetail from "./pages/BlogDetail";
import SearchBlog from "./pages/SearchBlog";


function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Navbar />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blogs" element={<FetchBlogs/>} />
          <Route path="/blog/:_id" element={<BlogDetail/>} />
          <Route path="/blogs/search" element={<SearchBlog/>} />

          {/* Protected Routes */}
          <Route path="/" element={<PrivateRoutes />}>
            <Route path="profile" element={<Profile />} />
            <Route path="create" element={<CreateBlog />} />
            <Route path="blog/update" element={<BlogUpdate/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
