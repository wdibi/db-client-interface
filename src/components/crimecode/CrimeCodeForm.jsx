import React, {useState, useEffect, useContext} from 'react'
import {Form, Col, Button} from 'react-bootstrap'
import {Context as CrimeCodeContext} from '../../context/CrimeCodeContext'


export default function CrimeCodeForm(){
    const {createCrimeCodes} = useContext(CrimeCodeContext)
    const [code, setCode] = useState("")
    const [description, setDescription] = useState("")

    async function handleSubmit(e){
        e.preventDefault()
        console.log("in form: ", code, description)
        await createCrimeCodes({code, description})
        setCode("")
        setDescription("")
    }

    return (
    <Form onSubmit={handleSubmit}>
        <h1 style={{paddingTop: 10, paddingBottom: 20}}>Create CrimeCode</h1>
        <Form.Row>
            <Col xs={2}>
                <Form.Control 
                value={code} 
                onChange={e => setCode(e.target.value)} 
                type="text" 
                placeholder="Enter Code" />
            </Col>
            <Col xs={8}>
                <Form.Control 
                value={description} 
                onChange={e => setDescription(e.target.value)} 
                type="text" 
                placeholder="Enter Description" />
            </Col>
            <Col xs={2}>
                <Button onClick={handleSubmit}>Submit</Button>
            </Col>
        </Form.Row>
        <hr></hr>
   </Form>
    )
}