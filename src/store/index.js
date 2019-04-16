import { createStore, applyMiddleware, compose } from 'redux'
import { penderMiddleware } from 'redux-pender'
import reducers from './reducers'

const composeEnhansers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose

const store = createStore(
    reducers,
    composeEnhansers(
    applyMiddleware(penderMiddleware()))
    
)

export default store
