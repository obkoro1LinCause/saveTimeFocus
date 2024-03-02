<template>
  <div class="box-card">
      <span @click="onPopupClick">
        <a-tag color="pink">pink</a-tag> 
        主页
      </span> 
  </div>
</template>

<script lang="ts" setup>
import { handlerWindow } from '../../utils/creat-window';
import { RouterLink, RouterView, useRoute, useRouter} from 'vue-router';
import { Utils } from '@toolkit';
import { getCurrentInstance } from 'vue';
import NET from '../../utils/net';
import { utils } from '@/utils/index';

const router = useRouter();
const route = useRoute()

const { appContext }:any = getCurrentInstance();
const { useI18n } = Utils.VueI18n;
const { tm } = useI18n();


const onPopupClick = async()=>{
  utils.jumpUrl(NET.OPTIONSPAGE)
  // 创建小弹窗
  // handlerWindow();
}
</script>

<style scoped>
.box-card {
  width: 180px;
  background: #323232;
  color: #e0e0e0;
  font-size: 13.5px;
  padding: 5px 0;
}
.box-card > div > div {
  width: 20px;
  font-size: 20px;
  color: #fff;
  margin-right: 15px;
}
.color-green {
  color: #5c8e23;
}
.color-gray {
  color: gray;
}
.box-card > div {
  cursor: pointer;
  padding: 2px 10px;
  height: 32px;
  display: flex;
  align-items: center;
  border-bottom: 3px solid #2a2a2a;
}
.box-card > div:hover {
  background: #7f6026;
}
</style>

