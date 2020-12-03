/** @format */

import * as React from 'react'
import {Button, Input} from 'antd'
import * as _ from 'lodash'
import * as styles from './index.less'

interface IProps {
    name: string
}

interface IState {
    count: number
}

export default class Hello extends React.Component<IProps, IState> {
    state: IState = {
        count: 0,
    }

    handleAddBtnClick = () => {
        this.setState(state => ({count: state.count + 1}))
    }

    handleSubBtnClick = () => {
        this.setState(state => ({count: state.count - 1}))
    }

    render() {
        // console.log(styles.cssExports.test)
        return (
            <>
                <div className={styles.test}>{`hello,${this.props.name}`}</div>
                <div>{`hello,${this.props.name}`}</div>
                <div>counter:{this.state.count}</div>
                <div>less test! display:none</div>
                <Button onClick={this.handleAddBtnClick} type="primary">
                    +1
                </Button>
                <Button type="dashed" onClick={this.handleSubBtnClick}>
                    -1
                </Button>
                <Input.TextArea value="this is a test !"></Input.TextArea>
            </>
        )
    }
}
