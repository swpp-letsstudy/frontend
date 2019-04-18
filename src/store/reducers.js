import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import { pender, penderReducer } from 'redux-pender'
import axios from 'axios'

import * as ACTION_TYPES from "store/actionTypes"

const initialUserState = {
  isLoggedIn: localStorage.hasOwnProperty('user') ? true : false,
  user: JSON.parse(localStorage.getItem('user')),
}

const userReducer = handleActions({
  ...pender({
    type: ACTION_TYPES.LOGIN,
    onSuccess: (state, action) => {
      const { token, username, id } = action.payload.data
      const user = { token, username, id }
      axios.defaults.headers.common['Authorization'] = `Token ${token}`
      localStorage.setItem('user', JSON.stringify(user))
      return Object.assign({}, state, {
        isLoggedIn: true,
        user,
      })
    },
  }),
  ...pender({
    type: ACTION_TYPES.LOGOUT,
    onSuccess: (state, action) => {
      delete axios.defaults.headers.common.Authorization
      localStorage.removeItem('user')
      return Object.assign({}, state, {
        isLoggedIn: false,
        user: '',
      })
    }
  })
}, initialUserState)

const initialGroupState = {
  groups: [],
}

const groupReducer = handleActions({
  ...pender({
    type: ACTION_TYPES.LOAD_GROUPS,
    onSuccess: (state, action) => {
      console.log(action.payload.data)
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
