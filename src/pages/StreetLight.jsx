import React, { useState, useEffect } from "react"
import StreetLightList from "../components/streetlight/StreetLightList"
import { Container } from "react-bootstrap"
import AppSpinner from "../components/AppSpinner"
import SearchLocation from "../components/SearchLocation/SearchLocation"
import useFetchData from "../hooks/useFetchData"
import CommonMap from '../components/common/CommonMap'

let options = {
  enableHighAccuracy: true,
  maximumAge: 0,
}
export default function Home() {
  const [coord, setCoord] = useState({routeName: "streetlights", lat: "", lng: "" })
  const [data, loading, error] = useFetchData(coord)
  console.log("coord", loading, data)

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

      {loading ? <AppSpinner /> : (     
      <>
          <CommonMap 
          data={data.map((item) => ({ lat: item._id[0], lng: item._id[1]}))}
          center={{lat: data[0]._id[0], lng: data[0]._id[1]}}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
          loadingElement={<div style={{ height: `400px` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `400px`, position: "relative" }} />}
        />
        {/* <StreetLightList streetLights={data} /> */}
      </>
      )
      }
    </Container>
  )
}
