import { IGlobalStateReLogin } from '@common/interface/redux'
import React from 'react'
import { connect } from 'react-redux'

export interface IReLoginState {
	active: Boolean
	isRefresh: Boolean
}

interface IReLoginBoxProps {
	ReLoginState: IReLoginState
}

const ReLoginBox: React.FC<IReLoginBoxProps> = (props: IReLoginBoxProps) => {
	const { ReLoginState } = props
	return ReLoginState.active ? <>重新登录</> : null
}

export default connect((state: IGlobalStateReLogin) => ({
	ReLoginState: state.ReLoginState,
}))(ReLoginBox)
