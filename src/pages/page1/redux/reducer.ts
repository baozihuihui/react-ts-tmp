/**
 * 集成所有需要共享数据的模块对应的reducer/store
 * 注意：不是所有的 redux 都要放在这里进行整合，这里只整合需要在多个组件间进行共享的数据
 * 例如：theme / userInfo
 * 如果需要状态管理的只是在一个模块或一组模块间的，那么最好放到模块的父级进行管理。不要放到这里。
 * */
import { combineReducers, createStore } from 'redux'
import {
	reducer as ReduxTestReducer,
	IState as IReduxTestState,
} from '../../../view/reduxTest/reducer'

export interface IGlobalState {
	reduxTest: IReduxTestState
}

export const globalReducer = combineReducers<IGlobalState>({
	reduxTest: ReduxTestReducer,
})

export const globalStore = createStore(globalReducer)
