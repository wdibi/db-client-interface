import React, { useEffect, useState } from 'react'

export default ({routeName}) => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {


  }, [lat, lng, loading])

  return [data, loading, error]
}