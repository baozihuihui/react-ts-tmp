import { actionCreatorFactory } from 'typescript-fsa'
import { IOpenState } from './reducer'
// actions 类型
const actionTypes = {
	open: 'OPEN',
	close: 'CLOSE',
}

// 初始化 actions 构造器
const actionCreator = actionCreatorFactory('ActionAlert')

export const actions = {
	openAlert: actionCreator<IOpenState>(actionTypes.open),
	closeAlert: actionCreator(actionTypes.close),
}
