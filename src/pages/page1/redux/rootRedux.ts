/**
 * 集成 store 以及 中间件
 */

import { applyMiddleware, compose, createStore, StoreEnhancer } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router'
import { IGlobalState, globalReducer } from './rootReducer'
import globaSaga from './rootSaga'

// middleware - redux-saga
const sagaMiddleware = createSagaMiddleware()

// middleware - connected-react-router
export const history = createBrowserHistory()
const routerMiddleware = createRouterMiddleware(history)

const middlewares = [routerMiddleware, sagaMiddleware]

let enhancer: StoreEnhancer

// add redux devtools
if (process.env.NODE_ENV === 'development') {
	enhancer = composeWithDevTools(applyMiddleware(...middlewares))
}

if (process.env.NODE_ENV === 'production') {
	enhancer = compose(applyMiddleware(...middlewares))
}

const configureStore = () => {
	const store = createStore<IGlobalState, any, any, any>(globalReducer(history), enhancer)
	// apply redux - saga
	sagaMiddleware.run(globaSaga)

	// Hot reloading
	// if (module.hot) {
	// 	// Enable Webpack hot module replacement for reducers
	// 	module.hot.accept('./reducers', () => {
	// 	  store.replaceReducer(globalReducer(history));
	// 	});
	//   }
	return store
}

export default configureStore
