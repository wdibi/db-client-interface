import React, { useState, useEffect } from 'react'
import AppSpinner from "../AppSpinner"
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps'

function Map({data, center}) {
  const [infoBoxOpen, setInfoBoxOpen] = useState(false)
  const [positions, setPositions] = useState([])
  const onMarkerClick = () => {
    setInfoBoxOpen(true)
  }

  useEffect(()=> {
    setPositions(data)
    console.log(data)
  },[data])

  if(!data) {
    console.log("recieving data", data)
    return <AppSpinner/>
  }

  return (
    <GoogleMap
      defaultZoom={12}
      center={center}
    >
      { positions && positions.map((pos, index ) => (
      <Marker
      key={index}
      onClick={onMarkerClick}
      position={{
        lat: pos.lat,
        lng: pos.lng,
      }}
    />
      ))}

    </GoogleMap>
  )
}
export default withScriptjs(withGoogleMap(Map))