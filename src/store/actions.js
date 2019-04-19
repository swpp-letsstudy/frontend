import axios from 'axios'
import { createAction } from 'redux-actions'
import * as ACTION_TYPES from 'store/actionTypes'

const _loadGroups = () => {
  return axios({
    url: `http://localhost:8000/study_groups/`,
    method: 'get',
  })
}

const _login = (username, password) => axios({
  url: 'http://localhost:8000/login/',
  method: 'post',
  data: {
    username,
    password,
  }
})

const _logout = () => axios({
  url: 'http://localhost:8000/logout/',
  method: 'post',
})

export const loadGroups = createAction(ACTION_TYPES.LOAD_GROUPS, _loadGroups)
export const login = createAction(ACTION_TYPES.LOGIN, _login)
export const logout = createAction(ACTION_TYPES.LOGOUT, _logout)

export const createGroup = createAction(
    ACTION_TYPES.CREATE_GROUP,
    payload => axios.post('http://localhost:8000/study_groups/', {
      name: payload.name,
      info: payload.info,
    })
)
