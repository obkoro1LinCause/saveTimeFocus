import io from 'socket.io-client'

let socket
const serverUrl = 'http://localhost:8010/'

const options = {
  autoConnect: false, // 关闭自动连接
} 

function connect() {
  if (socket && socket.connected) return
  socket = io(serverUrl, options)
  window.socket = socket

  socket.connect();

  socket.on('connect', () => {
    console.log(socket.connected) // true
  })

  socket.on('connection', () => {
    console.log('Connected to WebSocket server')
  })

  socket.on('error', (error) => {
    console.error('WebSocket error:', error)
    reconnectWithBackoff();
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

export { connect };




// ----------------------------------------------------
