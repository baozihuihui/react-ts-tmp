import { IGlobalStateReLogin } from '@common/interface/redux'
import { IState as IReLoginState } from './reducer'
import React from 'react'
import { connect } from 'react-redux'

type IReLoginBoxProps = { ReLoginBoxState: IReLoginState }

const ReLoginBox: React.FC<IReLoginBoxProps> = (props: IReLoginBoxProps) => {
	const { active } = props.ReLoginBoxState
	return active ? <>重新登录</> : null
}

export default connect((state: IGlobalStateReLogin) => ({
	ReLoginBoxState: state.reloginbox,
}))(ReLoginBox)
