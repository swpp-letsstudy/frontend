import { createAction, createActions } from 'redux-actions'
import * as ACTION_TYPES from 'store/actionTypes'
import * as apis from 'apis'


export const loadGroups = createAction(ACTION_TYPES.LOAD_GROUPS, apis.loadGroups)
export const login = createAction(ACTION_TYPES.LOGIN, apis.login)
export const logout = createAction(ACTION_TYPES.LOGOUT, apis.logout)
