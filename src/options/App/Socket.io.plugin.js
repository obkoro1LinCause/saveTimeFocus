import { io } from 'socket.io-client'

export default {
  install: (Vue, { connection, options }) => {
    const socket = io(connection, options)
    console.log('-1-1-1-')
    Vue.prototype.$socket = socket
    // Vue.provide("socket", socket);
  },
}
