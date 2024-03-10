<template>
  <div class="box-card">
      <p @click="onPopupClick">
        <HomeOutlined  :style="{color:'#5c8e23',fontSize:16}"/>
        <span>主页</span>
      </p>
  </div>
</template>

<script lang="ts" setup>
import { HomeOutlined } from '@ant-design/icons-vue';
import { handlerWindow } from '../../utils/creat-window';
import { RouterLink, RouterView, useRoute, useRouter} from 'vue-router';
// import { Utils } from '@toolkit';
import { getCurrentInstance } from 'vue';
import NET from '../../utils/net';
import { utils } from '@/utils/index';

const router = useRouter();
const route = useRoute()

const { appContext }:any = getCurrentInstance();


const onPopupClick = async()=>{
  utils.jumpUrl(NET.OPTIONSPAGE)
  // 创建小弹窗
  // handlerWindow();
}
</script>

<style scoped>
.box-card {
  width: 280px;
  height: 380px;
  color: #2a2a2a;
  font-size: 13.5px;
  padding: 20px;
  font-size: 16px;
  display: flex;

}
p{
  width: 100%;
  height: 35px;
  line-height: 35px;
  border-radius: 4px;
}
p:hover{
   background: #f2f2f2;

}
p > span{
  color: gray;
  margin-left:10px;
  cursor: pointer;
}
</style>

