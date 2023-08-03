import io from 'socket.io-client'

let socket
const serverUrl = 'http://localhost:8010/'

const options = {
  autoConnect: false, // 关闭自动连接
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
} // 添加任何连接选项，例如：{ transports: ['websocket'] }

function connect() {
  if (socket && socket.connected) return
  socket = io(serverUrl, options)
  window.socket = socket

  socket.connect()

  socket.on('connect', () => {
    console.log(socket.connected) // true
  })

  socket.on('connection', () => {
    console.log('Connected to WebSocket server')
  })

  socket.on('error', (error) => {
    console.error('WebSocket error:', error)
    // reconnectWithBackoff();
  })

  socket.on('disconnect', (reason) => {
    console.log('Disconnected from WebSocket server:', reason)
    // 如果断开原因不是客户端主动关闭连接，尝试重新连接
    if (reason !== 'io client disconnect') {
      reconnectWithBackoff()
    }
  })

  // 在这里添加其他事件处理程序，例如：socket.on('event', ...)
}

function reconnectWithBackoff(
  maxDelay = 30000,
  initialDelay = 1000,
  delayFactor = 2,
) {
  let delay = initialDelay

  const reconnectAttempt = () => {
    console.log(`Attempting to reconnect in ${delay}ms...`)
    setTimeout(() => {
      if (socket && socket.disconnected) {
        socket.connect()
        delay = Math.min(maxDelay, delay * delayFactor)
        socket.on('connect', () => {
          delay = initialDelay // 重置延迟时间
        })
        reconnectAttempt()
      }
    }, delay)
  }

  reconnectAttempt()
}

// 添加在线/离线事件监听，以便在网络连接恢复正常后自动重新连接
window.addEventListener('online', () => {
  console.log('Network connection restored, attempting to reconnect...')
  if (socket && socket.disconnected) {
    reconnectWithBackoff()
  } else {
    connect()
  }
})

window.addEventListener('offline', () => {
  console.log('网络连接已断开！')
  if (socket && socket.disconnected) {
    socket.connect()
  }
})

export { connect }
