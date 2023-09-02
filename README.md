  // 这里transports的默认值为["polling", "websocket"] 也就是优先使用polling， 但是polling再谷歌浏览器连接不上
  // transports: ["websocket", "polling"],
  // 这里的配置项有：IO工厂配置项、低级引擎配置项(会被设置到所有同一管理者的的socket实例上)
  // forceNew, multiplex, transports,upgrade,
  // rememberUpgrade,path,query,extraHeaders,withCredentials,
  // forceBase64,timestampRequests,
  // timestampParam,closeOnBeforeunload

  // 在 后端使用时，还有一些额外的配置项：
  // agent, pfx, key, passphrase, cert, ca, ciphers, rejectUnauthorized

  // 还有 ManagerOptions 管理性配置项：
  // autoConnect: false, // 是否自动连接，默认为true，设为false后，可以通过 connect() 或者 open()手动开启
  // reconnection: false // 是否自动重连，默认为true，设为false后，需要手动进行重连
  // reconnectionAttempts, reconnectionDelay, reconnectionDelayMax, randomizationFactor,timeout,parser

  // 鉴权配置
  // auth: {
  //   token: 'abcd'
  // }

## 技术case
- vue-i18n/翻译设置 ✅
- 黑白模式 ✅
- vue-router ✅
- store
- socket ✅