
import io,{ type SocketOptions } from 'socket.io-client'


export type TOptions =  SocketOptions & {
    errorFn?:Function,
    connectedFn?:Function,
    disconnectFn?:Function,
    serverUrl:string
}

export default class SocketClient {
    public socket:any;
    private connected:boolean = false;
    constructor(options:TOptions){
        const { errorFn,connectedFn,serverUrl }  = options
        if (this.socket && this.socket.connected) return;
        this.socket = io(serverUrl, options);
        // 监听事件
        this.socket.on('connect', () => {
            this.connected =  true;
            connectedFn?.();
        });
        
        this.socket.on('error', (error:string) => {
            errorFn?.(error);
        })
        
        this.socket.on('disconnect', (reason:string) => {
            console.log('Disconnected from WebSocket server:', reason)
            // 如果断开原因不是客户端主动关闭连接，尝试重新连接
            if (reason !== 'io client disconnect') {
                this.reconnectWithBackoff();
            }
        });
        // 添加在线/离线事件监听，以便在网络连接恢复正常后自动重新连接
        window.addEventListener('online', () => {
          console.log('Network connection restored, attempting to reconnect...')
          if (this.socket && this.socket.disconnected) {
            this.reconnectWithBackoff()
          } else {
            this.connect();
          }
        });
        window.addEventListener('offline', () => {
          console.log('网络连接已断开！')
          if (this.socket && this.socket.disconnected) {
            this.socket.connect();
          }
        })
    }

    connect(){
        if(!this.connected) return;
        this.socket.connect();
    }

    reconnectWithBackoff(
        maxDelay = 30000,
        initialDelay = 1000,
        delayFactor = 2,
      ) {

        let delay = initialDelay
        const reconnectAttempt = () => {
          console.log(`Attempting to reconnect in ${delay}ms...`)
          setTimeout(() => {
            if (this.socket && this.socket.disconnected) {
                this.socket.connect()
                delay = Math.min(maxDelay, delay * delayFactor)
                this.socket.on('connect', () => {
                    delay = initialDelay // 重置延迟时间
                })
              reconnectAttempt();
            }
          }, delay)
        }
        reconnectAttempt()
      }
    on(){}
    emit(){}
}


