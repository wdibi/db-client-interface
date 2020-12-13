import React from "react"
import StreetLightCard from "./StreetLightCard"
import { useHistory } from "react-router-dom";
import { CardColumns } from "react-bootstrap"
import AppSpinner from "../AppSpinner"

export default function CrimeList({ streetLights }) {
  let history = useHistory()
  console.log('in streetLight list')
  const handleOnClick = (streetLight) => {
    console.log(streetLight)
    localStorage.setItem(streetLight._id, JSON.stringify(streetLight));
    history.push(`/streetLight/${streetLight._id}`);
  }


  if (!streetLights) {
    return <AppSpinner />
  }
  return (
    <CardColumns>
      {streetLights &&
        streetLights.map((streetLight) => (
          <StreetLightCard handleOnClick={() => handleOnClick(streetLight)} streetLight={streetLight} />
        ))}
    </CardColumns>
  )
}
