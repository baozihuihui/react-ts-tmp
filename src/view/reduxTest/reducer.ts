import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { actions, asyncActions } from './action'
import { ContextStatus } from './constant'

interface IReduxTetsStore {
	contextStatus: ContextStatus
	context?: string
	counter: number
}

export const INIT_STATE: IReduxTetsStore = {
	contextStatus: ContextStatus.NONE,
	counter: 0,
}

export const reducer = reducerWithInitialState(INIT_STATE)
	.case(actions.addCounter, (state, payload) => {
		return { ...state, counter: state.counter + payload }
	})
	.case(actions.subConter, (state, payload) => {
		return { ...state, counter: state.counter - payload }
	})
	.case(asyncActions.getContext.started, state => {
		return { ...state, contextStatus: ContextStatus.LOADING }
	})
	.case(asyncActions.getContext.failed, state => {
		return { ...state, preContext: ContextStatus.ERROR }
	})
	.case(asyncActions.getContext.done, (state, payload) => {
		return { ...state, preContext: ContextStatus.SUCCESS, context: payload.result }
	})
