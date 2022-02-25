/** @format */

import React, { Component } from 'react'
import { Button, Input } from 'antd'
import _ from 'lodash'
import styles from './index.less'
import IconFont from '@common/components/IconFonts'

interface IProps {
	name: string
}

interface IState {
	count: number
	iconFontShowFlag: boolean
}

export default class Hello extends Component<IProps, IState> {
	state = {
		count: 0,
		iconFontShowFlag: true,
	}

	handleAddBtnClick = () => {
		this.setState(state => ({ count: state.count + 1 }))
	}

	handleSubBtnClick = () => {
		this.setState(state => ({ count: state.count - 1 }))
	}

	handleIconFontShow = () => {
		this.setState(state => ({
			iconFontShowFlag: !state.iconFontShowFlag,
		}))
	}

	render() {
		return (
			<>
				<div>{`hello,${this.props.name}`}</div>
				<div>counter:{this.state.count}</div>
				<span className={styles.test}>less test! display:block,hover:red </span>
				<p>
					{this.state.iconFontShowFlag && <span>测试Iconfonts的引入</span>}
					<Button
						type='primary'
						shape='circle'
						onClick={this.handleIconFontShow}
						icon={
							<IconFont type={this.state.iconFontShowFlag ? 'kejian' : 'bukejian'} />
						}
					/>
				</p>

				<Button onClick={this.handleAddBtnClick} type='primary'>
					+1
				</Button>
				<Button type='dashed' onClick={this.handleSubBtnClick}>
					-1
				</Button>
				<Input.TextArea value='this is a test !'></Input.TextArea>
			</>
		)
	}
}
