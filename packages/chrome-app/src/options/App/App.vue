<template>
 <div class="app-main">
    <Header 
        @goTo="gotoUser"
        @setLang="setLang" 
        :userInfo="userInfo"
    ></Header>
    <div class="app-body">
    <router-view></router-view>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { computed,ref,getCurrentInstance,provide,watch,onMounted } from 'vue';
import { RouterLink, RouterView, useRoute, useRouter} from 'vue-router';
import Header from './component/header.vue';
import Siderbar from './component/siderbar.vue'

const { appContext }:any = getCurrentInstance();
const configMethods = appContext.config.globalProperties;

const router = useRouter();
const route = useRoute()
const userInfo = ref();
const token = ref();

const gotoUser = ()=>{
    router.push('/app/user');
}

const setLang = (lang)=>{
    console.log('===setLang===',lang)
}

const getUserInfo = async (token)=>{};



</script>

<style scoped>
.app-main{
    width:100%;
    height: 100%;
    overflow: hidden;
}
.app-body{
    width: 100%;
    height: 100%;
    margin: 0 auto;
}
</style>
