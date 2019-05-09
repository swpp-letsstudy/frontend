import { createActions } from 'redux-actions'
import axios from 'axios'

import ACTION_TYPES from 'store/actionTypes'
import apis from 'apis'
import { setHeaderAuthorization } from 'apis'


export default createActions({
  [ACTION_TYPES.LOAD_GROUPS]: apis.loadGroups,
  [ACTION_TYPES.LOGIN]: payload => apis.login(payload).then(value => {
    const user = value.data
    setHeaderAuthorization(user.token)
    localStorage.setItem('user', JSON.stringify(user))
    return value
  }),
  [ACTION_TYPES.JOIN_GROUP]: apis.joinGroup,
  [ACTION_TYPES.REGISTER]: payload => apis.register(payload),
  [ACTION_TYPES.LOGOUT]: () => apis.logout().then(value => {
    delete axios.defaults.headers.common.Authorization
    localStorage.removeItem('user')
    return value
  }),
})
