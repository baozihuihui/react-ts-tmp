import { IRouteRoot } from '@common/interface/components/route'
import React, { useMemo } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import lazyLoadComponentByFileDir from './lazyLoad'

export default function ReactRoute(props: IRouteRoot) {
	const { routeInfos } = props
	// useMemo
	const lazyComponents = useMemo(
		() =>
			routeInfos.map(routeInfo => ({
				routeInfo,
				component: lazyLoadComponentByFileDir(routeInfo),
			})),
		[routeInfos],
	)

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
			</Switch>
		</Router>
	)
}
