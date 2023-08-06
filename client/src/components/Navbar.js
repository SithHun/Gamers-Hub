import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import NavbarParticles from "./NavbarParticles";
import Header from "./Header";

import Auth from "../utils/auth";

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar bg="transparent" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <Header />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar" className="d-flex flex-row-reverse">
            <Nav className="ml-auto d-flex">
            <Nav.Link className="navlink" as={Link} to="/">
                Homes
              </Nav.Link>
            <Nav.Link className="navlink" as={Link} to="/search">
                Games
              </Nav.Link>
              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link className="navlink" as={Link} to="/saved">
                    Profile
                  </Nav.Link>
                  <Nav.Link className="navlink" onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link className="navlink" onClick={() => setShowModal(true)}>
                  Sign-In
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <NavbarParticles />
      {/* set modal data up */}
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
        centered 
      >
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link style={{ color: 'black', backgroundColor: 'darkgray', borderColor: 'gray', marginRight: "25px" }} eventKey="login">Member</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link style={{ color: 'black', backgroundColor: 'darkgray', borderColor: 'gray' }} eventKey="signup">New User</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
