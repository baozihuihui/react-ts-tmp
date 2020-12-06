import { actionCreatorFactory } from 'typescript-fsa'

// actions 类型
const actionTypes = {
	addCounter: 'ADDCOUNTER',
	subConter: 'SUBCONTER',
	getContext: 'GETCONTEXT',
}
// 初始化 actions 构造器
const actionCreator = actionCreatorFactory('ReduxTest')

export const actions = {
	addCounter: actionCreator<number>(actionTypes.addCounter),
	subConter: actionCreator<number>(actionTypes.subConter),
}

export const asyncActions = {
	getContext: actionCreator.async<string, string, string>(actionTypes.getContext),
}
