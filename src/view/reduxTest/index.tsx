/** @format */

import React from 'react'
import { IGlobalState } from '../../pages/page1/redux/reducer'
import { connect } from 'react-redux'
import { IState as reduxTestState } from './reducer'
// import { actions } from './action'

interface IProps {
	reduxTest: reduxTestState
}

interface IState {}

class Banner extends React.Component<IProps, IState> {
	state: IState = {}

	render() {
		return <>{this.props.reduxTest.counter}</>
	}
}

export default connect((state: IGlobalState) => ({
	reduxTest: state.reduxTestState,
}))(Banner)
