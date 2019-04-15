import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Homepage from './Homepage'

import LoginPage from '../pages/LoginPage'

const App = props => (
  <Switch>
    <Route path='/' exact={true} component={Homepage} />
    <Route path='/login' exact={true} component={LoginPage} />
    <Route path='/auth/:kind' exact={true} />
    <Route />
  </Switch>
)

export default App
