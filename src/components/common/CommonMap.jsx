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
  const onMarkerClick = () => {
    setInfoBoxOpen(true)
  }

  useEffect(()=> {
    
  },[])

  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: data.latitude, lng: data.longitude }}
    >
      <Marker
        onClick={onMarkerClick}
        position={{
          lat: data.latitude,
          lng: data.longitude,
        }}
      />
    </GoogleMap>
  )
}
export default withScriptjs(withGoogleMap(Map))