import { IRouteInfo } from '@common/interface/components/route'

const RoutesInfos: IRouteInfo[] = [
	{
		name: 'Hello',
		cnName: 'Hello',
		path: '/hello',
		filePath: '@view/hello',
		isExact: true,
	},
	{
		name: 'ReduxTest',
		cnName: 'Redux组件测试',
		path: '/reduxTest',
		filePath: '@view/reduxTest',
	},
]

export default RoutesInfos
