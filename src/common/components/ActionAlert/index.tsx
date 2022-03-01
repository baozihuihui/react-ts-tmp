import { IReduxGlobalStateBase } from '@common/interface/redux'
import React from 'react'
import { connect } from 'react-redux'

export enum AlertType {
	SUCCESS = 'success',
	ERROR = 'ERROR',
}

export enum AlertShowType {
	TIP = 'tip',
	DEFAULT = 'alert',
}

export interface IAlertState {
	active: Boolean
	type: AlertType
	showTypr: AlertShowType
	message: string
}

const ActionAlert: React.FC = () => {
	return null
}

export default connect((state: IReduxGlobalStateBase) => ({
	AlertState: state.Alert,
}))(ActionAlert)
