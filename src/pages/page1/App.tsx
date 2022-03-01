import * as React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
// add IconFonts styles
import '@assest/iconfont/iconfont.css'
// catch ErroeBundry catch redner error and show Error Components
import ErrorBoundry from '@common/components/ErrorBoundary'
// redux
import configureStore, { history } from './redux/rootRedux'
// routeInfos
import routeInfos, { defaultPath } from './router/route.config'
// layout header-left_NavBar-right_content-footer
import Applayout from '@common/layout/Applayout'
import ReLoginBox from '@common/components/ReLoginBox'

export default class App extends React.Component {
	store = configureStore()
	render() {
		return (
			<ErrorBoundry>
				<Provider store={this.store}>
					<ConnectedRouter history={history}>
						<Applayout routeInfos={routeInfos} defaultPath={defaultPath} />
						<ReLoginBox />
					</ConnectedRouter>
				</Provider>
			</ErrorBoundry>
		)
	}
}
