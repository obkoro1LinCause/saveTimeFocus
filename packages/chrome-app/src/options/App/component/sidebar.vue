
<template>
<div class="sidebar">
    <div class="sidebar-item" v-for="(item,index) in sidebarList" :key="index"> 
        <router-link :to="{ name:item.name, params:{ lang:locale } }">
            <a-tooltip 
                placement="right" 
                :title="tm(item.key)"
            >
                <component 
                 :is="item.icon" 
                >
                </component>
            </a-tooltip>
        </router-link>
    </div>
</div>
</template>

<script setup lang="ts">
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
  HomeOutlined,
  FilePptOutlined
} from '@ant-design/icons-vue';
import { ref,defineEmits } from 'vue';
import { useI18n } from '@/locales';
import { useRoute } from 'vue-router';

const route = useRoute();
const { tm,locale } = useI18n();
const emits = defineEmits(['click']);


const sidebarList = ref([
    {
        icon:MailOutlined,
        key:'life',
        name:'LifePage',
    },
    {
        icon:CalendarOutlined,
        key:'invest',
        name:'InvestPage',
    },
    {
        icon:FilePptOutlined,
        key: 'admin',
        name:'AdminPage',
    }
]);


const onMouseenter = (item)=>{
    
}

const onMouseount = (item)=>{
    
}
</script>


<style scoped lang="scss">
.sidebar{
    display: flex;
    flex-direction: column;
    width: 58px;
    height: 100%;
    background: #fafafa;
    .sidebar-item{
        width: 100%;
        margin: 15px 0;
        display: flex;
        justify-content: center;
        span{
            color:#575757;
            font-size: 18px;
        }
        .router-link-active span{
            color:#08c;
            font-size: 20px;
        }
    }
}
</style>
