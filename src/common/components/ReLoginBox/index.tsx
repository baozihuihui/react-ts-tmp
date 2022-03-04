import { IGlobalStateReLogin } from '@common/interface/redux'
import { IState as IReLoginState } from './reducer'
import { actions } from './actions'
import styles from './index.less'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Input, Modal, Spin, Tabs } from 'antd'
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'

interface IReLoginActions {
	actions: typeof actions
}

type IReLoginBoxProps = { ReLoginBoxState: IReLoginState } & IReLoginActions

interface IUserInfo {
	userName: string
	password?: string
	imgCode?: string
	msgCode?: string
}

enum LoginType {
	PASSWORD = 'password',
	MESSAGE_CODE = 'message_code',
}

const { TabPane } = Tabs

const ReLoginBox: React.FC<IReLoginBoxProps> = (props: IReLoginBoxProps) => {
	const { active, isRefresh } = props.ReLoginBoxState
	const INIT_UserInfo: IUserInfo = { userName: '', password: '', imgCode: '', msgCode: '' }
	const [userInfo, setUserInfo] = useState<IUserInfo>(INIT_UserInfo)
	const [loginType, setLoginType] = useState<LoginType>(LoginType.PASSWORD)
	const [loadding, setLoading] = useState<boolean>(false)

	useEffect(() => {
		if (!active) {
			setUserInfo(INIT_UserInfo)
			setLoginType(LoginType.PASSWORD)
			setLoading(false)
		}
	}, [active])

	const handleChangeUserInfo = (key: keyof IUserInfo, value: string) => {
		setUserInfo({ ...userInfo, [key]: value })
	}

	const handleChangeLoginType = (newType: string) => {
		setLoginType(newType as LoginType)
	}

	const getUserInfo = (): IUserInfo => {
		return userInfo
	}

	const afterLogin = (result: boolean) => {
		if (result) {
			props.actions.closeBox()
			if (isRefresh) {
				window.location.reload()
			}
		}
	}

	const handleLogin = () => {
		const params = userInfo
		if (loginType !== LoginType.PASSWORD) {
			Reflect.deleteProperty(params, 'password')
		}
		console.log(userInfo)
		// TODO: Form.Validator
		setLoading(true)
		// TODO: Join in
		setTimeout(() => {
			afterLogin(true)
		}, 2000)
	}

	const goRegister = ()=>{
		window.location.href = '/register'
	}

	return (
		<Modal title={null} footer={null} closable={false} visible={active}>
			<Tabs centered size='small' accessKey={loginType} onChange={handleChangeLoginType}>
				<TabPane tab='账号登录' key={LoginType.PASSWORD}>
					<UserName value={userInfo.userName} changeValue={handleChangeUserInfo} />
					<PassWord value={userInfo.password} changeValue={handleChangeUserInfo} />
				</TabPane>
				<TabPane tab='短信登录' key={LoginType.MESSAGE_CODE}>
					<UserName value={userInfo.userName} changeValue={handleChangeUserInfo} />
					<ImgCode value={userInfo.imgCode} changeValue={handleChangeUserInfo} />
					<MsgCode
						value={userInfo.msgCode}
						getUserInfo={getUserInfo}
						changeValue={handleChangeUserInfo}
					/>
				</TabPane>
			</Tabs>
			<Button type='primary' block loading={loadding} onClick={handleLogin}>
				登录
			</Button>
			<Button type="link" onClick={goRegister}>还没有账号，现在去注册</Button>
		</Modal>
	)
}

export default connect(
	(state: IGlobalStateReLogin) => ({
		ReLoginBoxState: state.reloginbox,
	}),
	dispatch => ({
		actions: bindActionCreators(actions, dispatch),
	}),
)(ReLoginBox)

interface ElementProps {
	value?: string
	changeValue: (key: keyof IUserInfo, value: string) => void
}

const UserName: React.FC<ElementProps> = props => {
	const { value, changeValue } = props
	return (
		<Input
			placeholder='请输入手机号或邮箱'
			value={value}
			onChange={e => {
				changeValue('userName', e.target.value)
			}}
			prefix={<UserOutlined />}
		/>
	)
}
const PassWord: React.FC<ElementProps> = props => {
	const { value, changeValue } = props
	return (
		<Input.Password
			placeholder='请输入密码'
			value={value}
			onChange={e => {
				changeValue('password', e.target.value)
			}}
			iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
		/>
	)
}
const ImgCode: React.FC<ElementProps> = props => {
	const { value, changeValue } = props
	const [state, setState] = useState({ url: '', loading: false })
	const getImg = () => {
		setState({ ...state, loading: true })
		setTimeout(() => {
			setState({ url: '', loading: false })
		}, 2000)
	}
	useEffect(() => {
		getImg()
	}, [])
	return (
		<div>
			<Input
				placeholder='请输入图片验证码'
				value={value}
				onChange={e => {
					changeValue('imgCode', e.target.value)
				}}
				addonAfter={
					<Spin spinning={state.loading} delay={200} size='small'>
						<div onClick={getImg} className={styles.imgDiv}>
							{!state.loading && state.url === '' ? '点击重试' : null}
							{state.url !== '' ? (
								<img src={state.url} alt='点击重试' />
							) : null}
						</div>
					</Spin>
				} />
		</div>
	)
}

type MsgCodeProps = ElementProps & { getUserInfo: () => IUserInfo }

const MsgCode: React.FC<MsgCodeProps> = props => {
	const { value, getUserInfo, changeValue } = props
	const [state, setState] = useState({ loading: false, active: false, num: 0 })
	let timer: NodeJS.Timer | null = null
	useEffect(() => {
		if (state.active && !timer) {
			timer = setInterval(() => {
				if (state.num === 0) {
					setState({ ...state, active: false })
					if (timer) {
						clearInterval(timer)
					}
				} else {
					setState({ ...state, num: --state.num })
				}
			}, 1000)

			return () => {
				if (timer) {
					clearInterval(timer)
				}
			}
		}
	}, [state])

	const postMsg = () => {
		const userInfo = getUserInfo()
		if (!userInfo.userName) {
			console.error('手机号或邮箱不得为空')
		}
		if (!userInfo.imgCode) {
			console.error('图片验证码不得为空')
		}
		setState({ ...state, loading: true })
		setTimeout(() => {
			setState({ ...state, active: true, num: 60 })
		}, 2000)
	}
	return (
		<Input
			placeholder='请输入短信验证码'
			value={value}
			onChange={e => {
				changeValue('msgCode', e.target.value)
			}}
			addonAfter={
				<div className={styles.msgBtn}>
					<Button
						block
						type='text'
						onClick={postMsg}
						loading={state.loading}
						disabled={state.active || state.loading}>
						{state.active ? `${state.num}S 后重新获取` : '获取验证码'}
					</Button>
				</div>
			}
		/>
	)
}
