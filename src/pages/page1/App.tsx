import * as React from 'react'
import { Provider } from 'react-redux'
// 引入第三方 IconFonts的样式表
import '@assest/iconfont/iconfont.css'
// 引入顶层错误边界
import ErrorBoundry from '@common/components/ErrorBoundary'
import configureStore, { history } from './redux/rootRedux'
import routeInfos, { defaultPath } from './router/route.config'
import Applayout from '@common/layout/Applayout'
import { ConnectedRouter } from 'connected-react-router'
export default class App extends React.Component {
	store = configureStore()
	render() {
		return (
			<ErrorBoundry>
				<Provider store={this.store}>
					<ConnectedRouter history={history}>
						<Applayout routeInfos={routeInfos} defaultPath={defaultPath} />
					</ConnectedRouter>
				</Provider>
			</ErrorBoundry>
		)
	}
}
