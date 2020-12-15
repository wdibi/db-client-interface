import React, {useState, useEffect, useContext} from 'react'
import {Form, Col, Button} from 'react-bootstrap'
import {Context as StoreContext} from '../../context/StoreContext'
import {
    useParams, 
    useHistory
  } from "react-router-dom";


export default function CrimeCodeForm(){
    const {crimeCodeId} = useParams()
    let history = useHistory()
    const { state: {crimecodes}, createCrimeCodes, updateCrimeCode} = useContext(StoreContext)
    const crimecode = crimecodes.find(({_id})=> _id === crimeCodeId)
    console.log("crime code: ", crimecode)
    const [code, setCode] = useState("")
    const [description, setDescription] = useState("")

    async function handleSubmit(e){
        e.preventDefault()
        console.log("in form: ", code, description)
        if(!!crimeCodeId) {
            updateCrimeCode({code, description, _id: crimecode._id } )
            history.push("/crimecode") }
            else {
                await createCrimeCodes({code, description})
            }
 
        setCode("")
        setDescription("")
    }

    useEffect(()=> {
        if(!!crimeCodeId){
            setCode(crimecode.code)
            setDescription(crimecode.description)
        }
    }, [crimeCodeId])

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