/** @format */

import * as React from 'react'
import { Provider } from 'react-redux'
// 引入第三方 IconFonts的样式表
import '@assest/iconfont/iconfont.css'
// 引入顶层错误边界
import ErrorBoundry from '@common/components/ErrorBoundary'
import configureStore from './redux/rootRedux'
import routeInfos from './router/route.config'
import RouteRoot from '@common/components/Routes'
export default class App extends React.Component {
	store = configureStore()
	render() {
		return (
			<ErrorBoundry>
				<Provider store={this.store}>
					<RouteRoot routeInfos={routeInfos} />
				</Provider>
			</ErrorBoundry>
		)
	}
}
// /** @format */

// import * as React from 'react'
// import { Provider } from 'react-redux'
// // 引入第三方 IconFonts的样式表
// import '@assest/iconfont/iconfont.css'
// // 引入顶层错误边界
// import ErrorBoundry from '@common/components/ErrorBoundary'
// import Helle from '@view/hello'
// import ReduxTest from '@view/reduxTest'
// import configureStore from './redux/rootRedux'
// import { BrowserRouter as Router, Route } from 'react-router-dom'

// export default class App extends React.Component {
// 	store = configureStore()
// 	render() {
// 		return (
// 			<ErrorBoundry>
// 				<Provider store={this.store}>
// 					<Router>
// 						<Route path='/:filter?' component={Helle} />
// 						<Route path='/reduxTest' component={ReduxTest} />
// 					</Router>
// 				</Provider>
// 			</ErrorBoundry>
// 		)
// 	}
// }
