import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import * as pages from 'pages'
import PrivateRoute from 'component/PrivateRoute'
import routes from 'routes'

const App = () =>
    <Switch>
      <Redirect exact from='/' to={routes.GROUP_LIST}/>
      <Route path={routes.LOGIN} component={pages.LoginPage}/>
      <Route path={routes.REGISTER} component={pages.RegisterPage}/>
      <PrivateRoute exact path={routes.GROUP_LIST} component={pages.GroupListPage}/>
      <PrivateRoute path={routes.GROUP_FORM} component={pages.GroupFormPage}/>
      <PrivateRoute path={routes.GROUP_DETAIL} component={pages.GroupDetailPage}/>
      <PrivateRoute path={routes.MEETING_FORM} component={pages.MeetingFormPage}/>
      <PrivateRoute path={routes.MEETING_DETAIL} component={pages.MeetingDetailPage}/>
    </Switch>

export default App
