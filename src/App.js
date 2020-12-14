import React from "react"
import Routing from "./Routing"
import "bootstrap/dist/css/bootstrap.min.css"
import { Provider as Provider } from "./context/StoreContext"
import "./App.scss"

function App() {
  return (
    <Provider>
      <div className="App">
        <Routing />
      </div>
    </Provider>
  )
}

export default App
