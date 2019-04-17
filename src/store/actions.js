import axios from 'axios'
import { createAction } from 'redux-actions'
import * as ACTION_TYPES from 'store/actionTypes'

const _loadGroups = () => axios({
  url: 'http://localhost:8000/study_groups/',
  method: 'get',
})

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
