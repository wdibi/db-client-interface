import React from "react"
import LightCard from "./LightCard"
import { CardColumns } from "react-bootstrap"
import AppSpinner from "./AppSpinner"

export default function LightList({ lights }) {
  const handleOnClick = (light) => {}

  if (!lights) {
    return <AppSpinner />
  }
  return (
    <CardColumns>
      {lights &&
        lights.map((light) => (
          <LightCard handleOnClick={handleOnClick} light={light} />
        ))}
    </CardColumns>
  )
}
