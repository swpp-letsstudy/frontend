import axios from 'axios'
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

export const loadGroups = () => ({
  type: ACTION_TYPES.LOAD_GROUPS,
  data: axios.get('http://localhost:3000').then(
    response => (initialGroupState)
  )
})

