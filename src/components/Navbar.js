import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function NavbarComponent() {
  const { authenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Wanderlust
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {!authenticated && <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>}
            {!authenticated && <Nav.Link as={Link} to="/signup">
              Signup
            </Nav.Link>}
            {authenticated && (
              <NavDropdown title="Profile" id="collapsible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/CreateBlog">
                  Create Blog
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/MyBlogs">
                  My Blogs
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          <Nav>
            <Nav.Link href="#deets">placeholder</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              placeholder
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
