import React from "react"
import CrimeCodeCard from "./CrimeCodeCard"
import { useHistory } from "react-router-dom";
import { CardColumns } from "react-bootstrap"
import AppSpinner from "../AppSpinner"

export default function CrimeCodeList({ crimeCodes }) {
  let history = useHistory()
  console.log('in crimeCode list')
  const handleOnClick = (crimeCode) => {
    console.log(crimeCode)
    localStorage.setItem(crimeCode._id, JSON.stringify(crimeCode));
    history.push(`/crimeCode/${crimeCode._id}`);
  }


  if (!crimeCodes) {
    return <AppSpinner />
  }
  return (
    <CardColumns>
      {crimeCodes &&
        crimeCodes.map((crimeCode) => (
          <CrimeCodeCard handleOnClick={() => handleOnClick(crimeCode)} crimeCode={crimeCode} />
        ))}
    </CardColumns>
  )
}