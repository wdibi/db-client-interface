import React, {useContext} from "react"
import { Card, Button } from "react-bootstrap"
import {Context as StoreContext} from '../../context/StoreContext'


export default function CrimeCard({ handleOnClick, crimeCode}) {
  const {deleteCrimeCodes, editCrimeCodes} = useContext(StoreContext)
  let {_id, code, description} = crimeCode

  return (
    <Card key={_id} style={{ margin: "10px 0px" }} className="text-center">
      <Card.Body className="card-body" onClick={() => handleOnClick(crimeCode)}>
        <Card.Title><span 
             onClick={handleOnClick} style={{position: "absolute" ,top: 10, left: 10, cursor: "pointer"}}>✏️</span>
        {code}</Card.Title>
        <Card.Text></Card.Text>
        <Card.Text>
         {description}
        </Card.Text>
      <Card.Footer><Button onClick={() => deleteCrimeCodes(_id)} variant="outline-danger">Delete</Button></Card.Footer>
      </Card.Body>

    </Card>
  )
}
