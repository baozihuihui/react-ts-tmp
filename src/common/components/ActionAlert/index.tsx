import { IReduxGlobalStateBase } from '@common/interface/redux'
import { IState as IActionAlertState } from './reducer'
import { AlertShowType, AlertType } from './constatnt'
import { actions } from './actions'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Alert, message } from 'antd'
import { bindActionCreators } from 'redux'

interface IStateProps {
	AlertState: IActionAlertState
}

interface IDispatchProps {
	actions: typeof actions
}

type ActionAlertProps = IStateProps & IDispatchProps

const ActionAlert: React.FC<ActionAlertProps> = props => {
	const { active, content, type, showType, autoClose } = props.AlertState
	const [isTip, changeIsTip] = useState(false)
	let timer = null;
	useEffect(() => {
		if (active) {
			if (showType === AlertShowType.TIP) {
				changeIsTip(true)
				if (type === AlertType.SUCCESS) {
					message.success(content, 2, onClose)
				} else if (type === AlertType.ERROR) {
					message.error(content, 2, onClose)
				}
			}else if(showType === AlertShowType.DEFAULT){
				if(autoClose){
					timer = setTimeout(()=>{
						onClose();
					},2000)
				}
			}
		}
	}, [active])

	const onClose = () => {
		changeIsTip(false)
		props.actions.closeAlert()
	}

	return active && !isTip ? (
		<Alert message={content} type={type} closable={!autoClose} onClose={onClose} showIcon />
	) : null
}

export default connect(
	(state: IReduxGlobalStateBase) => ({
		AlertState: state.actionAlert,
	}),
	dispatch => ({
		actions: bindActionCreators(actions, dispatch),
	}),
)(ActionAlert)
