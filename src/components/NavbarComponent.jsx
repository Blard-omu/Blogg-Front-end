import React from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import "../css/Navbar.css";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const NavbarComponent = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();


  const logout = () => {
    setAuth({ ...auth, auth: null, token: "" });
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    navigate("/");
  };
  const line = {
    width: "100%",
    border: "1px solid #26bdd2",
  };
  const header = {
    position: "fixed",
    width: "100%",
    background: "white",
    top: "0px",
    zIndex: 99,
  };
  const active = {
    textDecoration: 'none',
    color: 'black',
    padding: '2px 6px',
    fontWeight: 600
  }

  return (
    <>
      <div className="" style={header}>
        <Navbar
          expand="lg"
          style={{ minHeight: "100px", width: "100%", padding: "0px 15px" }}
        >
          <Navbar className="logo" href="#">
            BLOGG
          </Navbar>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="nav-ul-items mx-auto my-2 my-lg-0 gap-4 " style={active} navbarScroll>
              <NavLink style={active} exact to="/" activeClassName="active">Home</NavLink>
              <NavLink style={active} to="/about" activeClassName="active">About</NavLink>
              <NavLink style={active} to="/blogs" activeClassName="active">Blog</NavLink>
              <NavLink style={active} to="/blog/search" activeClassName="active">Search blogs</NavLink>

              {/* <NavLink to="/contact" activeClassName="active">Contact</NavLink> */}
              {auth?.token && <NavLink style={active} to="/create" activeClassName="active">Create Blog</NavLink>}
            </Nav>

            {auth?.token ? (
              <>
                <Dropdown>
                  <Dropdown.Toggle variant=" " id="dropdown-basic">
                    <b>{auth.user.username.toUpperCase()}</b>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
                    <NavDropdown.Divider />
                    <Dropdown.Item onClick={logout} className="text-danger">
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <Button className="button-primary">
                  <Nav.Link href="/register">Get Started</Nav.Link>
                </Button>
                <div className="ms-4">
                  <Nav.Link href="/login">Sign in</Nav.Link>
                </div>
              </>
            )}
          </Navbar.Collapse>
        </Navbar>
        <div className="" style={line}></div>
      </div>
    </>
  );
};

export default NavbarComponent;
