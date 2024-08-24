
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
      <div class="detail-total">
        <!-- <h3>时间投资总览</h3> -->
        <ConfigRenderer :config="configure" title="时间投资总览"></ConfigRenderer>
      </div>
      <div class="detail-total">
        <h3>专注番茄</h3>
      </div>
      <div class="detail-sub-task">
        <h3>子项目</h3>
        <div></div>
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch,defineProps, computed,PropType } from 'vue';
import { useRoute } from 'vue-router';
import TaskTag from './components/task/tag.vue';
import { TTaskItemMap } from './components/task/type';
import ConfigRenderer from './components/task/configureRenderer.vue';
import { configure } from './config/detail.config';
 
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

// 分享投资
const onShare = ()=>{};

// 投资中
const onInvest = ()=>{};


</script>


<style scoped lang="scss">

</style>
