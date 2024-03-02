<template>
    <div class="home">
        <div class="side">
            <Siderbar @click="clickMenu"></Siderbar>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
  
</template>

<script setup lang="ts">
import { ref, watch, defineProps,reactive } from "vue";
import { useRouter } from 'vue-router';
import Siderbar from '../../component/siderbar.vue'

const router = useRouter();


const clickMenu = (info)=>{
    router.push(`/app/home/${info.key}`);
}
</script>
<style lang="scss" scoped>
.home{
    width: 100%;
    height: 100%;
    display: flex;
    .side{
        width: 260px;
        height: 100%;
    }
    .content{
        width: calc( 100% - 260px);
        background:#ebedf0;
        padding: 20px;
    }
}
</style>
