<template>
 <div class="app-main">
    <Header 
        @goTo="gotoUser"
        @setLang="setLang" 
        :userInfo="userInfo"
        @menuClick="menuClick"
    ></Header>
    <div class="app-body">
        <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed,ref,getCurrentInstance,provide,watch,onMounted } from 'vue';
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';
import { userLogout } from '../../service/domain/user';
import Header from './component/header.vue';
import Siderbar from './component/siderbar.vue';
import { useUserStore } from '../App/stores/user';
import { useI18n } from '@/locales';

const { appContext }:any = getCurrentInstance();
const configMethods = appContext.config.globalProperties;

const router = useRouter();
const route = useRoute()
const userStore = useUserStore();
const { tm,locale } = useI18n();
const token = ref();

const userInfo = computed(()=>{
    return userStore.userInfo;
})
const gotoUser = ()=>{
    router.push({
        name: 'LoginOrSignPage',
        params:{
            lang:locale.value
        }
    });
}

const setLang = (lang)=>{
    locale.value = lang;
    localStorage.setItem('lang',lang);
    document.querySelector('html').setAttribute('lang', lang);
    const currentRouteName = route.name;
    router.push({
        name: currentRouteName,
        params:{
            lang:locale.value
        }
    });
}

const menuClick = async (e)=>{
    const { key } =e;
    if(key == 2){
        const ret = await userLogout({
            email:userInfo.value.email
        });
        if(!ret.error){
            localStorage.removeItem('user-token');
            location.reload();
        }
    }
}


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
