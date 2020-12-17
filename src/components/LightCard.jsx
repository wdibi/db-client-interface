/** @format */

import React from 'react'
import { Card } from 'react-bootstrap'

export default function lightCard({ handleOnClick, light }) {
  return (
    <Card key={light.id} style={{ margin: '10px 0px' }} className='text-center'>
      <Card.Body className='card-body' onClick={() => handleOnClick(light)}>
        <Card.Title>{light.name}</Card.Title>
        <Card.Text></Card.Text>
        <Card.Text>Distance from you: {light.distance.toFixed(2)}</Card.Text>
      </Card.Body>
      <Card.Footer className='card-footer'>
        <small className='text-muted'>
          <i className='fa fa-thumbs-up' aria-hidden='true'></i>:{' '}
          <p className='vote-text'>"</p>
          <i class='fa fa-thumbs-down' aria-hidden='true'></i>:{' '}
          <p className='vote-text'>{light.downvote}</p>
        </small>
      </Card.Footer>
    </Card>
  )
}
