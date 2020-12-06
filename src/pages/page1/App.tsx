/** @format */

import * as React from 'react'
import { Provider } from 'react-redux'
// 引入第三方 IconFonts的样式表
import '../../assest/iconfont/iconfont.css'
// 引入顶层错误边界
import ErrorBoundry from '../../common/components/ErrorBoundary'
import Helle from '../../view/hello'
import ReduxTest from '../../view/reduxTest'
import configureStore from './redux/redux'

export default class App extends React.Component {
	store = configureStore()
	render() {
		return (
			<ErrorBoundry>
				<Provider store={this.store}>
					<Helle name={'coder'} />
					<ReduxTest />
				</Provider>
			</ErrorBoundry>
		)
	}
}
