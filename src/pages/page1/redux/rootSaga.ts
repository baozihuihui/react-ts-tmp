/**
 * 注册所有需要 初始化的 saga
 * */

import { all, fork } from 'redux-saga/effects'
import { saga as ReduxTestSaga } from '@view/ReduxTest/saga'

const globalSaga = function* () {
	yield all([fork(ReduxTestSaga)])
}

export default globalSaga
