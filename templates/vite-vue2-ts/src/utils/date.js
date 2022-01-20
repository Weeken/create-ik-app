/**
 * 日期格式化
 * @param {Date} date -日期
 * @param {String} [fmt=YYYY-mm-dd HH:MM] -格式
 * @return {*}
 */
export function dateFormat(date, fmt) {
  if (!date) {
    date = new Date()
  }
  if (!fmt) {
    fmt = 'YYYY-mm-dd HH:MM'
  }
  let ret
  const opt = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (const k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
    }
  }
  return fmt
}
