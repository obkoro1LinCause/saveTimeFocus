<template>
  <div class="item-log-box flex flex-col">
     <span class="mr-2 text-16px font-400">修改记录</span>
     <a-table :dataSource="dataSource" :columns="columns" />
  </div>
</template>
<script lang="ts" setup>
import { ref,defineProps, onMounted, watch, computed,PropType } from 'vue';
import { TItem } from '../item/item.type';

const props = defineProps({
  title:String,
  filed:{
    type:[String,Array],
    required:true
  },
  type:{
    type:String as PropType<TItem>,
    default:'',
  }
});


const columns = ref([
   {
      title: '修改时间',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '状态',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '操作行为',
      dataIndex: 'address',
      key: 'address',
    },
]);

const dataSource = ref([])


</script>


<style lang="scss" scoped>

</style>