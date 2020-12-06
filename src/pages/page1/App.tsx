/** @format */

import * as React from 'react'
import '../../assest/iconfont/iconfont.css'
import ErrorBoundry from '../../common/components/ErrorBoundary'
import Helle from '../../view/hello'

export default class App extends React.Component {
	render() {
		return (
			<ErrorBoundry>
				<Helle name={'coder'} />
			</ErrorBoundry>
		)
	}
}
