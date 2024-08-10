
<template>
  <div class="flex flex-col my-3 mx-3">
    <div class="main-task min-h-auto">
      <p class="my-3 font-900 text-16px">投资时间主任务</p>
      <TaskCard :task-card="taskCardMap?.item"></TaskCard>
    </div>
    <div class="sub-task" v-if="!!taskCardMap?.children?.length">
      <p class="my-3 font-900 text-16px">投资时间子任务</p>
      <div class="flex flex-col flex-wrap justify-center">
        <template v-for="(item,index) in taskCardMap?.children" :key="index">
           <TaskCard  class="m-3"  :task-card="item"></TaskCard>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, onMounted, PropType } from "vue";
import TaskCard from './taskCard.vue';
import { type TTaskMap } from './type'

const props = defineProps({
  taskItem:{
    type:Object as PropType<TTaskMap>,
    required:true,
  },
  typeValue:String
});

const taskCardMap = ref(props.taskItem);
</script>

