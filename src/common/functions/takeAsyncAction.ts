/**
 * action bind asyncAction and send result or errorInfo which's form axiox to asyncAction branch
 */
import { SagaIterator } from 'redux-saga'
import { takeEvery, call, fork, put, cancelled } from 'redux-saga/effects'
import { AxiosPromise, AxiosResponse } from 'axios'
import { Action, ActionCreator, AsyncActionCreators } from 'typescript-fsa'
import { bindAsyncAction } from 'typescript-fsa-redux-saga'

export function takeAsyncAction<S, E>(
	action: ActionCreator<any>,
	asyncAction: AsyncActionCreators<any, S, E>,
	asyncCall: () => AxiosPromise<S>,
): any

export function takeAsyncAction<P, S, E>(
	action: ActionCreator<P>,
	asyncAction: AsyncActionCreators<P, S, E>,
	asyncCall: (p: P) => AxiosPromise<P>,
): any

export function takeAsyncAction<P, S, E>(
	action: ActionCreator<P>,
	asyncAction: AsyncActionCreators<P, S, E>,
	asyncCall: (p: P) => AxiosPromise<P>,
) {
	// 将 axios 请求 执行步骤 转换成一个geneator,并在每一个步骤进行调用saga的副作用，通知redux
	const worker = bindAsyncAction(asyncAction)(function* (params): SagaIterator {
		yield put(asyncAction.started(params))
		try {
			const res: AxiosResponse = yield call(asyncCall, params)
			yield put(asyncAction.done({ params, result: res.data }))
		} catch (e) {
			yield put(asyncAction.failed({ params, error: e }))
		} finally {
			if (yield cancelled()) {
				yield put(asyncAction.failed({ params, error: 'cancel' as any }))
			}
		}
	})

	// 准备可调用的saga
	function* saga(sagaAction: Action<P>): SagaIterator {
		yield fork(worker, sagaAction.payload)
	}

	// 监听action,在action被调用时执行这里
	return takeEvery(action, saga)
}
