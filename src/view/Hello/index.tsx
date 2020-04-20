/** @format */

import * as React from 'react'
import {Button} from 'antd'

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
        return (
            <>
                <div>{`hello,${this.props.name}`}</div>
                <div>counter:{this.state.count}</div>
                <Button onClick={this.handleAddBtnClick} type="primary">
                    +1
                </Button>
                <Button type="dashed" onClick={this.handleSubBtnClick}>
                    -1
                </Button>
            </>
        )
    }
}
