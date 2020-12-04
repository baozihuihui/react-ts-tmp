/** @format */
import * as React from 'react'

interface IIconFontProps {
    type: string
    className?: string
    style?: React.CSSProperties
}

export default function IconFont(props: IIconFontProps) {
    const {type, className, style} = props
    return <i className={`iconfont icon-${type} ${className}`} style={style}></i>
}
