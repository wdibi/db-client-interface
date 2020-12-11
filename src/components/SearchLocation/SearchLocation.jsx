import React, { useState } from "react"
import { GoogleComponent } from "react-google-location"
import SearchInput from "./SearchInput"
import { Form, Col, Button, OverlayTrigger, Tooltip } from "react-bootstrap"

import "./SearchLocation.scss"

function renderTooltip(props) {
  return (
    <Tooltip id="button-tooltip" {...props}>
      Search Current Location
    </Tooltip>
  )
}

const SearchLocation = ({ setCoord, setToUsersCurrentLocation }) => {
  return (
    <Form.Row className="align-items-center" style={{ margin: "20px 0" }}>
      <Col xs="11">
        <SearchInput setCoord={setCoord} />
      </Col>
      <Col xs="1" style={{ margin: "0" }}>
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <Button variant="outline-dark" onClick={setToUsersCurrentLocation}>
            <i className="fa fa-compass" aria-hidden="true"></i>
          </Button>
        </OverlayTrigger>
      </Col>
    </Form.Row>
  )
}

export default SearchLocation
