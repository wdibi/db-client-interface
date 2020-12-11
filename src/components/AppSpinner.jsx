import React from "react"
import { Spinner } from "react-bootstrap"

// import "./AppSpinner.scss"

const AppSpinner = () => {
  return (
    <div id="overlay" style={{ width: "100%", textAlign: "center" }}>
      <i
        className="fa fa-spinner fa-pulse fa-3x fa-fw app-spinner"
        aria-hidden="true"
      ></i>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default AppSpinner
