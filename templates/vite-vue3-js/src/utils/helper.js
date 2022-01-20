// 函数防抖(debounce)
export function debounce(callback, delay) {
  let timeout
  return (...args) => {
    let result
    timeout && clearTimeout(timeout)
    timeout = setTimeout(() => {
      result = callback(...args)
    }, delay)
    return result
  }
}
// usage
// const func = (n: number) => {
//   return n + 3;
// }
// const dfunc = debounce<typeof func>(func, 1000)
// dfunc()

export function throttle(func, waitFor) {
  const now = () => new Date().getTime()
  const resetStartTime = () => (startTime = now())
  let timeout
  let startTime = now() - waitFor
  return (...args) =>
    new Promise((resolve) => {
      const timeLeft = startTime + waitFor - now()
      timeout && clearTimeout(timeout)
      if (startTime + waitFor <= now()) {
        resetStartTime()
        resolve(func(...args))
      } else {
        timeout = setTimeout(() => {
          resetStartTime()
          resolve(func(...args))
        }, timeLeft)
      }
    })
}
// usage
// const func = (hello: string) => { console.log(new Date().getTime(), '>>>', hello) }
// const thrFunc = throttle(func, 1000)
// thrFunc('hello 1')

// 生成随机字符串
export function randomString(len) {
  const len_ = len || 32
  const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  const a = t.length
  let n = ''
  for (let i = 0; i < len_; i++) n += t.charAt(Math.floor(Math.random() * a))
  return n
}

// 生成随机id
export function createUid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0
    const v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
