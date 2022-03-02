import { IActionAlertState } from '@common/components/ActionAlert'
import { IState as IReLoginState } from '@common/components/ReLoginBox/reducer'

export interface IReduxGlobalStateBase {
	actionAlert: IActionAlertState
}

export interface IGlobalStateReLogin extends IReduxGlobalStateBase {
	reloginbox: IReLoginState
}
