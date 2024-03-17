<template>
<div class="home">
    <Sidebar @click="sidebarClick"></Sidebar>
    <div class="content">
        <span> {{ currentRoute.name }} </span>
        <router-view></router-view>
    </div>
</div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps,reactive,getCurrentInstance} from "vue";
import { useRouter,useRoute } from 'vue-router';
import { useI18n } from '@/locales';
import Sidebar from '../../component/sidebar.vue'

const router = useRouter();
// const route = useRoute();
const currentRoute = router.currentRoute;
const { appContext }:any = getCurrentInstance();
const configMethods = appContext.config.globalProperties;
const { tm, locale  } = useI18n();
// const currentItem = ref();


const sidebarClick = (item)=>{
    currentItem.value = item;
    router.push({
        name:item.name,
        params:{
            lang:locale.value
        }
    })
}

</script>
<style lang="scss" scoped>
.home{
    width: 100%;
    height: 100%;
    display: flex;
    .content{
        width: calc( 100% - 58px);
        background:#ebedf0;
        padding: 20px;
    }
}
</style>
