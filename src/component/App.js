import React from 'react'
import { Switch, Route } from 'react-router-dom'
import * as pages from 'pages'
import PrivateRoute from 'component/PrivateRoute'

const App = () =>
    <Switch>
      <Route exact path='/' component={pages.HomePage}/>
      <Route path='/login' component={pages.LoginPage}/>
      <PrivateRoute path='/group-list' component={pages.GroupListPage}/>
      <PrivateRoute path='/group-form' component={pages.GroupFormPage}/>
      <PrivateRoute path='/group-detail' component={pages.GroupDetailPage}/>
      <PrivateRoute path='/meeting-form' component={pages.MeetingFormPage}/>
    </Switch>

export default App
