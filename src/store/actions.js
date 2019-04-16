import axios from 'axios'
import { createAction } from 'redux-actions'
import * as ACTION_TYPES from './actionTypes'

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

const _loadGroups = () => axios.get('http://localhost:3000').then(
  response => (initialGroupState))

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