import { combineReducers } from 'redux'

import * as ACTION_TYPES from "./actionTypes"

localStorage.setItem('user', JSON.stringify({
  token: 'abcd',
  username: 'Hello',
  id: '123123',
}))

const initialUserState = {
  isLoggedIn: localStorage.hasOwnProperty('user') ? true : false,
  user: JSON.parse(localStorage.getItem('user')),
}

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN:
      const { token, username, id } = action.data
      const user = { token, username, id }
      localStorage.setItem('user', JSON.stringify(user))
      return Object.assign({}, state, {
        isLoggedIn: true,
        user,
      })
    case ACTION_TYPES.LOGOUT:
      localStorage.removeItem('user')
      return Object.assign({}, state, {
        isLoggedIn: false,
        user: null,
      })
    default:
      return state
  }
}

const initialGroupState = [
  {
    id: 0,
    name: 'a',
  },
  {
    id: 1,
    name: 'b',
  },
  {
    id: 2,
    name: 'c',
  },
]

const groupReducer = (state = initialGroupState, action) => {
  switch(action.type) {
    case ACTION_TYPES.LOAD_GROUPS:
      return state
    case ACTION_TYPES.CREATE_GROUPS:
      return state
    case ACTION_TYPES.READ_GROUPS:
      return state
    case ACTION_TYPES.UPDATE_GROUPS:
      return state
    case ACTION_TYPES.DELETE_GROUPS:
      return state
    default:
      return state
  }
}

export default combineReducers({
  userReducer,
  groupReducer,
})
