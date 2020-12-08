import { Spin } from 'antd'
import React from 'react'

const Loadding: React.FC = () => {
	return (
		<div style={{ textAlign: 'center', margin: '20px 0' }}>
			<Spin style={{ margin: '0 auto' }} />
		</div>
	)
}

export default Loadding
