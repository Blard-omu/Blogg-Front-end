import React from "react";
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
    zIndex: 9999,
  };

  return (
    <>
      <div className="" style={header}>
        <Navbar
          expand="lg"
          style={{ minHeight: "100px", width: "100%", padding: "0px 10px" }}
        >
          <Navbar className="logo" href="#">
            BLOGG
          </Navbar>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="nav-ul-items mx-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="#action3">About</Nav.Link>
              <Nav.Link href="/blogs">Blog</Nav.Link>
              <Nav.Link href="/blogs/search">Search blogs</Nav.Link>

              {/* <Nav.Link href="#action4">Contact</Nav.Link> */}
              {auth?.token && <Nav.Link href="/create">Create Blog</Nav.Link>}
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
                    <Dropdown.Item onClick={logout} className="text-danger">Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <Button className=" button-primary">
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
