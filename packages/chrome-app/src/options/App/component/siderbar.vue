<template>
    <a-menu :items="items" @click="handleClick"></a-menu>
</template>
<script lang="ts">
import { defineComponent, nextTick, h,ref, computed, reactive,onMounted,defineEmits } from "vue";
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
  HomeOutlined,
  FilePptOutlined
} from '@ant-design/icons-vue';
import type {
     MenuProps, ItemType } from 'ant-design-vue';

export default defineComponent({
  name: "Siderbar",
  props: {},
  setup(props, ctx) {
    const items : ItemType[]= reactive([
        {
            key: 'life',
            icon: () => h(HomeOutlined),
            label: '管理人生',
            title: '管理人生',
        },
        {
            key: 'invest',
            icon: () => h(FilePptOutlined),
            label: '时间投资',
            title: '时间投资',
        },
        // {
        //     key: 'calendar',
        //     // icon: () => h(MailOutlined),
        //     label: '日历',
        //     title: '日历',
        // },
        // {
        //     key: 'habit',
        //     // icon: () => h(MailOutlined),
        //     label: '习惯',
        //     title: '习惯',
        // },
        // {
        //     key: 'time',
        //     // icon: () => h(MailOutlined),
        //     label: '时间轴',
        //     title: '时间轴',
        // },
        {
            key: 'admin',
            icon: () => h(HomeOutlined),
            label: '用户管理',
            title: '用户管理',
        }
    ]);

    const handleClick = (menuInfo:any) => {
        ctx.emit('click',menuInfo);
    };
    return {
        items,
        handleClick,
    };
  },
});
</script>

<style scoped>
.ant-menu{
    height: 100%;
}
</style>