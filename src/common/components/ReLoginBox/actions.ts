import { actionCreatorFactory } from 'typescript-fsa'
import { IState as IReloginBoxState } from './reducer'
// actions 类型
const actionTypes = {
    open:"OPEN",
    close:"CLOSE"
}

// 初始化 actions 构造器
const actionCreator = actionCreatorFactory('ReLoginBox')

export const actions = {
    openBox:actionCreator<IReloginBoxState>(actionTypes.open),
    closeBox:actionCreator(actionTypes.close)
}