import React, { useState, useEffect } from "react"
import CrimeList from "../components/crime/CrimeList"
import { Container } from "react-bootstrap"
import AppSpinner from "../components/AppSpinner"
import SearchLocation from "../components/SearchLocation/SearchLocation"
let options = {
  enableHighAccuracy: true,
  maximumAge: 0,
}
export default function Home() {
  const [coord, setCoord] = useState({ lat: "", lng: "" })
  const [crimes, setCrimes] = useState([])
  const [loading, setLoading] = useState(false)
  console.log("coord", loading)

  const setToUsersCurrentLocation = () => {
    console.log(navigator.geolocation)
    let lat, long
    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      async  (position) => {
        lat = position.coords.latitude
        long = position.coords.longitude
        setCoord({lat: lat,lng: long})
        try {
          const response = await fetch(`http://localhost:8080/nitelite_api/crimes?lat=${lat}&long=${long}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
          })
          const data = await response.json()
          setCrimes(data)
          setLoading(false)
          console.log("this is data:" , data)

        } catch(err){
          console.log(err)
          
        }

      },
      (err) => console.log(err),
      options
    )
    setLoading(false)
  }

  useEffect(() => {
    console.log("api")
    console.log(coord)

      if (!coord.lat) {
        setToUsersCurrentLocation()
      }
  }, [setCoord])

  return (
    <Container>
      <SearchLocation
        setCoord={setCoord}
        setToUsersCurrentLocation={setToUsersCurrentLocation}
      />

      {loading ? <AppSpinner /> : <CrimeList crimes={crimes} />}
    </Container>
  )
}
