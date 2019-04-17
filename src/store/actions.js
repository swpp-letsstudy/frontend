import axios from 'axios'
import { createAction } from 'redux-actions'
import * as ACTION_TYPES from 'store/actionTypes'

const _loadGroups = () => {
  if (localStorage.hasOwnProperty('user') ? false : true) {
    return null
  }
  const user = JSON.parse(localStorage.getItem('user'))
  console.log(user)
  return axios({
    url: `http://localhost:8000/study_groups/${user.id}/`,
    method: 'get',
    headers: {
      'Authorization' : `Token ${user.token}`,
    },
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

export const loadGroups = createAction(ACTION_TYPES.LOAD_GROUPS, _loadGroups)
export const login = createAction(ACTION_TYPES.LOGIN, _login)
