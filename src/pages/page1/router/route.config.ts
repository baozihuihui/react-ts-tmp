import { IRouteInfo } from '@common/interface/components/route'

export const defaultPath = '/hello'

const RoutesInfos: IRouteInfo[] = [
	{
		name: 'Hello',
		cnName: 'Hello',
		path: '/hello',
		fileDir: 'Hello',
		isExact: true,
	},
	{
		name: 'ReduxTest',
		cnName: 'Redux组件测试',
		path: '/reduxTest',
		fileDir: 'ReduxTest',
	},
]

export default RoutesInfos
