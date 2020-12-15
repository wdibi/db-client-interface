import React , {useContext} from "react"
import { Card, Button } from "react-bootstrap"
import {Context as StoreContext} from '../../context/StoreContext'


export default function CrimeCard({ handleOnClick, streetLight }) {
   let { id, location: {coordinates}} = streetLight
   const {deleteStreetLight, editStreetLight} = useContext(StoreContext)

  return (
    <Card  key={id} style={{ margin: "10px 0px" }} className="text-center">
      <Card.Body className="card-body" >
        <Card.Title ><span 
             onClick={handleOnClick} style={{position: "absolute" ,top: 10, left: 10, cursor: "pointer"}}>✏️</span>{id}</Card.Title>
        <Card.Text>
        long: {coordinates[0]} - lat:  {coordinates[1]} miles        </Card.Text>
 
      </Card.Body>
      <Card.Footer><Button onClick={() => deleteStreetLight(id)} variant="outline-danger">Delete</Button></Card.Footer>
    </Card>
  )
}
