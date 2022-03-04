import { actionCreatorFactory } from 'typescript-fsa'
// actions 类型
const actionTypes = {
	open: 'OPEN',
	close: 'CLOSE',
}

// 初始化 actions 构造器
const actionCreator = actionCreatorFactory('ReLoginBox')

export const actions = {
	openBox: actionCreator<boolean | void>(actionTypes.open),
	closeBox: actionCreator(actionTypes.close),
}
