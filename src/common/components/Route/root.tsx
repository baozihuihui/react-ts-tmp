import { IRouteInfo } from '@common/interface/components/route'
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import getComponentByFileDir from './route'
interface IRouteRoot {
	defaultPath: string
	routeInfos: IRouteInfo[]
}

export default function RouteRoot(props: IRouteRoot) {
	const lazyComponents = props.routeInfos.map(routeInfo => ({
		routeInfo,
		component: getComponentByFileDir(routeInfo),
	}))

	return (
		<Router>
			<Switch>
				{lazyComponents.map(({ routeInfo, component }) => (
					<Route key={routeInfo.name} path={routeInfo.path} component={component} />
				))}
			</Switch>
		</Router>
	)
}
