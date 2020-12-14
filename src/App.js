import React from "react"
import Routing from "./Routing"
import "bootstrap/dist/css/bootstrap.min.css"
import { Provider as CrimeCodeProvider } from "./context/CrimeCodeContext"
import "./App.scss"

function App() {
  return (
    <CrimeCodeProvider>
      <div className="App">
        <Routing />
      </div>
    </CrimeCodeProvider>
  )
}

export default App
