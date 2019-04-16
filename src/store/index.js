import { createStore, applyMiddleware, compose } from 'redux'
import penderMiddleware from 'redux-pender'
import reducers from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(penderMiddleware()))
)

export default store
