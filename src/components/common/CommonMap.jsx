import React, { useState } from 'react'
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps'

function Map({ data }) {
  const [infoBoxOpen, setInfoBoxOpen] = useState(false)
  const onMarkerClick = () => {
    setInfoBoxOpen(true)
  }

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