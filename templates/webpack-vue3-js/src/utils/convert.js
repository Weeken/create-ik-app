import { objectToString, isPlainObject } from './baseDataType'

// 转字符串
export const toString = val => {
  return val == null // 此处包括 null 跟 undefined, 不能写 ===
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === objectToString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

// 转数字
export const toNumber = val => {
  const n = parseFloat(val)
  // return isNaN(n) ? val : n
  if (isNaN(n)) {
    throw new Error(`fail to convert ${val} to number`)
  } else {
    return n
  }
}
