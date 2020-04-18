import React from 'react'
import ReactDom from 'react-dom'
 
import Hello from '../../view/Hello'
 
ReactDom.render(
    <Hello name='coder'/>,
    document.getElementById("root")
)