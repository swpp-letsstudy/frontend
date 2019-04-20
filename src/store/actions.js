import { createActions } from 'redux-actions'
import ACTION_TYPES from 'store/actionTypes'
import apis from 'apis'

export default createActions({
  [ACTION_TYPES.LOAD_GROUPS]: apis.loadGroups,
  [ACTION_TYPES.LOGIN]: apis.login,
  [ACTION_TYPES.LOGOUT]: apis.logout,
})
