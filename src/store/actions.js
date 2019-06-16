import { createActions } from 'redux-actions'
import axios from 'axios'

import ACTION_TYPES from 'store/actionTypes'
import apis, { setHeaderAuthorization } from 'apis'

export default createActions({
  [ACTION_TYPES.LOGIN]: payload => apis.login(payload).then(value => {
    const user = value.data
    setHeaderAuthorization(user.token)
    localStorage.setItem('user', JSON.stringify(user))
    return value
  }),
  [ACTION_TYPES.LOGOUT]: () => apis.logout().then(value => {
    delete axios.defaults.headers.common.Authorization
    localStorage.removeItem('user')
    return value
  }),
  [ACTION_TYPES.UPDATE_USER_SETTING]: payload => apis.updateUserSetting(payload).then(value => {
    let user = JSON.parse(localStorage.getItem('user'))
    user.nickname = value.data.nickname
    localStorage.setItem('user', JSON.stringify(user))
    value.data = user
    return value
  }),
  [ACTION_TYPES.SIGNOUT]: () => apis.signout.then(value => {
    delete axios.defaults.headers.common.Authorization
    localStorage.removeItem('user')
    return value
  }),
  [ACTION_TYPES.LOAD_GROUPS]: apis.loadGroups,
  [ACTION_TYPES.LOAD_MEETINGS]: apis.loadMeetings,
  [ACTION_TYPES.LOAD_GROUP_NOTICES]: apis.loadGroupNotices,
  [ACTION_TYPES.LOAD_MEETING_NOTICES]: apis.loadMeetingNotices,
  [ACTION_TYPES.LOAD_POLICIES]: apis.loadPolices,
  [ACTION_TYPES.LOAD_MEETING_FINES]: apis.loadMeetingFines,
})
