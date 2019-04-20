import React from 'react'
import { Switch, Route } from 'react-router-dom'
import * as pages from 'pages'

const App = () => (
    <Switch>
      <Route exact path='/' component={pages.HomePage}/>
      <Route path='/login' component={pages.LoginPage}/>
      <Route path='/group-list' component={pages.GroupListPage}/>
      <Route path='/group-form' component={pages.GroupFormPage}/>
      <Route path='/group-detail' component={pages.GroupDetailPage}/>
      <Route path='/meeting-form' component={pages.MeetingFormPage} />
      <Route/>
    </Switch>
)


export default App
