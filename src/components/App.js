import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import CreateBlog from './CreateBlog';
import MyBlogs from './MyBlogs';
import { AuthProvider } from '../contexts/AuthContext'; 
import BlogDetails from './BlogDetails';


function App() {



  return (
    <Router>
      <AuthProvider> 
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/CreateBlog" element={<CreateBlog />} />
          <Route path="/MyBlogs/" element={<MyBlogs />} />
          <Route path="/MyBlogs/:id" element={<BlogDetails />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
