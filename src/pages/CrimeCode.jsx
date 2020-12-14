import React, { useState, useEffect, useContext } from "react"
import CrimeCodeList from "../components/crimecode/CrimeCodeList"
import { Container } from "react-bootstrap"
import AppSpinner from "../components/AppSpinner"
import CrimeCodeForm from '../components/crimecode/CrimeCodeForm'
import {Context as StoreContext} from '../context/StoreContext'


let options = {
  enableHighAccuracy: true,
  maximumAge: 0,
}
export default function Home() {
  const [coord, setCoord] = useState({routeName: "safety_score", lat: "", lng: "" })
  const {state: {crimecodes}, fetchCrimeCodes} =  useContext(StoreContext)
  const [loading, setLoading] = useState(false)
  console.log("is loading", loading)
  console.log("crime codes: ", crimecodes)

  const setToUsersCurrentLocation = () => {
    console.log(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(
      async  (position) => {
        setCoord({
          routeName: "safety_score",
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => console.log(err),
      options
    )
  }
  useEffect(() => {
      setToUsersCurrentLocation()
  }, [])

  useEffect(() => {
    async function callee() {
      await fetchCrimeCodes(coord)
    } 
    callee()   
    setLoading(false)
    console.log('this is after the fetch')
  }, [])

  return (
    <Container>
      <CrimeCodeForm />
      {loading || !crimecodes ? <AppSpinner /> : <CrimeCodeList crimeCodes={crimecodes}  />}
    </Container>
  )
}
