/** @format */

import createDataContext from './createDataContext'
import { baseURL } from '../api'

const FETCH_CRIME_CODE = 'FETCH_CRIME_CODE'
const FETCH_CRIMES = 'FETCH_CRIMES'
const GET_AVG_TIME = 'GET_AVG_TIME'
const UPDATE_STREET_LIGHT = 'UPDATE_STREET_LIGHT'
const UPDATE_CRIME_CODE = 'UPDATE_CRIME_CODE'
const DELETE_CRIME_CODE = 'DELETE_CRIME_CODE'
const CREATE_CRIME_CODE = 'CREATE_CRIME_CODE'
const FETCH_STREET_LIGHTS = 'FETCH_STREET_LIGHTS'
const DELETE_STREET_LIGHT = 'DELETE_STREET_LIGHT'
const CREATE_STREET_LIGHT = 'CREATE_STREET_LIGHT'

const initialState = {
  crimecodes: [],
  streetlights: [],
  crimes: [],
  averagecrimecode: [],
}

const storeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CRIME_CODE:
      return {
        ...state,
        crimecodes: action.crimecodes,
      }
    case UPDATE_CRIME_CODE:
      const updatedCrimeCodeItem = action.updatedCrimeCode
      console.log('in reducer: ', updatedCrimeCodeItem)
      const updatedCrimeCodeState = state.crimecodes.filter(
        ({ code }) => code !== updatedCrimeCodeItem.code
      )
      console.log(updatedCrimeCodeState)
      return {
        ...state,
        crimecodes: [updatedCrimeCodeItem, ...updatedCrimeCodeState],
      }
    case UPDATE_STREET_LIGHT:
      const updatedStreetLight = action.updatedStreetLight
      const updatedStreetLightsState = state.streetlights.filter(
        ({ id }) => id !== updatedStreetLight.id
      )
      return {
        ...state,
        streetlights: [...updatedStreetLightsState, updatedStreetLight],
      }
    case FETCH_STREET_LIGHTS:
      return {
        ...state,
        streetlights: action.streetlights,
      }
    case FETCH_CRIMES:
      return {
        ...state,
        crimes: action.crimes,
      }
    case GET_AVG_TIME:
      return {
        ...state,
        averagecrimecode: action.data,
      }
    case DELETE_CRIME_CODE:
      return {
        ...state,
        crimecodes: state.crimecodes.filter(({ code }) => code !== action.id),
      }
    case DELETE_STREET_LIGHT:
      return {
        ...state,
        streetlights: state.streetlights.filter(({ id }) => id !== action.id),
      }
    case CREATE_CRIME_CODE:
      return {
        ...state,
        crimecodes: [...state.crimecodes, action.crimecode],
      }
    case CREATE_STREET_LIGHT:
      return {
        ...state,
        streetlights: [...state.streetlights, action.streetlight],
      }
    default:
      return state
  }
}
const getAverageTimeCrimeCode = (dispatch) => async (id, lng, lat) => {
  try {
    const response = await fetch(`${baseURL}nitelite_api/crime_code/time`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const returnData = await response.json()
    console.log('this is data in context:', returnData)
    dispatch({ type: GET_AVG_TIME, data: returnData })
  } catch (err) {
    console.log(err)
  }
}
const updateStreetLight = (dispatch) => async ({
  streetlight,
  id,
  lng,
  lat,
}) => {
  console.log('this is the streetlight', streetlight)
  const updatedStreetLight = {
    _id: streetlight._id,
    id,
    location: { type: 'Point', coordinates: [Number(lng), Number(lat)] },
  }
  console.log('updated Street Light', updatedStreetLight)
  try {
    const response = await fetch(`${baseURL}nitelite_api/streetlights`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedStreetLight),
    })
    //const returnData = await response.json()
    // console.log("this is data in context:" , returnData)
    dispatch({ type: UPDATE_STREET_LIGHT, updatedStreetLight })
  } catch (err) {
    console.log(err)
  }
}
const updateCrimeCode = (dispatch) => async (data) => {
  console.log('data in context -> ', data)
  try {
    const response = await fetch(`${baseURL}nitelite_api/crime_code`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    //const returnData = await response.json()
    // console.log("this is data in context:" , returnData)
    dispatch({ type: UPDATE_CRIME_CODE, updatedCrimeCode: data })
  } catch (err) {
    console.log(err)
  }
}

const deleteCrimeCodes = (dispatch) => async (id) => {
  try {
    const response = fetch(`${baseURL}nitelite_api/crime_code/${id}`, {
      method: 'DELETE',
    })
  } catch (err) {
    console.log(err)
  }

  dispatch({ type: DELETE_CRIME_CODE, id })
}
const createCrimeCodes = (dispatch) => async (data) => {
  console.log('in create: ')
  try {
    const response = await fetch(`${baseURL}nitelite_api/crime_code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const returnData = await response.json()
    console.log('this is data in context:', returnData)

    dispatch({ type: CREATE_CRIME_CODE, crimecode: returnData })
  } catch (err) {
    console.log(err)
  }
}
const createStreetLight = (dispatch) => async ({ lng, lat, id }) => {
  const newStreetLight = {
    id,
    location: { type: 'Point', coordinates: [Number(lng), Number(lat)] },
  }
  try {
    const response = await fetch(`${baseURL}nitelite_api/streetlights`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStreetLight),
    })
    const returnData = await response.json()
    console.log('this is data in context:', returnData)
    dispatch({ type: CREATE_STREET_LIGHT, streetlight: newStreetLight })
  } catch (err) {
    console.log(err)
  }
}
const deleteStreetLight = (dispatch) => async (id) => {
  console.log(id)
  try {
    const response = fetch(`${baseURL}nitelite_api/streetlights/${id}`, {
      method: 'DELETE',
    })
  } catch (err) {
    console.log(err)
  }

  dispatch({ type: DELETE_STREET_LIGHT, id })
}

const fetchCrimeCodes = (dispatch) => async ({ lat, lng }) => {
  try {
    const response = await fetch(
      `${baseURL}nitelite_api/crime_code?lat=${lat}&lng=${lng}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    )
    const data = await response.json()
    console.log('this is data:', data)
    dispatch({ type: FETCH_CRIME_CODE, crimecodes: data })
  } catch (err) {
    console.log(err)
  }
}
const fetchStreetLights = (dispatch) => async ({ lat, lng }) => {
  try {
    const response = await fetch(
      `${baseURL}nitelite_api/streetlights?lat=${lat}&lng=${lng}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    )
    const data = await response.json()
    console.log('this is data:', lng, lat, data)
    console.log(data)
    dispatch({ type: FETCH_STREET_LIGHTS, streetlights: data })
  } catch (err) {
    console.log(err)
  }
}

const fetchCrimes = (dispatch) => async ({ lat, lng }) => {
  try {
    const response = await fetch(
      `${baseURL}nitelite_api/crimes?lat=${lat}&lng=${lng}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    )
    const data = await response.json()
    console.log('this is data:', lng, lat, data)
    dispatch({ type: FETCH_CRIMES, crimes: data })
  } catch (err) {
    console.log(err)
  }
}

export const { Provider, Context } = createDataContext(
  storeReducer,
  {
    createCrimeCodes,
    deleteCrimeCodes,
    fetchCrimeCodes,
    fetchStreetLights,
    deleteStreetLight,
    createStreetLight,
    updateStreetLight,
    updateCrimeCode,
    fetchCrimes,
    getAverageTimeCrimeCode,
  },
  initialState
)
