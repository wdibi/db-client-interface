
import createDataContext from "./createDataContext"


const FETCH_CRIME_CODE = "FETCH_CRIME_CODE"
const DELETE_CRIME_CODE = "DELETE_CRIME_CODE"
const CREATE_CRIME_CODE = "CREATE_CRIME_CODE"


const initialState = {
  crimecodes: [],
}

const CrimeCodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CRIME_CODE:
        console.log("in reducer: ", state, action.crimecodes)
      return {
        ...state,
        crimecodes: action.crimecodes
      }
    case DELETE_CRIME_CODE:
      return {
        ...state,
        crimecodes: state.crimecodes.filter(({_id}) => _id !== action.id)
      }
    case CREATE_CRIME_CODE:
      return {
        ...state,
        crimecodes: [...state.crimecodes, action.crimecode]
      }
  
    default:
      return state
  }
}

const deleteCrimeCodes = (dispatch) => async (id) => {
    try{
        const response = fetch(`http://localhost:8080/nitelite_api/safety_score/${id}`, {
          method: 'DELETE',
        })
      } catch(err) {
        console.log(err)
      }

      dispatch({ type: DELETE_CRIME_CODE, id })
}
const createCrimeCodes = (dispatch) => async (data) => {
    try {
        const response = await fetch(`http://localhost:8080/nitelite_api/safety_score`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        })
        const returnData = await response.json()
        console.log("this is data in context:" , returnData)
  
        dispatch({ type: CREATE_CRIME_CODE, crimecode: returnData })
      } catch(err){
        console.log(err)        
      }

}


const fetchCrimeCodes = (dispatch) => async ({ lat, lng }) => {
    try {
        const response = await fetch(`http://localhost:8080/nitelite_api/safety_score?lat=${lat}&lng=${lng}`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
        })
        const data = await response.json()
        console.log("this is data:" , data)
        dispatch({ type: FETCH_CRIME_CODE, crimecodes: data })
      } catch(err){
        console.log(err)        
      }

}





export const { Provider, Context } = createDataContext(
    CrimeCodeReducer,
  {
    createCrimeCodes,
    deleteCrimeCodes,
    fetchCrimeCodes, 
  },
  initialState
)