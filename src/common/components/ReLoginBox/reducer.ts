import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { actions } from './actions'
export interface IState {
	active: Boolean
	isRefresh: Boolean
}

export const INIT_STATE: IState = {
	active: false,
	isRefresh: false,
}

export const reducer = reducerWithInitialState(INIT_STATE)
	.case(actions.openBox, (state, paylod) => {
		if (!state.active) {
			return { ...state, ...paylod }
		} else {
			return state
		}
	})
	.case(actions.closeBox, () => {
		return INIT_STATE
	})
