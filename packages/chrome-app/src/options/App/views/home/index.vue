<template>
<div class="home">
    <Sidebar @click="sidebarClick"></Sidebar>
    <div class="content">
        <router-view></router-view>
    </div>
</div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps,reactive,getCurrentInstance, onMounted} from "vue";
import { useRouter,useRoute } from 'vue-router';
import { useI18n } from '@/locales';
import Sidebar from '../../component/sidebar.vue';
import { useUserStore } from '../../stores/user';

const router = useRouter();
const route = useRoute();
const currentRoute = router.currentRoute;
const { appContext }:any = getCurrentInstance();
const configMethods = appContext.config.globalProperties;
const { tm, locale  } = useI18n();


onMounted(async ()=>{
    const userStore = useUserStore();
    const user = await userStore.getUserInfo();
    userStore.setUser(user);
})


const sidebarClick = (item)=>{
    router.push({
        name:item.name,
        params:{
            lang:locale.value
        }
    })
}

// 路由重定向
watch(()=>route,(nv)=>{
    const lang:any = nv?.params?.lang;
    if(!lang || !['zh','en'].includes(lang)){
        router.push({
            name:'LifePage',
            params:{
                lang:locale.value,
            }
        })
    }
},{immediate:true});

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
