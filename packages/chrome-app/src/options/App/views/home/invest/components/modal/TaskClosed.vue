<template>
  <div class="px-1">
   <div class="flex">
     <span>目标名:</span>
     <span> {{ taskCardValue?.title || '暂无信息' }}</span>
   </div>
   <div class="flex flex-col tip mt-1">
      <span>归档后，该投资时间目标无法再进行番茄专注投资，请确认该投资时间目标已达成。</span>
      <span>如果未达成，可更改投资状态为关闭。</span>
      <span>如果仍然想要归档，请确认归档。</span>
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