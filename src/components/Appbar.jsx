import React, { useState, useEffect } from "react"
import { Link, withRouter } from "react-router-dom"
import { Container, Navbar, Nav, Button } from "react-bootstrap"
import Logo from "../Logo.png"

function AppBar() {
  console.log("process env",process.env)
  return (
    <Navbar expand="lg">
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Navbar.Brand>
          <Link to="/">
            {" "}
            <img
              height="100"
              src={Logo}
              className="d-inline-block align-top"
              alt=""
            />
          </Link>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link>
          <Link to="/streetlight">
            Street Lights
          </Link>
          </Nav.Link>
          <Nav.Link>
          <Link to="/construction">
            Construction
          </Link>
          </Nav.Link>
          <Nav.Link>
          <Link to="/crimecode">
            Crime Code
          </Link>
          </Nav.Link>
          <Nav.Link>
          <Link to="/crimecode/time">
            Crime Code Time
          </Link>
          </Nav.Link>

        </Nav>
      </Container>
    </Navbar>
  )
}

export default withRouter(AppBar)
