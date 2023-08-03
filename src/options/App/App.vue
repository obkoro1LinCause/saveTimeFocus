<template>
  <div class="main_app">
    <div class="main-side">
      <Sidebar />
    </div>
    <div class="main-view">
      <div class="view-header">
        <Header />
      </div>
      <div class="view-content">
        <router-view />
      </div>
    </div>
    <span @click="onClick">点击</span>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Sidebar from '@/components/SideBar.vue'
import { connect } from './Socket.io'
// import { Socket } from 'socket.io-client';

export default {
  name: 'OptionsApp',
  components: {
    Header,
    Sidebar,
  },
  mounted() {
    // this.$socket.on('open', (client) => {
    //   console.log('Connected to the WebSocket server');
    //   socket.send(JSON.stringify({
    //     event: 'hello',
    //     data: 'Hello from client',
    //   }));
    // });

    // this.$socket.on('message', (data) => {
    //   console.log('Message from server: ', data.toString());
    // });

    // this.$socket.on('close', () => {
    //   console.log('Disconnected from the WebSocket server');
    // });

    // this.$socket.on('error', (error) => {
    //   console.error('WebSocket error: ', error);
    // });

    // this.$socket.on('socketTest3', (data) => {
    //     console.log(data,'w2w22') // { test: 测试数据}
    // });
    // this.$socket.connect((res) => {
    //   console.log(res,this.$socket.disconnected,this.$socket); //连接socket服务器
    // });

    connect()
  },
  methods: {
    onClick() {
      window.socket.emit('socketTest', { test: '测试数据' }, (data) => {
        console.log(data)
      })

      // this.$socket.emit('socketTest_Broadcast','socketTest_Broadcast',(data)=>{
      //     console.log(data)
      // });
    },
  },
}

</script>

<style>
.main_app {
  min-height: 100vh;
  width: 100%;
  display: flex;
}
.main-view{
  width: calc(100% - 260px);
  overflow: hidden;
}
.view-header{
  width: 100%;
}
.view-content{
  max-height: 800px;
  overflow: auto;
}
::-webkit-scrollbar {
  height: 5px;
  width: 5px;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 10%);
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: hsla(0, 0%, 100%, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
}

/* element-ui 弹窗遮罩的问题 */
.v-modal {
  opacity: 1;
  background: rgba(0, 0, 0, 0.5);
}
</style>>
