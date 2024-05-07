import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
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
    background: 'white',
    top: '0px',
    zIndex: 9999,
    // height: '100px'
  };

  return (
    <>
        <div className="container" style={header}>
          <Navbar expand="lg" style={{height: '100px'}}>
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
                  <b>{auth.user.username.toUpperCase()}</b>
                  <NavDropdown
                    title=""
                    id="navbarScrollingDropdown"
                    align="end"
                    className="dropdown-menu-center"
                  >
                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Settings
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout} className="text-danger">
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
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
