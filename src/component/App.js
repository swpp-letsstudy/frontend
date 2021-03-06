import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import * as pages from 'pages'
import PrivateRoute from 'component/PrivateRoute'
import routes from 'routes'

const App = () =>
    <Switch>
      <Redirect exact from='/' to={routes.GROUP_LIST}/>
      <PrivateRoute exact path={routes.GROUP_LIST} component={pages.GroupListPage}/>

      <Route path={routes.LOGIN} component={pages.LoginFormPage}/>
      <Route path={routes.REGISTER} component={pages.RegisterFormPage}/>

      <PrivateRoute path={routes.GROUP_FORM} component={pages.GroupFormPage}/>
      <PrivateRoute path={routes.GROUP_DETAIL} component={pages.GroupDetailPage}/>

      <PrivateRoute exact path={routes.MEETING_LIST} component={pages.MeetingListPage}/>
      <PrivateRoute path={routes.MEETING_FORM} component={pages.MeetingFormPage}/>
      <PrivateRoute path={routes.MEETING_DETAIL} component={pages.MeetingDetailPage}/>

      <PrivateRoute path={routes.CHATTING} component={pages.ChattingPage}/>

      <PrivateRoute path={routes.USER_SETTING} component={pages.UserSettingPage}/>
      <PrivateRoute path={routes.GROUP_SETTING} component={pages.GroupSettingPage}/>

      <PrivateRoute path={routes.GROUP_MEMBERS} component={pages.GroupMembersPage}/>

      <PrivateRoute path={routes.CLOUD_STORAGE} component={pages.CloudStoragePage}/>

      <PrivateRoute exact path={routes.GROUP_NOTICE_LIST} component={pages.GroupNoticeListPage}/>
      <PrivateRoute path={routes.GROUP_NOTICE_FORM} component={pages.GroupNoticeFormPage}/>
      <PrivateRoute path={routes.GROUP_NOTICE_DETAIL} component={pages.GroupNoticeDetailPage}/>

      <PrivateRoute path={routes.MEETING_NOTICE_FORM} component={pages.MeetingNoticeFormPage}/>
      <PrivateRoute path={routes.MEETING_NOTICE_DETAIL} component={pages.MeetingNoticeDetailPage}/>
      
      <PrivateRoute exact path={routes.MY_POLICY_LIST} component={pages.MyPolicyListPage}/>
      <PrivateRoute exact path={routes.POLICY_LIST} component={pages.PolicyListPage}/>
      <PrivateRoute path={routes.POLICY_FORM} component={pages.PolicyFormPage}/>
      <PrivateRoute path={routes.POLICY_DETAIL} component={pages.PolicyDetailPage}/>
      <PrivateRoute path={routes.MEETING_POLICY_MANAGE} component={pages.MeetingPolicyManagePage}/>
    </Switch>

export default App
