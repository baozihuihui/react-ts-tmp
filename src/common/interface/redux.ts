import { IAlertState } from '@common/components/ActionAlert'
import { IState as IReLoginState } from '@common/components/ReLoginBox/reducer'

export interface IReduxGlobalStateBase {
	Alert: IAlertState
}

export interface IGlobalStateReLogin extends IReduxGlobalStateBase {
	ReLoginState: IReLoginState
}
