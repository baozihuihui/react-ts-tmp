import { IRouteInfo } from '@common/interface/components/route'
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NotFound from './ExceptionRoute/NotFound'
import lazyLoadComponentByFileDir from './lazyLoad'
interface IRouteRoot {
	defaultPath: string
	routeInfos: IRouteInfo[]
}

export default function ReactRoute(props: IRouteRoot) {
	const lazyComponents = props.routeInfos.map(routeInfo => ({
		routeInfo,
		component: lazyLoadComponentByFileDir(routeInfo),
	}))

	return (
		<Router>
			<Switch>
				{lazyComponents.map(({ routeInfo, component }) => (
					<Route
						key={routeInfo.name}
						path={routeInfo.path}
						component={component}
						exact={routeInfo.notExact ? false : true}
					/>
				))}
				<NotFound />
			</Switch>
		</Router>
	)
}
