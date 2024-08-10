
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
          <a-radio-group v-model:value="typeVal" @change="onChange">
            <a-radio-button v-for="(item,index) in typeGroups" :key="index" :value="item.value">{{ item.label}}</a-radio-button>
          </a-radio-group>
          <PlusOutlined @click="onClick('create')" class="cursor-default text-16px font-900 c-blue"/>
        </div>
        <div v-if="!showEmpty">
          <template v-for="(item,index) in taskList" :key="index">
            <TaskList :task-item="item" :type-value="typeVal"></TaskList>
          </template>
        </div>
        <div class="flex justify-center h-full items-center" v-else>
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
// import ModalStart from './components/modal/modalStart.vue';

import { LikeOutlined } from '@ant-design/icons-vue'
import 'splitpanes/dist/splitpanes.css';
import CardList from './components/card/cardList.vue';
import { CardInfo } from './components/card/type';
import { PlusOutlined } from "@ant-design/icons-vue";
import { Empty } from 'ant-design-vue';
import TaskList from './components/task/taskList.vue';
import { type TTaskList } from './components/task/type';
import { taskListcons } from './components/task/configure';

const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
const route = useRoute();

const props = defineProps({});
const containerRef = ref()
const createVisible = ref(false);
const typeVal = ref('investing');
const typeGroups = ref([
  {
    label:'投资中',
    value:'investing',
  },
  {
    label:'规划中',
    value:'planning',
  },
  {
    label:'已归档',
    value:'closed',
  }
]);
const typeValMap = ref({
  investing:[],
  planning:[],
  closed:[]
});
const taskList = ref(taskListcons);

const showEmpty = computed(()=>{
  return !(typeValMap.value[typeVal.value]?.length || true);
})
const descStatus = computed(() => {
  if (['investing','planning','closed'].includes(typeVal.value) && !typeValMap.value.investing?.length && !typeValMap.value.planning?.length) { return '点击右上角创建按钮，创建投资时间目标做时间的朋友。' };
  if (typeVal.value === 'investing' && typeValMap.value.planning?.length) { return '投资目标已完成，前往规划中，开启新的投资时间目标吧。' };
  if (typeVal.value === 'planning' && !typeValMap.value.planning?.length) { return '暂无规划中投资计划，创建更多投资时间目标，改变你的人生。' };
  if (typeVal.value === 'closed' && !typeValMap.value.closed?.length ) { return '完成目标后，设置为已归档，保存投资时间成果。'};
  return '';
});

const onChange = (item)=>{
  console.log(typeVal.value,item,'==item==');
}
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
