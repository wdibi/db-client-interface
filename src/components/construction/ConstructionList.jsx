import React from "react"
import ConstructionCard from "./ConstructionCard"
import { useHistory } from "react-router-dom";
import { CardColumns } from "react-bootstrap"
import AppSpinner from "../AppSpinner"

export default function CrimeList({ constructions }) {
  let history = useHistory()
  console.log('in construction list')
  const handleOnClick = (construction) => {
    console.log(construction)
    localStorage.setItem(construction._id, JSON.stringify(construction));
    history.push(`/construction/${construction._id}`);
  }


  if (!constructions) {
    return <AppSpinner />
  }
  return (
    <CardColumns>
      {constructions &&
        constructions.map((construction) => (
          <constructionCard handleOnClick={() => handleOnClick(construction)} construction={construction} />
        ))}
    </CardColumns>
  )
}
