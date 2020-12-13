import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Crime from "./pages/Crime"
import CrimeCode from './pages/CrimeCode'
import Construction from './pages/Construction'
import StreetLight from "./pages/StreetLight"
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
          
          <Route exact path="/streetlight">
            <StreetLight />       
          </Route>
          <Route path="/streetlight/:id"  />

          <Route path="/construction/:id"  />
          <Route exact path="/construction">
            <Construction />       
          </Route>

          <Route path="/crimecode/:id"  />
          <Route exact path="/crimecode">
            <CrimeCode />       
          </Route>

        </Switch>
      </div>
    </Router>
  )
}
