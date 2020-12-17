/** @format */

import React, { useState, useEffect, useContext } from 'react'
import CrimeList from '../components/crime/CrimeList'
import { Container } from 'react-bootstrap'
import AppSpinner from '../components/AppSpinner'
import SearchLocation from '../components/SearchLocation/SearchLocation'
import useFetchData from '../hooks/useFetchData'
import CommonMap from '../components/common/CommonMap'
import { Context as StoreContext } from '../context/StoreContext'

let options = {
  enableHighAccuracy: true,
  maximumAge: 0,
}
export default function Home() {
  const [coord, setCoord] = useState({ lat: '', lng: '' })
  const {
    state: { crimes },
    fetchCrimes,
  } = useContext(StoreContext)
  const [loading, setLoading] = useState(false)
  console.log('loading', loading, crimes)

  const setToUsersCurrentLocation = () => {
    console.log(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
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
    setToUsersCurrentLocation()
  }, [])

  useEffect(() => {
    async function callee() {
      console.log('in useEffect: ', coord)
      await fetchCrimes(coord)
    }
    if (coord.lat !== '') {
      callee()
      setLoading(false)
    }
    console.log('this is after the fetch')
  }, [setLoading, coord])

  return (
    <Container>
      <SearchLocation
        setCoord={setCoord}
        setToUsersCurrentLocation={setToUsersCurrentLocation}
      />

      <div>
        {loading || crimes.length === 0 ? (
          <AppSpinner />
        ) : (
          <>
            <div className='text-center'>
              <h1>Hi Professor :)</h1>
              <p> I hope you enjoy our interface!</p>
              <p>
                You can navigate to Street lights, Crime Code and Crime Code
                Time.
              </p>
              <p>
                Loading will not be fast since we are on a free tier plan for
                our cloud host provider.
              </p>
              <p>
                On the street light page you will find a fetch based on your
                current location or a desired new one (limited to 5) as well as
                full CRUD for streetlights. To edit click on the pencil and it
                will auto populate the form fields.
              </p>
              <p>
                On the crime code page you will find a fetch for all the crime
                codes as well as CRUD for crime code. The only difference is
                that when deleting a crime code it will also delete all crimes
                with that crime code. All other functionality is the same.
              </p>
              <p>
                On the crime code time page you will find our aggregate which
                takes the average time of the occurrence of that crime.
              </p>
            </div>
            <CommonMap
              data={crimes.map((item) => ({
                lat: item.location.coordinates[1],
                lng: item.location.coordinates[0],
              }))}
              center={{ lat: coord.lat, lng: coord.lng }}
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
              loadingElement={<div style={{ height: `400px` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={
                <div style={{ height: `400px`, position: 'relative' }} />
              }
            />
            <CrimeList crimes={crimes} />
          </>
        )}
      </div>
    </Container>
  )
}
