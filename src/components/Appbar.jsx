import React, { useState, useEffect } from "react"
import { Link, withRouter } from "react-router-dom"
import { Container, Navbar, Nav, Button } from "react-bootstrap"
import Logo from "../Logo.png"

function AppBar() {
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
          <Nav.Link></Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default withRouter(AppBar)
