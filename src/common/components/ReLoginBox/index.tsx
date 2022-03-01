import { IGlobalStateReLogin } from '@common/interface/redux'
import { IState as IReLoginState } from './reducer'
import React from 'react'
import { connect } from 'react-redux'

type IReLoginBoxProps = { ReLoginState: IReLoginState }

const ReLoginBox: React.FC<IReLoginBoxProps> = (props: IReLoginBoxProps) => {
	const { ReLoginState } = props
	return ReLoginState.active ? <>重新登录</> : null
}

export default connect((state: IGlobalStateReLogin) => ({
	ReLoginState: state.ReLoginState,
}))(ReLoginBox)
