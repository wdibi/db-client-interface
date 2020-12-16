import React from "react"
import { Card } from "react-bootstrap"

export default function CrimeCard({ handleOnClick, crime }) {
  let {crimeCode, dateOccurred, dateReported, id, location: {coordinates}, timeOccurred} = crime
  return (
    <Card key={crime._id} style={{ margin: "10px 0px" }} className="text-center">
      <Card.Body className="card-body" >
        <Card.Title>{crimeCode}</Card.Title>
        <Card.Text></Card.Text>
        <Card.Text>
        long: {coordinates[0]} - lat:  {coordinates[1]} miles
        </Card.Text>
        <small className="text-muted">
        <p>Date Occured : {dateOccurred}</p>
        <p>Time Occured: {timeOccurred}</p>
        <p>Date Reported : {dateReported}</p>
        </small>
      </Card.Body>

    </Card>
  )
}
