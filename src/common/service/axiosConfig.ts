import { BaseURL } from '@common/constant/api'
import { IResponse } from '@common/interface/axios'
import { message } from 'antd'
import axios, { ResponseType } from 'axios'
import { AxiosRequestConfig } from 'axios'

message.config({
	maxCount: 3,
})

const axiosBase = axios.create()

// Add a response interceptor
axiosBase.interceptors.response.use(
	response => {
		return new Promise((resolve, reject) => {
			// 通过接口进行文件下载
			const isResponseBlob = (response.config as any).isResponseBlob
			if (isResponseBlob) {
				resolve(response)
				return
			}
			const result = response.request.response
			if (result.result) {
				resolve(response)
			} else {
				message.error(result.msg, 2)
				reject(response)
			}
		})
	},
	error => {
		if (error.message === 'timeout of 30000ms exceeded') {
			message.error('数据请求超时，请刷新页面后重试！', 2)
		} else {
			message.error(error.message, 2)
		}
		// eslint-disable-next-line no-console
		console.log('接口返回错误：', error)
		return Promise.reject(error)
	},
)

interface IOtherConfigs {
	isFormSubmit?: boolean // 是否使用表单提交
	isResponseBlob?: boolean // 是否返回文件流
	customTimeout?: number // 超时时长
}

// 不同的api调用不同的配置项
export const getAxiosConfig = (url: BaseURL, otherConfigs?: IOtherConfigs): AxiosRequestConfig => {
	let isFormSubmit
	let isResponseBlob
	let customTimeout
	if (otherConfigs) {
		isFormSubmit = otherConfigs.isFormSubmit
		isResponseBlob = otherConfigs.isResponseBlob
		customTimeout = otherConfigs.customTimeout
	}
	return Object.assign(
		{},
		{
			url: '',
			baseURL: url,
			isResponseBlob,
			headers: isFormSubmit
				? { 'content-type': 'multipart/form-data' }
				: { 'X-Requested-With': 'XMLHttpRequest' },
			timeout: customTimeout || (isFormSubmit ? 0 : 30000),
			transformResponse: [transformResponse],
			responseType: (isResponseBlob ? 'blob' : 'json') as ResponseType,
		},
	)
}
function transformResponse(response: IResponse<any>) {
	if (response && response.result === true) {
		return response.data
	} else if (response && response.msg) {
		throw new Error(response.msg)
	}
}

export default axiosBase
