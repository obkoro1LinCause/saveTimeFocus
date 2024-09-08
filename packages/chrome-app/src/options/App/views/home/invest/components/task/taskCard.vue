
<template>
  <div class="p-2 task-card" :style="style" @click="onClickCard"> 
    <div class="card-header flex justify-between">
      <div class="flex flex-col w-40">
        <Tooltip :title="taskCard?.title ||'任务名称任务名称任务名称任务名称任务名'" :text="taskCard?.title ||'任务名称任务名称任务名称任务名称任务名'"></Tooltip>
        <TaskTag :taskCard="taskCard"></TaskTag>
      </div>
      <div class="flex">
        <div class="flex flex-col justify-center items-center mr-1">
           <a-button class="cursor-pointer w-20" type="primary" size="small" @click="onClickInvite(ModalEventNameEnum.START)" v-if="showStartBtn">开始投资</a-button>
           <a-button class="cursor-pointer w-20" type="primary" size="small" @click="onClickInvite(ModalEventNameEnum.OPEN)" v-else-if="showOpenBtn">开启投资</a-button>
           <a-button class="cursor-pointer w-20" type="primary" size="small" @click="onClickInvite(ModalEventNameEnum.UNCLOSED)" v-else-if="showClosedBtn">已归档</a-button>
           <!-- 提示 -->
           <Tooltip v-if="!!statesText" :title="statesTip"  placement="bottom" :text="statesText" class="mt-2"></Tooltip>
        </div>
        <a-popover v-model:open="visible"  trigger="click">
          <template #content>
            <div class="flex-col flex">
              <template v-for="(item,index) in actions" :key="index">
                <a @click.stop="onClickHandler(item)">{{ item.name }}</a>
              </template>
            </div>
          </template>
          <a-button type="text" @click.stop="()=>visible = true" size="small">
            <template #icon>
              <EllipsisOutlined :style="{ fontSize:'12px'}"/>
            </template>
          </a-button>
        </a-popover>
      </div>
    </div>
    <div class="card-content flex flex-wrap justify-between my-3 text-14px">
      <template v-for="(item) in taskCard.options" :key="item.label">
        <div class="flex flex-col w-50% my-2" v-if="item?.display?.(taskCard?.source)">
          <p>{{ item?.formatter ? item.formatter(taskCard?.source) : taskCard?.source?.[item.filed] || '--' }}</p>
          <p>{{ item.label }}</p>
        </div>
      </template>
    </div>
    <div class="flex">
       <template v-for="(item) in taskCard.components" :key="item.label">
         <div class="flex flex-col" v-if="item?.display?.(taskCard?.source)">
           <p>{{ item.label }}</p>
            <component :is="item.component" v-bind="item.props"></component>
         </div>
       </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, onMounted, PropType, computed} from "vue";
import { EllipsisOutlined } from '@ant-design/icons-vue'
import { TTaskItemMap,TaskStatusEnum,TaskStateMap,TaskStateEnum } from './type';
import { taskAtions } from './constants';
import Tooltip from '@/options/App/component/tooltip.vue';
import TaskTag from './taskTag.vue';
import emitter from '@/utils/emitter';
import { ModalEventNameEnum } from '../modal/type';
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps({
  taskCard:{
    type:Object as PropType<TTaskItemMap>,
    required:true,
  },
  taskIndex:Number,
  style:Object,
});

// 是否是投资状态的任务
const isTaskByInviting = computed(()=>{
   return true;
});

// 是否是子任务
const isChildTask = computed(()=>{
    return true;
});

// 是否显示投资时间按钮
const showStartBtn =  computed(()=>{
  return false;
  // return props?.taskCard?.source?.categorys?.includes(TaskStatusEnum.INVEST) || true;
});

/**
 * 是否显示开启投资按钮
 * 是主任务 & 是规划中的分类标签 & 是未归档
 **/ 
const showOpenBtn =  computed(()=>{
  return true;
  // return props?.taskCard?.source?.categorys?.includes(TaskStatusEnum.PLAN) && props?.taskCard?.source?.state === TaskStateEnum.NOCLOSED;
});

/**
 * 是否显示已归档状态
 * 已归档状态
 */
const showClosedBtn =  computed(()=>{
  return props?.taskCard?.source?.state === TaskStateEnum.CLOSED;
});

// 过期时间文案
const statesText = computed(()=>{
  const bool = '没有截止日期不显示'
  if(!bool) return;
  //  if(true) return `还剩多少天`;
  return `过期多少天`;
});
const statesTip = computed(()=>{
  return `时间投资目标截止日期为XXX，请注意时间`;
});

// 笑脸逻辑



const visible = ref(false);
const actions = ref(taskAtions);

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

const onClickInvite = (type:ModalEventNameEnum)=>{
  emitter.emit(type,props.taskCard);
}

const onClickCard = ()=>{
  router.push({ name :'InvestDetail', query:{ id:1}})
}

</script>

<style lang="scss" scoped>
.task-card:hover{
  background: #f2f2f2;
}

.label{
  display: inline-block;
  max-width:200px;
}
</style>

