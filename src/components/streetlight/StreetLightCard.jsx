import React from "react"
import { Card } from "react-bootstrap"

export default function CrimeCard({ handleOnClick, streetLight }) {
   let { id, location: {coordinates}} = streetLight
  return (
    <Card key={streetLight._id} style={{ margin: "10px 0px" }} className="text-center">
      <Card.Body className="card-body" onClick={() => handleOnClick(streetLight)}>
        <Card.Title>{id}</Card.Title>
  
        <Card.Text>
         lat: {coordinates[0]} -  long: {coordinates[1]} miles
        </Card.Text>
 
      </Card.Body>

    </Card>
  )
}
