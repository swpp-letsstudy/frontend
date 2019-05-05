import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import { pender, penderReducer } from 'redux-pender'

import ACTION_TYPES from 'store/actionTypes'

export const initialUserState = {
  isLoggedIn: localStorage.hasOwnProperty('user') ? true : false,
  user: JSON.parse(localStorage.getItem('user')),
}

const userReducer = handleActions({
  ...pender({
    type: ACTION_TYPES.LOGIN,
    onSuccess: (state, action) => {
      return Object.assign({}, state, {
        isLoggedIn: true,
        user: action.payload.data
      })
    },
  }),
  ...pender({
    type: ACTION_TYPES.LOGOUT,
    onSuccess: (state, action) => {
      return Object.assign({}, state, {
        isLoggedIn: false,
        user: '',
      })
    }
  })
}, initialUserState)

export const initialGroupState = {
  groups: [],
}

const groupReducer = handleActions({
  ...pender({
    type: ACTION_TYPES.LOAD_GROUPS,
    onSuccess: (state, action) => {
      return Object.assign({}, state, {
        groups: action.payload.data
      })
    },
  }),
}, initialGroupState)

export default combineReducers({
  userReducer,
  groupReducer,
  pender: penderReducer,
})
