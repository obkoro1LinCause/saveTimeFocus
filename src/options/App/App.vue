<template>
 <el-config-provider :locale="locale">
   <div class="main_app">
     <div class="main_header">
      <Header @changeLang="onChange"></Header>
     </div>
     <div class="main_content">
       <router-view></router-view>
     </div>
    </div>
  </el-config-provider>
</template>

<script lang="ts" setup>
import { computed,ref,getCurrentInstance,provide} from 'vue';
import Header from './page/components/header.vue';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import en from 'element-plus/dist/locale/en.mjs';


const { appContext }:any = getCurrentInstance();
const configMethods = appContext.config.globalProperties;
const locale = ref(zhCn);
const lang:any = ref('zh');

const onChange = async(str:string)=>{
  lang.value = str;
  locale.value = str === 'zh' ? zhCn : en;
}

const init = async()=>{
  document.documentElement.removeAttribute('class');
};
init();

</script>

<style scoped>
.main_app {

}
.main_header{
  border-bottom: 1px solid #ccc;
}
.main_content{
  padding: 10px;
}

</style>
