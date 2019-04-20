import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Homepage from 'pages/Homepage'
import LoginPage from 'pages/LoginPage'

const App = props => (
  <Switch>
    <Route exact path='/' component={Homepage} />
    <Route path='/login' exact={true} component={LoginPage} />
    <Route path='/auth/:kind' exact={true} />
    <Route />
  </Switch>
)

export default App
