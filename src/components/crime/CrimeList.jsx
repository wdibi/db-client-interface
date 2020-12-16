import React from "react"
import CrimeCard from "./CrimeCard"
import { useHistory } from "react-router-dom";
import { CardColumns } from "react-bootstrap"
import AppSpinner from "../AppSpinner"

export default function CrimeList({ crimes }) {
  let history = useHistory()
  console.log('in crime list')
  const handleOnClick = (crime) => {
    console.log(crime)
    localStorage.setItem(crime._id, JSON.stringify(crime));
    history.push(`/crime/${crime._id}`);
  }


  if (!crimes) {
    return <AppSpinner />
  }
  return (
    <CardColumns>
      {crimes &&
        crimes.map((crime) => (
          <CrimeCard key={crimes._id} handleOnClick={() => handleOnClick(crime)} crime={crime} />
        ))}
    </CardColumns>
  )
}
