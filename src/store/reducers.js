import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import { pender, penderReducer } from 'redux-pender'

import * as ACTION_TYPES from "./actionTypes"
// import axios from 'axios';

// localStorage.setItem('user', JSON.stringify({
//   token: 'abcd',
//   username: 'Hello',
//   id: '123123',
// }))

const initialUserState = {
  isLoggedIn: localStorage.hasOwnProperty('user') ? true : false,
  user: JSON.parse(localStorage.getItem('user')),
}

const userReducer = handleActions({
  ...pender({
    type: ACTION_TYPES.LOGIN,
    onSuccess: (state, action) => {
      console.log(action)
      return state
    },
  }),
}, initialUserState)

// const userReducer = (state = initialUserState, action) => {
//   switch (action.type) {
//     case ACTION_TYPES.LOGIN:
//       const { username, password } = action.data
      
//       const user = { token, username, id }
//       localStorage.setItem('user', JSON.stringify(user))
//       return Object.assign({}, state, {
//         isLoggedIn: true,
//         user,
//       })
//     case ACTION_TYPES.LOGOUT:
//       localStorage.removeItem('user')
//       return Object.assign({}, state, {
//         isLoggedIn: false,
//         user: null,
//       })
//     default:
//       return state
//   }
// }

const initialGroupState = []

const groupReducer = handleActions({
  ...pender({
    type: ACTION_TYPES.LOGIN,
    onSuccess: (state, action) => (
      console.log(action)
    ),
  }),
}, initialGroupState)

export default combineReducers({
  userReducer,
  groupReducer,
  pender: penderReducer,
})
