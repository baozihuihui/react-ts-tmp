import Exception from '@common/layout/exception'
import React from 'react'

const Forbidden: React.FC = () => {
	return (
		<>
			<Exception errorCode={'404'} context={'未找到页面，请返回上一页！'} />
		</>
	)
}

export default Forbidden
