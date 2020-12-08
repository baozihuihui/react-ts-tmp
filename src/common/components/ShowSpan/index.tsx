import React from 'react'

const defaultStringEmptyValue = '无'
const defaultNumberEmptyValue = '-'

interface IShowSpanProps {
	value: string | number | null | undefined
	emptyValue?: '' | '-' | '无' | '空'
	className: string
}

const ShowSpan = (props: IShowSpanProps) => {
	const { value, className, emptyValue } = props
	const valueType = typeof value
	let result: string | number
	let emptyValueWithType: string
	if (valueType === 'string') {
		emptyValueWithType = emptyValue || defaultStringEmptyValue
	} else if (valueType === 'number') {
		emptyValueWithType = emptyValue || defaultNumberEmptyValue
		result = value || value === 0 ? value : emptyValueWithType
	} else {
		result = ''
		// eslint-disable-next-line no-console
		console.warn('当前只支持 string、number 两种类型的展示')
		return null
	}
	result = value || emptyValueWithType

	return <span className={className}>{result}</span>
}

export default React.memo(ShowSpan)
