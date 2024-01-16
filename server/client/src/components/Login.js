import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, authenticated } = useAuth();

  const loginUser = async (data) => {
    try {
      const response = await axios.post("http://localhost:5555/login", data);
      console.log(response.data);
      login(); // Set authentication status to true
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  if (authenticated) {
    // Redirect to home if already authenticated
    return <Navigate to="/" />;
  }

  return (
    <div className="container">
      <div className="form">
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit(loginUser)}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Your email"
              {...register('email', { required: true })}
            />
          </Form.Group>
          {errors.email && <p style={{ color: 'red' }}><small>Email is required</small></p>}
          <br></br>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Your password"
              {...register('password', { required: true, minLength: 8 })}
            />
          </Form.Group>
          {errors.password && <p style={{ color: 'red' }}><small>Password is required</small></p>}
          {errors.password?.type === "minLength" && <p style={{ color: 'red' }}>
            <small>Password should be more than 8 characters</small>
          </p>}
          <br></br>

          <Form.Group>
            <Button variant="primary" type="submit">Login</Button>
          </Form.Group>
          <br></br>

          <Form.Group>
            <small>Do not have an account? <Link to='/signup'>Create One</Link></small>
          </Form.Group>
        </form>
      </div>
    </div>
  );
};

export default Login;
