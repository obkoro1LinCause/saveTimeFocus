<template>
  <div class="px-1">
    <div class="flex">
      <span>删除投资时间子项目</span>
    </div>
    <div class="flex flex-col mt-2">
      <span class="tip">删除子项目，将删除该子项目对应的专注番茄数据等数据，该操作无法恢复，确认删除吗？</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref,defineProps, onMounted, watch, computed } from 'vue';

onMounted(()=>{

});



</script>

<style lang="scss" scoped>
.tip{
  color: #2f2f2f;
  font-size: 12px;
}
</style>