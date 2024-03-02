
<template>
    <div class="admin-main">
        <a-table :dataSource="dataSource" :columns="columns" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch,defineProps } from 'vue';
import { userList } from '@/service/domain/user';

const dataSource = ref([]);
const columns = ref([
    {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: '昵称',
        dataIndex: 'nickname',
        key: 'nickname',
    },
    {
        title: '邀请码',
        dataIndex: 'selfInviteCode',
        key: 'selfInviteCode',
    },
    {
        title: '被邀请码',
        dataIndex: 'inviteCode',
        key: 'inviteCode',
    },
    {
        title: 'vip时间',
        dataIndex: 'vipTime',
        key: 'vipTime',
    },
    {
        title: '设备信息',
        dataIndex: 'equipmentInfo',
        key: 'equipmentInfo',
    },
    {
        title: '注册时间',
        dataIndex: 'registerAt',
        key: 'registerAt',
    }
])


const getUserList = async ()=>{
   const ret =  await userList();
   if(ret.error) return;
   dataSource.value = ret?.data || [];
};

getUserList();

</script>


<style scoped lang="scss">
.admin-main{
    width: 100%;
    height: 800px;
    margin:0 auto;
}
</style>
