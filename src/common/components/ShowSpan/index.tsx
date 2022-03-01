import React from 'react'

const DEFAULT_STRING_EMPTY_VALUE = '无'
const DEFAULT_NUMBER_EMPTY_VALUE = '-'

interface IShowSpanProps {
	value: string | number | null | undefined
	emptyValue?: '' | '-' | '无' | '空'
	description?: string // 单位 或 描述值
	className?: string
	style?: React.CSSProperties
}

const ShowSpan = (props: IShowSpanProps) => {
	const { value, emptyValue, className, style, description } = props
	const valueType = typeof value
	let result: string | number
	let emptyValueWithType: string
	if (valueType === 'string') {
		emptyValueWithType = emptyValue || DEFAULT_STRING_EMPTY_VALUE
	} else if (valueType === 'number') {
		emptyValueWithType = emptyValue || DEFAULT_NUMBER_EMPTY_VALUE
		result = value || value === 0 ? value : emptyValueWithType
	} else {
		result = ''
		// eslint-disable-next-line no-console
		console.warn('当前只支持 string、number 两种类型的展示')
		return null
	}
	result = value || emptyValueWithType

	return (
		<span className={className} style={style}>
			{result}
			{description}
		</span>
	)
}

export default React.memo(ShowSpan)
