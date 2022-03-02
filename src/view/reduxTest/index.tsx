/** @format */

import React from 'react'
import { IGlobalState } from '@pages/page1/redux/rootReducer'
import { connect } from 'react-redux'
import { IState as reduxTestState } from './reducer'
import { bindActionCreators } from 'redux'
import { actions } from './action'
import { actions as ActionAlert } from '@common/components/ActionAlert/actions'
import { Button, Input } from 'antd'

interface IStateProps {
	pathname: string
	reduxTest: reduxTestState
}

interface IDispatchProps {
	actions: typeof actions
	ActionAlert: typeof ActionAlert
}

type IProps = IStateProps & IDispatchProps

interface IState {
	offset?: number | string
}

class ReduxTest extends React.Component<IProps, IState> {
	state: IState = {
		offset: 1,
	}

	componentDidMount() {
		// eslint-disable-next-line no-console
		console.log(this.props.pathname)
	}

	handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target
		const numValue = parseInt(value)
		if (!isNaN(numValue) && 0 + numValue <= 0) {
			this.props.ActionAlert.openAlert({ content: '增加数量不允许为0或负数' })
		}
		this.setState({ offset: isNaN(numValue) ? value : numValue })
	}

	handleCounterBtn = (type: 'add' | 'sub' | 'saga') => () => {
		const { offset } = this.state
		if (offset && typeof offset === 'number') {
			if (offset <= 0) {
				this.props.ActionAlert.openAlert({ content: '增加数量不允许为0或负数' })
			}
			if (type === 'add') {
				return this.props.actions.addCounter(offset)
			} else if (type === 'sub') {
				return this.props.actions.subConter(offset)
			} else if (type === 'saga') {
				return this.props.actions.addCounterWithSaga(offset)
			}
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
				<Button onClick={this.handleCounterBtn('add')}>调用redux 增加</Button>
				<Button onClick={this.handleCounterBtn('saga')}>调用redux-saga</Button>
				<Button onClick={this.handleCounterBtn('sub')}>减小</Button>
			</>
		)
	}
}

export default connect(
	(state: IGlobalState) => ({
		pathname: state.router.location.pathname,
		reduxTest: state.reduxTest,
	}),
	dispatch => ({
		actions: bindActionCreators(actions, dispatch),
		ActionAlert: bindActionCreators(ActionAlert, dispatch),
	}),
)(ReduxTest)
