import { delay, put, takeEvery } from 'redux-saga/effects'
import { Action } from 'typescript-fsa'
// import { takeAsyncAction } from 'src/common/functions/takeAsyncAction'
// import { actions, asyncActions } from './action'
import { actions } from './action'
import { actions as ActionAlert } from '@common/components/ActionAlert/actions'
import { AlertShowType, AlertType } from '@common/components/ActionAlert/constatnt'

function* addCounterWithSaga(action: Action<number>) {
	yield delay(1000)
	yield put(actions.addCounter(action.payload))
	yield put(ActionAlert.openAlert({type:AlertType.SUCCESS,showType:AlertShowType.TIP,content:'增加成功'}))
}

export function* saga() {
	yield takeEvery(actions.addCounterWithSaga, addCounterWithSaga)
	// yield takeAsyncAction(actions.getContext,asyncActions.getContextAsync)
}
