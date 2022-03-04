import { Button } from 'antd'
import React, { ErrorInfo } from 'react'
import styles from './index.less'

export interface IExceptionProps {
	errorCode: string
	context: string
	useBack?: false // 默认 true
	useSendErrorIfo?: true // 默认 false
	useCallAuthor?: true // 默认 false
	error?: Error
	errorInfo?: ErrorInfo
	children?: React.ReactNode
}

const Exception: React.FC<IExceptionProps> = (props: IExceptionProps) => {
	const { errorCode, context } = props
	const { useBack = true, useSendErrorIfo = false, useCallAuthor = false } = props
	const goBack = () => {
		window.history.go(-1)
	}

	const sendErrorInfo = () => {
		// TODO: 上报错误信息
		// eslint-disable-next-line no-console
		console.log('sendErrorInfo -_-!!!!')
	}

	const callAuthor = () => {
		// TODO: 联系我们
		// eslint-disable-next-line no-console
		console.log('callAuthor -_-!!!!')
	}

	return (
		<>
			<section className={styles.page}>
				<h1 className={styles.title}>{errorCode}</h1>
				<div className={styles.content}>{context}</div>
				{props.children ? props.children : null}
				<div className={styles.handleBtn}>
					{useBack && (
						<Button type={'primary'} onClick={goBack}>
							返回上级
						</Button>
					)}
					{useSendErrorIfo && (
						<Button type={'default'} onClick={sendErrorInfo}>
							上报错误信息
						</Button>
					)}
					{useCallAuthor && (
						<Button type={'default'} onClick={callAuthor}>
							联系我们
						</Button>
					)}
				</div>
			</section>
		</>
	)
}

export default Exception
