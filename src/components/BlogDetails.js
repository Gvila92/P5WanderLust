import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [isEditing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/Myblogs/${id}`);
        setBlog(response.data);
        setEditedContent(response.data.content);
      } catch (error) {
        console.error('Error fetching blog details', error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`/Myblogs/${id}`, { content: editedContent });
      setEditing(false);
    } catch (error) {
      console.error('Error saving blog post', error);
    }
  };

  return (
    <div className="container">
      <h1>{blog.title}</h1>
      {isEditing ? (
        <>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <p>{blog.content}</p>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
    </div>
  );
};

export default BlogDetails;
