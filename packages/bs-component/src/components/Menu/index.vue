<template>
    <Menu :items="items" @click="handleClick"></Menu>
</template>
<script lang="ts">
import { defineComponent, nextTick, h,ref, computed, onMounted,defineEmits } from "vue";
import { Menu,MenuItem } from 'ant-design-vue'
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';
import Icon from '../Icon/index.vue';


export default defineComponent({
  name: "BMenu",
  props: {},
  components: {
    Menu,
    MenuItem
  },
  setup(props, ctx) {

    const items = ref([
        {
            key: 'life',
            icon: () => h(MailOutlined),
            label: '管理人生',
            title: '管理人生',
        },
        {
            key: 'invest',
            icon: () => h(MailOutlined),
            label: '时间投资',
            title: '时间投资',
        },
        {
            key: 'calendar',
            icon: () => h(MailOutlined),
            label: '日历',
            title: '日历',
        },
        {
            key: 'habit',
            icon: () => h(MailOutlined),
            label: '习惯',
            title: '习惯',
        },
        {
            key: 'time',
            icon: () => h(MailOutlined),
            label: '时间轴',
            title: '时间轴',
        },
        {
            key: 'block',
            icon: () => h(Icon,{type:'block'}),
            label: 'blockWeb',
            title: 'blockWeb',
        },
        {
            key: 'admin',
            icon: () => h(Icon,{type:'block'}),
            label: '用户管理',
            title: '用户管理',
        }
    ]);

    const handleClick = menuInfo => {
        ctx.emit('click',menuInfo);
    };
    return {
        items,
        handleClick
    };
  },
});
</script>

<style scoped>
.ant-menu{
    height: 100%;
}
</style>