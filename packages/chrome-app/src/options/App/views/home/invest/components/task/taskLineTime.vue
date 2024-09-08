
<template>
  <div class="task-line-time"> 
    <div class="line-tm-header flex">
      <span>投资时间轴</span>
      <span>分享</span>
    </div>
    <div class="line-tm-body">
      <a-timeline>
        <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
        <a-timeline-item>Solve initial network problems 2015-09-01</a-timeline-item>
        <a-timeline-item>Technical testing 2015-09-01</a-timeline-item>
        <a-timeline-item>Network problems being solved 2015-09-01</a-timeline-item>
      </a-timeline>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, onMounted, PropType, computed} from "vue";

const props = defineProps({
  
});




</script>

<style lang="scss" scoped>

</style>

