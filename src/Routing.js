import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Crime from "./pages/Crime"
import AppBar from "./components/Appbar"

export default function Routing() {
  return (
    <Router>
      <AppBar />
      <div>
        <Switch>
          <Route exact path="/">
          <Crime />       
          </Route>
          <Route path="/crimes/:id"  />
        </Switch>
      </div>
    </Router>
  )
}
