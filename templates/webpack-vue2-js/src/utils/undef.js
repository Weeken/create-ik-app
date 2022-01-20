import { isString } from './baseDataType'
// 判空
export const isUndef = val => val === undefined || val === null
// 空字符串
export const isEmptyString = val => isString(val) && val === ''
// 非空
export const isNotEmpty = val => !isUndef(val) && !isEmptyString(val)
