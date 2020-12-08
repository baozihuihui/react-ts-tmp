export interface IRouteInfo {
	name: string // 组件名称
	cnName: string // 中文名称(面包屑显示)
	path: string // url
	filePath: string // 文件地址
	iconClassName?: string // string => iconFont ClassName
	isMemory?: true // 对应组件是否需要缓存
	isExact?: true // 是否为默认位置
}
