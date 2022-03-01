import { IAlertState } from '@common/components/ActionAlert';
import { IReLoginState } from '@common/components/ReLoginBox'

export interface IReduxGlobalStateBase{
    Alert:IAlertState
}

export interface IGlobalStateReLogin extends IReduxGlobalStateBase{
	ReLoginState: IReLoginState
}
