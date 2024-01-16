import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const CreateBlog = () => {
  const { user } = useAuth(); // Get the currently logged-in user
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCreateBlog = async () => {
    try {
      // Create FormData and append data
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('location', location);
      formData.append('user_id', user.id);
  
      if (imageFile) {
        formData.append('image', imageFile);
      } else {
        // If image is specified by URL, add it to the formData
        formData.append('imageUrl', imageUrl);
      }
  
      // Make the POST request
      const response = await axios.post('http://localhost:5555/blog_posts', formData, {
        withCredentials: true,  // Include credentials
        headers: {
          'Content-Type': 'multipart/form-data',  // Specify content type for FormData
        },
      });
  
      console.log('Blog Created:', response.data);
      // Reset the form fields
      setTitle('');
      setContent('');
      setLocation('');
      setImageUrl('');
      setImageFile(null);
    } catch (error) {
      console.error('Error creating blog', error);
    }
  };

  return (
    <div className="container">
      <h1>Create a Blog</h1>
      <Form>
        <Form.Group controlId="blogTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the title of your blog"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="blogLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the location of your blog"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="blogContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Write your blog content here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="blogImage">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <Form.Text className="text-muted">OR</Form.Text>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imageUrl && <img src={imageUrl} alt="Blog Preview" style={{ marginTop: '10px', maxWidth: '100%' }} />}
        </Form.Group>

        <Button variant="primary" onClick={handleCreateBlog}>
          Create Blog
        </Button>
      </Form>
    </div>
  );
};

export default CreateBlog;
