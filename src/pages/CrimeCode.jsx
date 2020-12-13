import React, { useState, useEffect } from "react"
import CrimeCodeList from "../components/crimecode/CrimeCodeList"
import { Container } from "react-bootstrap"
import AppSpinner from "../components/AppSpinner"
import SearchLocation from "../components/SearchLocation/SearchLocation"
import useFetchData from "../hooks/useFetchData"

let options = {
  enableHighAccuracy: true,
  maximumAge: 0,
}
export default function Home() {
  const [coord, setCoord] = useState({routeName: "safety_score", lat: "", lng: "" })
  const [data, loading, error] = useFetchData(coord)
  console.log("coord", loading)

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
      if (!coord.lat) {
        setToUsersCurrentLocation()
      }
  }, [data])

  return (
    <Container>
      <SearchLocation
        setCoord={setCoord}
        setToUsersCurrentLocation={setToUsersCurrentLocation}
      />
      {loading ? <AppSpinner /> : <CrimeCodeList crimeCodes={data} />}
    </Container>
  )
}
