import React, { useState, useEffect } from "react"
import CrimeList from "../components/crime/CrimeList"
import { Container } from "react-bootstrap"
import AppSpinner from "../components/AppSpinner"
import SearchLocation from "../components/SearchLocation/SearchLocation"
import useFetchData from "../hooks/useFetchData"
import CommonMapTest from '../components/common/CommonMapTest'

let options = {
  enableHighAccuracy: true,
  maximumAge: 0,
}
export default function Home() {
  const [coord, setCoord] = useState({routeName: "crimes", lat: "", lng: "" })
  const [data, loading, error] = useFetchData(coord)
  console.log("coord", loading)

  const setToUsersCurrentLocation = () => {
    console.log(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(
      async  (position) => {
        setCoord({
          routeName: "streetlights",
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
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
  }, [data])

  return (
    <Container>
      <SearchLocation
        setCoord={setCoord}
        setToUsersCurrentLocation={setToUsersCurrentLocation}
      />
      <CommonMapTest 
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
          loadingElement={<div style={{ height: `400px` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `400px`, position: "relative" }} />}
      />
    <div >
    {loading ? <AppSpinner /> : <CrimeList crimes={data} />}
    </div>

    </Container>
  )
}