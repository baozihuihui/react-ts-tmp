import * as React from 'react'
import { Button } from 'antd'

interface IProps{
    name:string
}

interface IState{
    count:number
}

export default class Hello extends React.Component<IProps,IState>{

    state:IState={
        count:0
    }

    handleBtnClick = ()=>{
        this.setState(state=>({count:++this.state.count}))
    }

    render(){
        return <>
        <div>{`hello,${this.props.name}`}</div>
        <div>counter:{this.state.count}</div>
        <Button onClick={this.handleBtnClick} type="primary" >+</Button>
        </>
    }
}