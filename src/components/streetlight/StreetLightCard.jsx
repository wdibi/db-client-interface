import React from "react"
import { Card } from "react-bootstrap"

export default function CrimeCard({ handleOnClick, streetLight }) {

  return (
    <Card key={streetLight.lat} style={{ margin: "10px 0px" }} className="text-center">
      <Card.Body className="card-body" onClick={() => handleOnClick(streetLight)}>
        <Card.Title></Card.Title> 
        <Card.Text>
         lat: {streetLight.lat} -  long: {streetLight.lng} miles
        </Card.Text>
 
      </Card.Body>

    </Card>
  )
}
