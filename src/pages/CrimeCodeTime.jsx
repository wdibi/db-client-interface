import React, { useState, useEffect, useContext } from "react"
import { Container, CardColumns, Card } from "react-bootstrap"
import AppSpinner from "../components/AppSpinner"
import {Context as StoreContext} from '../context/StoreContext'



export default function CrimeCodeTime() {
  const {state: {averagecrimecode}, getAverageTimeCrimeCode} =  useContext(StoreContext)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function callee() {
    setLoading(true)
      await getAverageTimeCrimeCode()
    } 
    callee()   
    setLoading(false)
    console.log('this is after the fetch')
  }, [])
  
  function convertToTime(time){
      let mins = time.slice(-2)
      let hours = time.slice(0, time.length - 2)
      return `${hours}:${mins}`
  }

  return (
    <Container>
      {loading || !averagecrimecode ? <AppSpinner /> : (
          <CardColumns>
              {averagecrimecode && averagecrimecode.map((item) => {
                  return (
                    <Card key={item._id} style={{ margin: "10px 0px" }} className="text-center">
                              <Card.Body className="card-body">
                        <Card.Title>{item._id}</Card.Title>
                        <Card.Text>Most common time </Card.Text>
                        <Card.Text>{convertToTime(String(Math.round(item.time)))}</Card.Text>
                        </Card.Body>
                      </Card>
                  )
              })}
          </CardColumns>
      )}
    </Container>
  )
}
