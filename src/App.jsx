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
import UpdateBlog from "./components/BlogFormUpdate";
import FetchBlogs from "./pages/FetchBlogs";
import BlogDetail from "./pages/BlogDetail";
import SearchBlog from "./pages/SearchBlog";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Toaster />
        <div className="container">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blogs" element={<FetchBlogs />} />
          <Route path="/blog/:_id" element={<BlogDetail />} />
          <Route path="/blogs/search" element={<SearchBlog />} />

          {/* Protected Routes */}
          <Route path="/" element={<PrivateRoutes />}>
            <Route path="profile" element={<Profile />} />
            <Route path="create" element={<CreateBlog />} />
            <Route path="blog/update/:_id" element={<UpdateBlog />} />
          </Route>
      </Routes>
        </div>
        <Footer/>
    </BrowserRouter>
  );
}

export default App;
