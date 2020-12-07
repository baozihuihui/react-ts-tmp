import { actionCreatorFactory } from 'typescript-fsa'

// actions 类型
const actionTypes = {
	addCounter: 'ADDCOUNTER',
	subConter: 'SUBCONTER',
	addCounterWithSaga: 'ADDCOUNTERWITHSAGA',
	getContext: 'GETCONTEXT',
	getContextAsync: 'GETCONTEXT_ASCNC',
}
// 初始化 actions 构造器
const actionCreator = actionCreatorFactory('ReduxTest')

export const actions = {
	addCounter: actionCreator<number>(actionTypes.addCounter),
	subConter: actionCreator<number>(actionTypes.subConter),
	addCounterWithSaga: actionCreator<number>(actionTypes.addCounterWithSaga),
	getContext: actionCreator(actionTypes.getContext),
}

export const asyncActions = {
	getContextAsync: actionCreator.async<null, string, string>(actionTypes.getContextAsync),
}
