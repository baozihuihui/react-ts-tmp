import { IRouteInfo } from '@common/interface/components/route'

export const defaultPath = '/hello'

const RoutesInfos: IRouteInfo[] = [
	{
		name: 'Hello',
		cnName: 'Hello',
		path: '/',
		fileDir: 'Hello',
	},
	{
		name: 'Hello',
		cnName: 'Hello',
		path: '/hello',
		fileDir: 'Hello',
	},
	{
		name: 'Hello',
		cnName: 'Hello',
		path: '/hello/reduxTest',
		fileDir: 'reduxTest',
	},
	{
		name: 'ReduxTest',
		cnName: 'Redux组件测试',
		path: '/reduxTest',
		fileDir: 'reduxTest',
	},
]

export default RoutesInfos
