<template>
  <div class="px-1">
    <div class="flex">
      <span>危险！删除投资时间项目</span>
    </div>
    <div class="flex flex-col mt-2">
      <span>项目名称</span>
      <span class="tip">删除投资时间项目，是一个无法恢复的操作，将会删除该投资时间项目的所有记录，也会删除已统计的番茄专注和番茄分。</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref,defineProps, onMounted, watch, computed } from 'vue';

const props = defineProps({
  taskCardValue:{
    type:Object,
    default:()=>({})
  },
});

onMounted(()=>{

});



</script>

<style lang="scss" scoped>
.tip{
  color: #2f2f2f;
  font-size: 12px;
}
</style>