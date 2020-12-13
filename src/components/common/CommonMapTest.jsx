import React, { useState, useEffect } from 'react'
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps'

function Map() {
  const [infoBoxOpen, setInfoBoxOpen] = useState(false)
  const [positions, setPositions] = useState([])
  const onMarkerClick = () => {
    setInfoBoxOpen(true)
  }

  useEffect(()=> {
    setPositions([{
      lat: 34.052235,
      lng: -118.243683,
    },
    {
      lat: 34.052659,
      lng: -118.242966,
    }])
  },[setPositions])

  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: 34.052235, lng: -118.243683 }}
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