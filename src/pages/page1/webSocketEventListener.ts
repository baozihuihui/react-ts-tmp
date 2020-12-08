/**
 * 创建 webSocket 与 saga 进行绑定，进行事件通知
 */

import { eventChannel, SagaIterator } from 'redux-saga'
import { call, fork, put, take } from 'redux-saga/effects'

import { WSFactoryCreate, WSFactoryDelete } from '@common/service/webSocketFactory'

// type WSResponse = number

function* webSocketChannel(ws: WebSocket): SagaIterator {
	return eventChannel(emitter => {
		let timer: NodeJS.Timer
		// webSocket 创建时进行心跳检测，每隔1分钟向服务端进行一次通信
		ws.onopen = () => {
			timer = setInterval(() => {
				if (ws.readyState === ws.CLOSED || ws.readyState === ws.CLOSING) {
					emitter(`webSocket callBack error on send message`)
				} else {
					ws.send(`The client sends heartbeat detection information:${new Date()}`)
				}
			}, 1000 * 60)
		}
		// 在服务端返回消息时进行订阅
		ws.onmessage = evt => {
			try {
				// 服务端 对心跳检测的响应不进行操作
				if (evt.data.includes('The client sends heartbeat detection information:')) {
					return
				}
				// 以下是一个例子：通过emitter 将事件返回给channel进行take
				// const res: IWSResponse<WSResponse> = JSON.parse(evt.data)
				// if (res.type === 'message') {
				// 	// 未读消息
				// 	emitter(messageActions.updateMessageNotReadNum(res.data as number))
				// }
			} catch (error) {
				throw new Error('webSocket response data error:' + error)
			}
		}
		// 关闭时进行提醒
		ws.onclose = evt => {
			emitter(`webSocket callBack error on link closed`)
		}
		// 关闭时进行提醒
		ws.onerror = evt => {
			emitter(`webSocket callBack error on link error`)
		}
		return () => {
			ws.close()
			if (timer) {
				clearInterval(timer)
			}
		}
	})
}

/**
 *
 * @param errorInfo 错误信息
 * @param userId webSocket 连接凭证
 * @param retryCount 重连次数
 */
function* handleWebSocketError(
	errorInfo: string,
	userId: string,
	retryCount: number,
): SagaIterator {
	WSFactoryDelete(userId)
	// 若是连接失败或者发送信息失败，则将重连次数加一
	if (errorInfo.includes('on send message') || errorInfo.includes('on link error')) {
		// 若失败次数超过三次则不继续进行重连
		if (retryCount > 3) {
			return
		}
		// eslint-disable-next-line no-console
		console.log(`${errorInfo},Number of connection retries:${retryCount + 1}`)
		yield fork(webSocketConnect, retryCount + 1)
	} else {
		// 若是断开连接 则可无限次重连
		yield fork(webSocketConnect)
	}
}
// 创建 webSocket 并利用 saga的channel 进行监听
function* webSocketConnect(retryCount = 0): SagaIterator {
	const userId = '123'
	const ws = WSFactoryCreate(userId)
	const channel = yield call(webSocketChannel, ws)
	try {
		while (true) {
			const action = yield take(channel)
			// 当webSocket 出现异常关闭时，会抛出异常，catch中触发重启
			if (typeof action === 'string' && action.includes('webSocket callBack error on ')) {
				throw new Error(action)
			}
			yield put(action)
		}
	} catch (e) {
		channel.close()
		yield call(handleWebSocketError, e.message, userId, retryCount)
	}
}

// execute when page start
// webSocket 需要注册到 ./redux/rootSaga 才能生效
export function* rootSaga(): SagaIterator {
	yield fork(webSocketConnect)
}
