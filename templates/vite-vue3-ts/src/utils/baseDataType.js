export const objectToString = Object.prototype.toString
export const toTypeString = val => objectToString.call(val)

// 判断类型
export const isArray = Array.isArray

export const isMap = val => toTypeString(val) === '[object Map]'

export const isSet = val => toTypeString(val) === '[object Set]'

export const isDate = val => val instanceof Date

export const isFunction = val => typeof val === 'function'

export const isString = val => typeof val === 'string'

export const isNumber = val => typeof val === 'number'

export const isSymbol = val => typeof val === 'symbol'

// 判断是否是对象
// isObject(new Date()) ==> true
export const isObject = val => val !== null && typeof val === 'object'

// 判断是否是纯对象，即 {}
// isPlainObject(new Date()) ==> false
export const isPlainObject = val => toTypeString(val) === '[object Object]'

export const isPromise = val => isObject(val) && isFunction(val.then) && isFunction(val.catch)

