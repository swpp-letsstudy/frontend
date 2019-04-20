import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import * as pages from 'pages'
import routes from 'routes'
import PrivateRoute from 'component/PrivateRoute'

const App = () =>
    <Switch>
      <Redirect exact from='/' to={routes.GROUP_LIST}/>
      <Route path={routes.LOGIN} component={pages.LoginPage}/>
      <PrivateRoute path={routes.GROUP_LIST} component={pages.GroupListPage}/>
      <PrivateRoute path={routes.GROUP_FORM} component={pages.GroupFormPage}/>
      <PrivateRoute path={routes.GROUP_DETAIL} component={pages.GroupDetailPage}/>
      <PrivateRoute path={routes.MEETING_FORM} component={pages.MeetingFormPage}/>
    </Switch>

export default App
