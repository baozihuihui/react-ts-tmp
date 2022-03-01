import { reducerWithInitialState } from 'typescript-fsa-reducers'

export interface IState {
	active: Boolean
	isRefresh: Boolean
}

export const INIT_STATE: IState = {
	active: false,
	isRefresh: false,
}

export const reducer = reducerWithInitialState(INIT_STATE)
