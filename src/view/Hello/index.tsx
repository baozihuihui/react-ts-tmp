import * as React from 'react'

interface IProps{
    name:string
}

export default class Hello extends React.Component<IProps>{
    render(){
        return `hello,${this.props.name}`
    }
}