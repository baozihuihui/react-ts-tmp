import React from 'react'
import loadable from '@loadable/component'
import { IRouteInfo } from '@common/interface/components/route'
import Loadding from './Loadding'
import pMinDelay from 'p-min-delay'

function getComponentByFileDir(routeInfo: IRouteInfo) {
	return loadable(
		// 动态加载
		() =>
			// 减少刷新造成的加载
			pMinDelay(
				import(
					/* webpackInclude: /\.tsx$/ */
					/* webpackExclude: /\.d\.ts$/ */
					`@view/${routeInfo.fileDir}/`
				),
				200,
			),
		// 加载前进行 loadding
		{
			fallback: <Loadding />,
		},
	)
}

export default getComponentByFileDir
