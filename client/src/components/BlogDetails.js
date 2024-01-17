import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [isEditing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [editedTitle, setEditedTitle] = useState("");

  const fetchBlog = useCallback(async () => {
    try {
      const response = await axios.get(`/Myblogs/${id}`);
      setBlog(response.data);
      setEditedTitle(response.data.title);
      setEditedContent(response.data.content);
    } catch (error) {
      console.error('Error fetching blog details', error);
    }
  }, [id]);

  useEffect(() => {
    fetchBlog();  // Initial fetch on component mount
  }, [fetchBlog]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`/Myblogs/${id}`, { title: editedTitle, content: editedContent });
      setEditing(false);
      fetchBlog();  // Fetch the updated data after successful save
    } catch (error) {
      console.error('Error saving blog post', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-3">{blog.title}</h1>
      {isEditing ? (
        <>
          <div className="mb-3">
            <label htmlFor="editedTitle" className="form-label">Title:</label>
            <input
              type="text"
              className="form-control"
              id="editedTitle"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="editedContent" className="form-label">Content:</label>
            <textarea
              className="form-control"
              id="editedContent"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <p>{blog.content}</p>
          <button className="btn btn-secondary" onClick={handleEdit}>Edit</button>
        </>
      )}
    </div>
  );
};

export default BlogDetails;
