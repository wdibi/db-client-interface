/** @format */

import React from 'react'
import { Card } from 'react-bootstrap'

export default function ConstructionCard({ handleOnClick, construction }) {
  let {
    permit_type,
    id,
    location: { coordinates },
  } = construction
  return (
    <Card
      key={construction._id}
      style={{ margin: '10px 0px' }}
      className='text-center'
    >
      <Card.Body
        className='card-body'
        onClick={() => handleOnClick(construction)}
      >
        <Card.Title>{permit_type}</Card.Title>
        <Card.Text></Card.Text>
        <Card.Text>
          long: {coordinates[0]} - lat: {coordinates[1]}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
