import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { actions } from './actions'
import { AlertShowType, AlertType } from './constatnt'

export interface IOpenState {
	type?: AlertType
	showType?: AlertShowType
	autoClose?: boolean
	content: string
}
export interface IState extends IOpenState {
	active: boolean
}

export const INIT_STATE: IState = {
	active: false,
	type: AlertType.ERROR,
	showType: AlertShowType.DEFAULT,
	autoClose: true,
	content: '',
}

export const reducer = reducerWithInitialState(INIT_STATE)
	.case(actions.openAlert, (state, paylod) => {
		if (!state.active) {
			return { ...state, active: true, ...paylod }
		} else {
			return state
		}
	})
	.case(actions.closeAlert, () => {
		return INIT_STATE
	})
