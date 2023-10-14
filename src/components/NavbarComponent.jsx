import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../css/Navbar.css';



const NavbarComponent = () => {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container className=''>
        <Navbar className='logo' href="#">BLOGG</Navbar>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="nav-ul-items mx-auto my-2 my-lg-0" navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Blog</Nav.Link>
            <Nav.Link href="#action3">About</Nav.Link>
            <Nav.Link href="#action4">Contact</Nav.Link>
          </Nav>
          
          <>
          <Button className=' button-primary' >Get Started</Button>
          </>
            
          {/* <NavDropdown title="" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown> */}
            <div className="ms-4">
            <Nav.Link href="#action5">Sign in</Nav.Link>
            </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </div>
  )
}

export default NavbarComponent