<template>
    <div class="app-main">
        <BHeader 
            @click="goToHome" 
            @setLang="setLang"
            :userInfo="userInfo"
        ></BHeader>
        <div class="app-body">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref,watch } from 'vue';
import { RouterLink, RouterView, useRoute, useRouter} from 'vue-router';
import { userInfoByToken } from './service/domain/user';

const router = useRouter();
const route = useRoute()
const userInfo = ref();
const token = ref();

// 问题1:如果清空了session信息 如何保证获取到用户信息
const goToHome = ()=>{
    console.log('===goToHome===');
};

const setLang = (lang)=>{
    console.log('===setLang===',lang)
}

const getUserInfo = async (token)=>{
    if(!token) return userInfo.value = null;
    const ret = await userInfoByToken({token});
    if(!ret.error){
        userInfo.value = ret?.data;
    };
}

watch(()=>route,(nv)=>{
    token.value = localStorage.getItem('user-token');
    getUserInfo(token.value);
},{immediate:true,deep:true})

</script>


<style scoped lang="scss">
.app-main{
    width:100%;
    height: 100%;
    overflow: hidden;
}
.app-body{
    width: 100%;
    height: 100%;
    display: flex;
    margin: 0 auto;
}
.body-sidebar{
    width: 260px;
    height: 100%;
    border-right: 1px solid #ccc;
}
.body-content{
    width: calc(100% - 260px);
    background:#ebedf0;
}
</style>
