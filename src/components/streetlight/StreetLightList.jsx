import React from "react"
import StreetLightCard from "./StreetLightCard"
import { CardColumns } from "react-bootstrap"
import AppSpinner from "../AppSpinner"

export default function StreetLightList({ streetLights, handleOnClick }) {



  if (!streetLights) {
    return <AppSpinner />
  }
  return (
    <CardColumns>
      {streetLights &&
        streetLights.map((streetLight) => (
          <StreetLightCard key={streetLight.id} handleOnClick={() => handleOnClick(streetLight)} streetLight={streetLight} />
        ))}
    </CardColumns>
  )
}
