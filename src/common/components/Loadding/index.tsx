import { Spin } from 'antd'
import React from 'react'

interface IProps {
	children?: React.Component
}

const Loadding: React.FC<IProps> = (props: IProps) => {
	return (
		<div style={{ textAlign: 'center', margin: '20px 0' }}>
			<Spin style={{ margin: '0 auto' }}>{props.children}</Spin>
		</div>
	)
}

export default Loadding
