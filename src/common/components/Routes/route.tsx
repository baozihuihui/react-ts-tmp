import loadable from '@loadable/component'
import { IRouteInfo } from '@common/interface/components/route'

// function getComponentByPath(routeInfo: IRouteInfo) {
// 	return loadable(
// 		() =>
// 			import(
// 				`${routeInfo.filePath}`
// 			),
// 	)
// }
// function getComponentByPath(routeInfo: IRouteInfo) {
// 	return loadable(() => require(routeInfo.filePath))
// }

function getComponentByPath(routeInfo: IRouteInfo) {
	return loadable(() => import(`@view/hello`))
}

// function getComponentByPath(routeInfo: IRouteInfo) {
// 	return loadable(() => require('@view/hello'))
// }

export default getComponentByPath
