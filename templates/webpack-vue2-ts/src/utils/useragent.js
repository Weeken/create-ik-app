export const userAgent = navigator.userAgent
export const isIOS = () => !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
export const isAndroid = () =>
  userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1
export const isIphone = () => userAgent.indexOf('iPhone') > -1
export const isIpad = () =>
  userAgent.indexOf('Mac OS X') > -1 && userAgent.indexOf('iPhone') == -1
export const isWeinxin = () => userAgent.indexOf('MicroMessenger') > -1
// export const isQQ = () => userAgent.match(/\sQQ/i).indexOf(' qq') > -1
