import { delay, put, takeEvery } from 'redux-saga/effects'
import { Action } from 'typescript-fsa'
// import { takeAsyncAction } from 'src/common/functions/takeAsyncAction'
import { actions, asyncActions } from './action'

function* addCounterWithSaga(action: Action<number>) {
	yield delay(1000)
	yield put(actions.addCounter(action.payload))
}

export function* saga() {
	yield takeEvery(actions.addCounterWithSaga, addCounterWithSaga)
	// yield takeAsyncAction(actions.getContext,asyncActions.getContextAsync)
}
