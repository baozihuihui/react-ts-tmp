import Exception from '@common/layout/exception'
import React from 'react'

const Forbidden: React.FC = () => {
	return (
		<>
			<Exception errorCode={'403'} context={'无权访问，请联系我们！'} useCallAuthor={true} />
		</>
	)
}

export default Forbidden
