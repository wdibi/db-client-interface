import React, { useState, useEffect } from "react"
import LightList from "../components/LightList"
import { Container } from "react-bootstrap"
import AppSpinner from "../components/AppSpinner"

import SearchLocation from "../components/SearchLocation/SearchLocation"
var options = {
  enableHighAccuracy: true,
  maximumAge: 0,
}
export default function Home() {
  const [coord, setCoord] = useState({ lat: "", lng: "" })
  const [lights, setLigths] = useState([])
  let loading = true
  console.log("coord", loading)

  const setToUsersCurrentLocation = () => {
    console.log(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude
        let long = position.coords.longitude
        setCoord({
          lat: lat,
          lng: long,
        })
        fetch(
          `http://localhost:8080/nitelite_api/crimes/crimes?lat=${String(
            lat
          )}&long=${String(long)}`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            setLigths(data)
          })
      },
      (err) => console.log(err),
      options
    )
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

      {loading ? <AppSpinner /> : <LightList lights={lights} />}
    </Container>
  )
}
