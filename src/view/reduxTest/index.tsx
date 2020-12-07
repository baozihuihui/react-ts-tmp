/** @format */

import React from 'react'
import { IGlobalState } from '../../pages/page1/redux/rootReducer'
import { connect } from 'react-redux'
import { IState as reduxTestState } from './reducer'
import { bindActionCreators } from 'redux'
import { actions } from './action'
import { Button, Input } from 'antd'

interface IStateProps {
	reduxTest: reduxTestState
}

interface IDispatchProps {
	actions: typeof actions
}

type IProps = IStateProps & IDispatchProps

interface IState {
	offset: number
}

class Banner extends React.Component<IProps, IState> {
	state: IState = {
		offset: 1,
	}

	handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ offset: parseInt(e.target.value) })
	}

	handleCounterBtn = (type: 'add' | 'sub') => () => {
		if (type === 'add') {
			return this.props.actions.addCounter(this.state.offset)
		} else if (type === 'sub') {
			return this.props.actions.subConter(this.state.offset)
		}
	}

	render() {
		return (
			<>
				<p>总数：{this.props.reduxTest.counter}</p>
				<div>
					增加数量：
					<Input
						type='text'
						placeholder={'请输入需要增加的数量'}
						value={this.state.offset}
						onChange={this.handleInputChange}
					/>
				</div>

				<Button onClick={this.handleCounterBtn('add')}>增加</Button>
				<Button onClick={this.handleCounterBtn('add')}>调用redux-saga 增加</Button>
				<Button onClick={this.handleCounterBtn('sub')}>减小</Button>
			</>
		)
	}
}

export default connect(
	(state: IGlobalState) => ({
		reduxTest: state.reduxTest,
	}),
	dispatch => ({
		actions: bindActionCreators(actions, dispatch),
	}),
)(Banner)
