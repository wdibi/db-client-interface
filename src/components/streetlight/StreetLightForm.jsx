import React, {useState, useEffect, useContext} from 'react'
import {Form, Col, Button} from 'react-bootstrap'
import {Context as StoreContext} from '../../context/StoreContext'
import {
    useParams, 
    useHistory
  } from "react-router-dom";


export default function StreetLightForm(){
    const {streetId} = useParams()
    let history = useHistory()
    const { state: {streetlights}, createStreetLight, updateStreetLight} = useContext(StoreContext)
    const streetlight = streetlights.find(({id})=> id === streetId)
    console.log(streetlight)

    const [lat, setLat] = useState("")
    const [lng, setLng] = useState("")
    const [id, setId] = useState("")

    async function handleSubmit(e){
        e.preventDefault()
        console.log("in form: ", lat, lng)
        if(!!streetId) {
            updateStreetLight(lat, lng, id)
            history.push("/streetLight")
        } else {
            await createStreetLight({id, lat, lng})
        }
        setLat("")
        setLng("")
        setId("")
    }

    useEffect(()=> {
        if(!!streetId){
            setLat(streetlight.location.coordinates[1] )
            setLng(streetlight.location.coordinates[0])
            setId(streetlight.id )
        }
    }, [streetId])

    return (
    <Form onSubmit={handleSubmit} className="text-center">
        <h1 style={{paddingTop: 10, paddingBottom: 20}}>Add a new Street Light</h1>
        <Form.Row>
        <Col xs={2}>
                <Form.Control 
                value={id} 
                onChange={e => setId(e.target.value)} 
                type="text" 
                placeholder="Id" />
            </Col>
            <Col xs={4}>
                <Form.Control 
                value={lat} 
                onChange={e => setLat(e.target.value)} 
                type="text" 
                placeholder="latitude" />
            </Col>
            <Col xs={4}>
                <Form.Control 
                value={lng} 
                onChange={e => setLng(e.target.value)} 
                type="text" 
                placeholder="longitude" />
            </Col>
            <Col xs={2}>
                <Button onClick={handleSubmit}>Submit</Button>
            </Col>
        </Form.Row>
        <hr></hr>
   </Form>
    )
}