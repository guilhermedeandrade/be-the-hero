import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Logon, Register, Profile, NewIncident } from './pages'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Logon />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/incidents/new">
          <NewIncident />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
