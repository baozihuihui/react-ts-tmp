/** @format */

import * as React from 'react'
import { Provider } from 'react-redux'
// 引入第三方 IconFonts的样式表
import '@assest/iconfont/iconfont.css'
// 引入顶层错误边界
import ErrorBoundry from '@common/components/ErrorBoundary'
import configureStore from './redux/rootRedux'
import routeInfos, { defaultPath } from './router/route.config'
import RouteRoot from '@common/components/RouteRoot'
export default class App extends React.Component {
	store = configureStore()
	render() {
		return (
			<ErrorBoundry>
				<Provider store={this.store}>
					<RouteRoot routeInfos={routeInfos} defaultPath={defaultPath} />
				</Provider>
			</ErrorBoundry>
		)
	}
}
