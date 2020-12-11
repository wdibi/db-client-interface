import React, { useState, useEffect } from "react"
import LightList from "../components/LightList"
import { Container } from "react-bootstrap"
import AppSpinner from "../components/AppSpinner"

import SearchLocation from "../components/SearchLocation/SearchLocation"
var options = {
  enableHighAccuracy: true,
  maximumAge: 0,
}
export default function Restroom() {
  const [coord, setCoord] = useState({ lat: "", lng: "" })
  const [lights, setLigths] = useState([])
  let loading = true
  console.log("coord", loading)

  const setToUsersCurrentLocation = () => {
    console.log(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoord({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
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
