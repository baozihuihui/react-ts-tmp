import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { actions, asyncActions } from './action'
import { ContextStatus } from './constant'

export interface IState {
	contextStatus: ContextStatus
	context?: string
	counter: number
}

export const INIT_STATE: IState = {
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
	.case(asyncActions.getContextAsync.started, state => {
		return { ...state, contextStatus: ContextStatus.LOADING }
	})
	.case(asyncActions.getContextAsync.failed, state => {
		return { ...state, preContext: ContextStatus.ERROR }
	})
	.case(asyncActions.getContextAsync.done, (state, payload) => {
		return { ...state, preContext: ContextStatus.SUCCESS, context: payload.result }
	})
