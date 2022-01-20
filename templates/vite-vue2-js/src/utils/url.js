/**
 * 获取url参数(链接带#号)
 * @param name
 * @returns {string | string}
 */
export function getUrlParamValue(name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  if (window.location.hash.indexOf('?') < 0) {
    return null
  }
  const r = window.location.hash.split('?')[1].match(reg)
  if (r != null) return decodeURIComponent(r[2])
  return null
}
