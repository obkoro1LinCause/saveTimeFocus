
<template>
  <div  class="h-full invest-detail">
    <div class="detail-header">
      <a-breadcrumb :routes="routes">
        <template #itemRender="{ route }">
          <span v-if="routes.indexOf(route) === routes.length - 1">
            {{ route.breadcrumbName }}
          </span>
          <router-link v-else :to="{name:route.name}">
            {{ route.breadcrumbName }}
          </router-link>
        </template>
      </a-breadcrumb>
    </div>
    <div class="detail-content mt-2">
      <div class="detail-header flex flex-col">
        <div class="flex justify-between items-center">
          <span class="font-400 text-16px">投资时间目标标题</span>
          <div class="flex items-center">
            <a-button @click="onInvest">投资中</a-button>
            <span class="mx-3">😊</span>
            <a-button @click="onShare" type="primary">分享投资经历</a-button>
            <a-popover v-model:open="visible"  trigger="click">
              <template #content>
                <div class="flex-col flex">
                  <template v-for="(item,index) in taskAtions" :key="index">
                    <a @click.stop="onClickHandler(item)">{{ item.name }}</a>
                  </template>
                </div>
              </template>
              <a-button type="text" @click.stop="()=>visible = true" size="small" class="ml-2">
                <template #icon>
                  <EllipsisOutlined :style="{ fontSize:'12px'}"/>
                </template>
              </a-button>
            </a-popover>
          </div>
        </div>
        <TaskTag :taskCard="taskCard"></TaskTag>
        <span class="mt-1">产品说明，1.0产出</span>
        <div class="flex flex-col mt-3">
          <span class="text-16px">前进语录</span>
          <span>短暂的冲刺，不如每次多五分钟的坚持</span>
        </div>
      </div>
      
      <div class="detail-chats">
        
      </div>
      <div class="flex justify-between items-center">
        <div class="config-item">
           <ConfigRenderer :config="configure" title="时间投资总览" :source="source"></ConfigRenderer>
        </div>
        <div class="focus-item">
          <FocusItem></FocusItem>
        </div>
      </div>
      <TaskChildCard></TaskChildCard>
      <TaskLineTime></TaskLineTime>
    </div>
    <ModalContainer></ModalContainer>
  </div>
</template>

<script setup lang="ts">
import { ref, watch,defineProps, computed,PropType } from 'vue';
import { useRoute } from 'vue-router';
import { TTaskItemMap } from './components/task/type';
import { EllipsisOutlined } from '@ant-design/icons-vue'
import ConfigRenderer from './components/configureItem/configureRenderer.vue';
import TaskTag from './components/task/taskTag.vue';
import TaskChildCard from './components/task/subTaskCard.vue';
import ModalContainer from './components/modal/modalContainer.vue';
import { EditOutlined } from '@ant-design/icons-vue';
import TaskLineTime from './components/task/taskLineTime.vue'
import FocusItem from './components/echats/focusItem.vue';
import { configure } from './config/detail.config';
import emitter from '@/utils/emitter';
import { taskAtions } from './components/task/constants';


interface Route {
  name: string;
  breadcrumbName: string;
  children?: Array<{
    path: string;
    breadcrumbName: string;
  }>;
}
const route = useRoute();
const basePath = '/app/home/invest';
const routes = ref<Route[]>([
  {
    name:'InvestPage',
    breadcrumbName: '投资时间列表',
  },
  {
    name: 'InvestDetail',
    breadcrumbName: '投资目标详情',
  },
]);

const props = defineProps({
   taskCard:{
    type:Object as PropType<TTaskItemMap>,
    required:true,
  },
})

const source = ref({});
const visible = ref(false);
// 分享投资
const onShare = ()=>{};

// 投资中
const onInvest = ()=>{};

// 创建子项目
const onCreateChild = ()=>{};

// 编辑子项目标题
const onEditTitle = ()=>{

};

const onClickHandler = (item)=>{
  visible.value = false;
  if(item?.event){
    emitter.emit(item.event,props.taskCard);
  }else if(item.value === 6){
    console.log('==上移==');
  }else if(item.value === 7){
    console.log('==下移==');
  }else if(item.value === 8){
    console.log('==置顶==');
  }else if(item.value === 9){
    console.log('==置底==');
  }
}


</script>


<style scoped lang="scss">
.detail-content {
  height: calc(100% - 55px);
  overflow: auto;
  padding:0 10px;
  margin: 0 -10px;
}
.config-item{
  border: 1px solid #ccc;
  width: 50%;
  border-radius: 4px;
  padding: 10px;
  margin: 5px 5px 5px 0;
}
.focus-item{
  border: 1px solid #ccc;
  width: 50%;
  border-radius: 4px;
}

</style>
