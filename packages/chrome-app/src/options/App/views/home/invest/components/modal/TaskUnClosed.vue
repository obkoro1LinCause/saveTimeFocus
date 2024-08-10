<template>
  <div class="px-1">
    <div class="flex">
      <span>项目名:</span>
      <span> {{ taskCardValue?.title || '暂无信息' }}</span>
    </div>
    <span class="tip">
      取消归档后，该时间投资项目将放入规划中列表里面，请确认取消归档？
    </span>
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