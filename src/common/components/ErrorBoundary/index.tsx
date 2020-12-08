/** @format */

import Exception from '@common/layout/exception'
import { Collapse } from 'antd'
import React, { Component, ErrorInfo } from 'react'

interface IState {
	errorFlag: boolean
	error?: Error
	errorInfo?: ErrorInfo
}

export default class ErrorBoundary extends Component<{}, IState> {
	constructor(props: any) {
		super(props)
		this.state = {
			errorFlag: false,
			error: undefined,
			errorInfo: undefined,
		}
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// 可以将错误上报写在这里
		this.setState({ errorFlag: true, error, errorInfo })
	}

	render() {
		if (this.state.errorFlag) {
			return (
				<Exception
					errorCode={'500'}
					context={'页面加载异常，请使用最新版本谷歌浏览器后重试！'}>
					<Collapse style={{ width: 800 }} accordion={true}>
						<Collapse.Panel header='错误信息' key='1'>
							<div
								style={{
									maxHeight: 300,
									overflowY: 'auto',
									whiteSpace: 'pre-wrap',
									wordBreak: 'break-all',
								}}>
								{this.state.error ? this.state.error.stack : null}
							</div>
						</Collapse.Panel>
						<Collapse.Panel header='堆栈信息' key='2'>
							<div
								style={{
									maxHeight: 300,
									overflowY: 'auto',
									whiteSpace: 'pre-wrap',
									wordBreak: 'break-all',
								}}>
								{this.state.errorInfo
									? this.state.errorInfo.componentStack.toString()
									: null}
							</div>
						</Collapse.Panel>
					</Collapse>
				</Exception>
			)
		} else {
			return this.props.children
		}
	}
}
