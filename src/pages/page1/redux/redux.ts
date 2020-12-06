/**
 * 集成 store 以及 中间件
 */

import { applyMiddleware, compose, createStore, StoreEnhancer } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { IGlobalState, globalReducer } from './reducer'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]

let enhancer: StoreEnhancer

if (process.env.NODE_ENV === 'development') {
	enhancer = composeWithDevTools(applyMiddleware(...middlewares))
}

if (process.env.NODE_ENV === 'production') {
	enhancer = compose(applyMiddleware(...middlewares))
}

const configureStore = () => {
	return createStore<IGlobalState, any, any, any>(globalReducer, enhancer)
}

export default configureStore
