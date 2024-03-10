<template>
    <div class="home">
        <div class="side">
            <template v-for="(item) in items" :key="item.key">
                <div class="side_item">
                    <router-link :to="{ name:item.name,params:{lang:locale} }">{{ tm(item.key) }}</router-link>
                </div>
            </template>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
  
</template>

<script setup lang="ts">
import { ref, watch, defineProps,reactive,getCurrentInstance} from "vue";
import { useRouter } from 'vue-router';
import { useI18n } from '@/locales';
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
  HomeOutlined,
  FilePptOutlined
} from '@ant-design/icons-vue';

const router = useRouter();
const { appContext }:any = getCurrentInstance();
const configMethods = appContext.config.globalProperties;
const { tm,locale } = useI18n();


const items = ref([
    {
        key: 'life',
        name:'LifePage'
    },
    {
            key: 'invest',
            name:'InvestPage'
    },
    {
            key: 'admin',
            name:'AdminPage'
    }
]);
</script>
<style lang="scss" scoped>
.home{
    width: 100%;
    height: 100%;
    display: flex;
    .side{
        width: 260px;
        height: 100%;
        .side_item{
            height: 38px;
        }
        a{  
            width: 100%;
            height: 38px;   
            line-height: 38px;
            font-size: 16px;
            text-decoration: none;
            display: inline-block;
            color:#000000e0;
            padding: 0 15px;
        }
        a:hover{
           color: #1677ff;
        }
        .router-link-active{
            height: 38px;
            color: #1677ff;
            background: #e6f4ff;
            border-radius:4px ;
        }
    }
    .content{
        width: calc( 100% - 260px);
        background:#ebedf0;
        padding: 20px;
    }
}
</style>
