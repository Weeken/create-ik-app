/**
 * 部署所属环境dev uat gray product
 * Url 前端访问地址
 * apiUrl  Api访问地址
 * LoginIn  SSO登录地址
 * AiagainUrl  艾客官网地址
 * AiagainAdmin  艾客后台地址
 * AiagainAuthorization  艾客授权地址
 * unitPermission  SSO权限控制
 * StorageKey  Storage存储Key
 * AdmpMerchant 开通admp待办任务的商户
 */
(function(root, factory) {
  'use strict'
  if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else if (typeof define === 'function' && define.amd) {
    define(factory)
  } else {
    root.SYSTEM_CONFIG = factory(root)
  }
}(this, function(root) {
  return {
    "development": {
      "BASE_URL": "http://api.marketing.apollocenter.dev.aiagain.com"
    },
    "production": {
      "BASE_URL": "http://api.marketing.apollocenter.dev.aiagain.com"
    }
  }
}))
