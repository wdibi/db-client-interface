import React, { useEffect, useState } from 'react'


export default ({ routeName, lat, lng }) => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
      console.log("in use", lat, lng)
      async function fetchCall() {
        try {
            const response = await fetch(`http://localhost:8080/nitelite_api/${routeName}?lat=${lat}&lng=${lng}`, {
              method: 'GET',
              headers: {'Content-Type': 'application/json'}
            })
            const data = await response.json()
            setData(data)
            setLoading(false)
            console.log("this is data:" , data)
      
          } catch(err){
            console.log(err)        
          }
      }
      if(!!lat && !!lng) {
        console.log("inhere")

          fetchCall()
      }

  }, [lat, lng, loading])

  return [data, loading, error]
}