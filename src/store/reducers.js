import axios from 'axios'
import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import { pender, penderReducer } from 'redux-pender'

import ACTION_TYPES from 'store/actionTypes'
import apis from 'apis';

export const initialUserState = {
  isLoggedIn: localStorage.hasOwnProperty('user') ? apis.loadGroups().then(() => true, () => {
      localStorage.clear()
      return false
    }) : false,
  user: JSON.parse(localStorage.getItem('user')),
}

const userReducer = handleActions({
  ...pender({
    type: ACTION_TYPES.LOGIN,
    onSuccess: (state, action) => {
      return Object.assign({}, state, {
        isLoggedIn: true,
        user: action.payload.data,
      })
    },
    onFailure: (state, action) => {
      delete axios.defaults.headers.common.Authorization
      return Object.assign({}, state, {
        isLoggedIn: false,
        user: '',
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
    },
    onFailure: (state, action) => {
      return Object.assign({}, state, {
        isLoggedIn: false,
        user: ''
      })
    },
  }),
  ...pender({
    type: ACTION_TYPES.UPDATE_USER_SETTING,
    onSuccess: (state, action) => {
      return Object.assign({}, state, {
        isLoggedIn: true,
        user: action.payload.data,
      })
    }
  }),
  ...pender({
    type: ACTION_TYPES.SIGNOUT,
    onSuccess: (state, action) => {
      return Object.assign({}, state, {
        isLoggedIn: false,
        user: ''
      })
    },
    onFailure: (state, action) => {
      return Object.assign({}, state, {
        isLoggedIn: false,
        user: ''
      })
    },
  })
}, initialUserState)

export const initialGroupState = {
  groups: [],
  meetings: [],
  groupNotices: [],
  meetingNotices: [],
  policies: [],
  meetingFines: [],
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
  ...pender({
    type: ACTION_TYPES.LOAD_MEETINGS,
    onSuccess: (state, action) => {
      return Object.assign({}, state, {
        meetings: action.payload.data
      })
    },
  }),
  ...pender({
    type: ACTION_TYPES.LOAD_GROUP_NOTICES,
    onSuccess: (state, action) => {
      return Object.assign({}, state, {
        groupNotices: action.payload.data
      })
    },
  }),
  ...pender({
    type: ACTION_TYPES.LOAD_MEETING_NOTICES,
    onSuccess: (state, action) => {
      return Object.assign({}, state, {
        meetingNotices: action.payload.data
      })
    },
  }),
  ...pender({
    type: ACTION_TYPES.LOAD_POLICIES,
    onSuccess: (state, action) => {
      return Object.assign({}, state, {
        policies: action.payload.data
      })
    },
  }),
  ...pender({
    type: ACTION_TYPES.LOAD_MEETING_FINES,
    onSuccess: (state, action) => {
      return Object.assign({}, state, {
        meetingFines: action.payload.data
      })
    },
  }),
}, initialGroupState)

export default combineReducers({
  userReducer,
  groupReducer,
  pender: penderReducer,
})
