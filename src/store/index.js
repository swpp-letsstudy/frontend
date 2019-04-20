import { createStore, applyMiddleware, compose } from 'redux'
import penderMiddleware from 'redux-pender'

import reducers from './reducers'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middlewares = [thunk, penderMiddleware()]
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middlewares))
)

export default store
