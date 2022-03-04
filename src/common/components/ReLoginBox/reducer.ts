import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { actions } from './actions'

export interface IOpenState {
	isRefresh?: boolean
}
export interface IState extends IOpenState {
	active: boolean
}

export const INIT_STATE: IState = {
	active: false,
	isRefresh: true,
}

export const reducer = reducerWithInitialState(INIT_STATE)
	.case(actions.openBox, (state, paylod) => {
		if (!state.active) {
			return { ...state, active: true, isRefresh: !(paylod === false) }
		} else {
			return state
		}
	})
	.case(actions.closeBox, () => {
		return INIT_STATE
	})
