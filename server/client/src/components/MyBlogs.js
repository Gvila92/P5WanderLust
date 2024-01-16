import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
const MyBlogs = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5555/Myblogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleDeleteBlog = async (blogId) => {
    try {
      await axios.delete(`http://localhost:5555/Myblogs/${blogId}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
    } catch (error) {
      console.error("Error deleting blog", error);
    }
  };

  return (
    <div className="container">
      <h1>My Blogs</h1>
      {user ? (
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id}>
              <h3>{blog.title}</h3>
              <p>{blog.content}</p>
              <Link to={`/MyBlogs/${blog.id}`}>View</Link>
              <button onClick={() => handleDeleteBlog(blog.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Please log in to view your blogs.</p>
      )}
    </div>
  );
};

export default MyBlogs;
