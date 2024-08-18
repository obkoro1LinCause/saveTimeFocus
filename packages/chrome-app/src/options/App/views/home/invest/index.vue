
<template>
  <div  class="h-full">
    <splitpanes class="default-theme">
      <pane min-size="30">
        <div class="mt-5 mb-12">
          <CardList 
            v-for="(_,key) in CardInfo" 
            :key="key" :type="key"  
            :listMap="CardInfo[key]"
          ></CardList>
        </div>
      </pane>
      <pane min-size="50">
        <div class="flex justify-between items-center bg-white header">
          <span></span>
          <a-radio-group v-model:value="investModuleStore.currentTaskStatus">
            <a-radio-button v-for="(key,value) in TaskStatusMap" :key="value" :value="value">{{ key }} {{ value }}</a-radio-button>
          </a-radio-group>
          <PlusOutlined @click="onClick('create')" class="cursor-default text-16px font-900 c-blue"/>
        </div>
        <div v-if="taskList?.length">
          <template v-for="(item,index) in taskList" :key="index">
            <TaskList :task-item="item"  :task-index="index"></TaskList>
          </template>
        </div>
        <div v-else class="flex justify-center h-full items-center">
          <a-empty :image="simpleImage" :description="descStatus"/>
        </div>
      </pane>
    </splitpanes>
    <ModalCreate v-model="createVisible"></ModalCreate>
    <ModalContainer></ModalContainer>
  </div>
</template>

<script setup lang="ts">
import { ref, watch,defineProps, computed } from 'vue';
import { useRoute } from 'vue-router';
import { Splitpanes, Pane } from 'splitpanes'
import ModalCreate from './components/modal/modalCreate.vue';
import ModalContainer from './components/modal/modalContainer.vue';

import { LikeOutlined } from '@ant-design/icons-vue'
import 'splitpanes/dist/splitpanes.css';
import CardList from './components/card/cardList.vue';
import { CardInfo } from './components/card/type';
import { PlusOutlined } from "@ant-design/icons-vue";
import { Empty } from 'ant-design-vue';
import TaskList from './components/task/taskList.vue';
import { type TTaskList, TaskStatusMap, TaskStatusEnum } from './components/task/type';
import { taskListcons } from './components/task/configure';
import { useInvestModuleStore } from '@/options/App/stores/task';

const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
const route = useRoute();
const investModuleStore = useInvestModuleStore();

const props = defineProps({});
const containerRef = ref()
const createVisible = ref(false);

// mock
const taskList = computed(()=>{
  if(investModuleStore.currentTaskStatus == TaskStatusEnum.INVEST){
    return taskListcons;
  }else if(investModuleStore.currentTaskStatus == TaskStatusEnum.PLAN){
    return [];
  }else {
    return [];
  }
});

const descStatus = computed(() => {
  if (['investing','planning','closed'].includes(investModuleStore.currentTaskStatus) && !investModuleStore.investTasks?.length && !investModuleStore.planTasks?.length) { return '点击右上角创建按钮，创建投资时间目标做时间的朋友。' };
  if (investModuleStore.currentTaskStatus === 'investing' && investModuleStore.planTasks?.length) { return '投资目标已完成，前往规划中，开启新的投资时间目标吧。' };
  if (investModuleStore.currentTaskStatus === 'planning' && !investModuleStore.planTasks?.length) { return '暂无规划中投资计划，创建更多投资时间目标，改变你的人生。' };
  if (investModuleStore.currentTaskStatus === 'closed' && !investModuleStore.closedTask?.length ) { return '完成目标后，设置为已归档，保存投资时间成果。'};
  return '';
});

const onClick = (type:'create')=>{
  if(type === 'create'){
    createVisible.value = true;
  }
}
</script>


<style scoped lang="scss">
.invest-main{
  height: 100%;
}
.splitpanes {
  background: #fff;
}

.splitpanes.default-theme .splitpanes__pane {
    background-color: #fff;
    overflow: auto;
}

.header{
  height: 75px;
  padding: 20px;
  min-width:50%;
  position: sticky;
  top: -1px;
  background: #fff;
  z-index: 10;
}
</style>
