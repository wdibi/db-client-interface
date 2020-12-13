import React from "react"
import { Card } from "react-bootstrap"

export default function CrimeCard({ handleOnClick, crimeCode }) {
  let {code, description} = crimeCode
  return (
    <Card key={crimeCode._id} style={{ margin: "10px 0px" }} className="text-center">
      <Card.Body className="card-body" onClick={() => handleOnClick(crimeCode)}>
        <Card.Title>{code}</Card.Title>
        <Card.Text></Card.Text>
        <Card.Text>
         {description}
        </Card.Text>

      </Card.Body>

    </Card>
  )
}
