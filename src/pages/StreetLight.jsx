import React, { useState, useEffect, useContext } from "react"
import { useHistory } from "react-router-dom";
import StreetLightList from "../components/streetlight/StreetLightList"
import { Container } from "react-bootstrap"
import AppSpinner from "../components/AppSpinner"
import SearchLocation from "../components/SearchLocation/SearchLocation"
import CommonMap from '../components/common/CommonMap'
import {Context as StoreContext} from '../context/StoreContext'
import StreetLightForm from '../components/streetlight/StreetLightForm'


let options = {
  enableHighAccuracy: true,
  maximumAge: 0,
}
export default function Home() {
  const [coord, setCoord] = useState({ lat: "", lng: "" })
  let history = useHistory()
  const {state: {streetlights}, fetchStreetLights} =  useContext(StoreContext)
  const [loading, setLoading] = useState(false)

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
      setToUsersCurrentLocation()
  }, [])

  useEffect(() => {
    async function callee() {
      console.log("in useEffect: ", coord)
      await fetchStreetLights(coord)
    } 
    if(coord.lat !== "") {
    callee()   
    setLoading(false)
    }
    console.log('this is after the fetch')
  }, [setLoading, coord])

  const handleOnClick = (streetLight) => {
    console.log(streetLight)
    history.push(`/streetLight/${streetLight.id}`);
  }

  return (
    <Container>
      <SearchLocation
        setCoord={setCoord}
        setToUsersCurrentLocation={setToUsersCurrentLocation}
      />

      {loading || streetlights.length === 0 ? <AppSpinner /> : (     
      <>
        <CommonMap 
          data={streetlights.map((item) =>  ({
            lat: item.location.coordinates[1],
            lng: item.location.coordinates[0] }))}
          center={{lat: coord.lat, lng: coord.lng}}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
          loadingElement={<div style={{ height: "400px" }} />}
          containerElement={<div style={{ height: "400px", width: "100%" }} />}
          mapElement={<div style={{ height: "100%",  width: "100%" }} />}
        />
        <StreetLightForm />
        <StreetLightList streetLights={streetlights} handleOnClick={handleOnClick} />
      </>
      )
      }
    </Container>
  )
}
