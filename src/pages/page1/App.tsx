/** @format */

import * as React from 'react'
import { Provider } from 'react-redux'
// 引入第三方 IconFonts的样式表
import '../../assest/iconfont/iconfont.css'
// 引入顶层错误边界
import ErrorBoundry from '../../common/components/ErrorBoundary'
import { globalStore } from './redux/reducer'
import Helle from '../../view/hello'

export default class App extends React.Component {
	render() {
		return (
			<ErrorBoundry>
				<Provider store={globalStore}>
					<Helle name={'coder'} />
				</Provider>
			</ErrorBoundry>
		)
	}
}
