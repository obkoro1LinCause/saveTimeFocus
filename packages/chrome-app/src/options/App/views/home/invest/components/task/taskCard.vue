
<template>
  <div class="p-2"  :style="style"> 
    <div class="card-header flex justify-between">
      <div class="flex flex-col w-40">
        <Tooltip :title="taskCard?.title ||'任务名称任务名称任务名称任务名称任务名'" :text="taskCard?.title ||'任务名称任务名称任务名称任务名称任务名'"></Tooltip>
        <div class="mt-1 flex" v-if="tagType === 'total'">
          <template v-for="(item,index) in TTagOptions" :key="index">
            <Tooltip :title="item?.title">
              <a-tag :color="item.color" class="text-12px my-1" @click.stop="onClickTag(item.type)" v-if="item.show">{{ item.label }}</a-tag>
            </Tooltip>
        </template>
        </div>
        <div class="mt-1 flex" v-if="!isChildTask && tagType === 'series'">
          <template v-for="(item,index) in STagOptions" :key="index">
            <Tooltip :title="item?.title">
              <a-tag :color="item.color" class="text-12px my-1" @click.stop="onClickTag(item.type)" v-if="item.show">{{ item.label }}</a-tag>
            </Tooltip>
        </template>
        </div>
      </div>
      <div class="flex">
        <div class="flex flex-col justify-center items-center mr-1">
           <a-button class="cursor-pointer w-20" type="primary" size="small" @click="onClickInvite('start')" v-if="showStartBtn">开始投资</a-button>
           <a-button class="cursor-pointer w-20" type="primary" size="small" @click="onClickInvite('open')" v-else>开启投资</a-button>
           <Tooltip :title="statesTip" v-if="true" placement="bottom" :text="statesText" class="mt-2"></Tooltip>
        </div>
        <a-popover v-model:open="visible"  trigger="click">
          <template #content>
            <div class="flex-col flex">
              <template v-for="(item,index) in actions" :key="index">
                <a @click="onClickHandler(item)">{{ item.name }}</a>
              </template>
            </div>
          </template>
          <a-button type="text" @click="()=>visible = true" size="small">
            <template #icon>
              <EllipsisOutlined :style="{ fontSize:'12px'}"/>
            </template>
          </a-button>
        </a-popover>
      </div>
    </div>
    <div class="card-content flex flex-wrap justify-between my-3 text-14px">
      <template v-for="(item) in taskCard.options" :key="item.label">
        <div class="flex flex-col w-50% my-2">
          <p>{{ item?.formatter ? item.formatter(taskCard?.source) : item.value || '--' }}</p>
          <p>{{ item.label }}</p>
        </div>
      </template>
    </div>
    <div class="flex">
       <template v-for="(item) in taskCard.components" :key="item.label">
          <p>{{ item.label }}</p>
          <component v-if="item.isComponent" :is="item.component" v-bind="item.props"></component>
          <p v-html="item.component"></p>
       </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, onMounted, PropType, computed} from "vue";
import { EllipsisOutlined } from '@ant-design/icons-vue'
import { TTaskItemMap } from './type';
import { taskAtions } from './constants';
import Tooltip from '@/options/App/component/tooltip.vue';

const props = defineProps({
  taskCard:{
    type:Object as PropType<TTaskItemMap>,
    required:true,
  },
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

// 过期时间文案
const statesText = computed(()=>{
  //  if(true) return `还剩多少天`;
  return `过期多少天`;
});

// 是否显示投资时间按钮
const showStartBtn =  computed(()=>{
  return false;
});

const statesTip = computed(()=>{
  return `时间投资目标截止日期为XXX，请注意时间`;
});

const visible = ref(false);
const actions = ref(taskAtions);
const tagType = ref<'total' | 'series'>('total');
const TTagOptions = ref([
    {
    label:'已专注',
    value:'',
    type:'total',
    color:'green',
    title:'已专注x天，当前连续专注x天，最高连续专注x天',
    show:true
  },
  {
    label:'已达标',
    value:'',
    type:'total',
    color:'red',
    title:'已达标x天，当前连续达标x天，最高连续达标x天',
    show:!isChildTask.value
  },
  {
    label:'已投资',
    value:'',
    type:'total',
    color:'orange',
    title:'已投资x天，当前连续投资x天，最高连续投资x天',
    show:true
  },
])
const STagOptions = ref([
  {
    label:'连续专注x天',
    value:'',
    type:'series',
    color:'green',
    title:'已专注x天，当前连续专注x天，最高连续专注x天',
    show:true
  },
  {
    label:'连续达标x天',
    value:'',
    type:'series',
    color:'cyan',
    title:'已达标x天，当前连续达标x天，最高连续达标x天',
    show:true
  },
  {
    label:'连续投资x天',
    value:'',
    type:'series',
    color:'blue',
    title:'已投资x天，当前连续投资x天，最高连续投资x天',
    show:true
  },
])

// 点击tag
const onClickTag = (type:'total' | 'series')=>{
  if(isChildTask.value) return;
  if(type === 'total'){
    tagType.value = 'series';
  }else{
    tagType.value = 'total';
  }
}

const onClickHandler = (item)=>{
  console.log(item,'===item===');
  visible.value = false;
}

const onClickInvite = (type:'start' | 'open')=>{
  console.log(type,'===item===111');
}


</script>

<style lang="scss" scoped>
.card-container{

}
.label{
  display: inline-block;
  max-width:200px;
  // overflow: hidden;
  // white-space: nowrap;
  // text-overflow: ellipsis;
}
</style>

