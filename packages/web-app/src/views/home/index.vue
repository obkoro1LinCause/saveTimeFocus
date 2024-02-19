<template>
    <div class="home">
        <div class="home-side">
            <BMenu @click="clickMenu" ></BMenu>
        </div>
        <div class="home-body">
             <router-view></router-view>
        </div>
    </div>
  
</template>

<script setup lang="ts">
import { ref, watch, defineProps,reactive } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();

const clickMenu = (info)=>{
    router.push(`/app/home/${info.key}`);
}

// const getUser = ()=>{
    
// }
</script>
<style lang="scss" scoped>
.home{
    display: flex;
    width: 100%;
    height: 100%;
}
.home-side{
    width: 240px;
}
.home-body{
     width: calc(100% - 240px);
}
</style>
