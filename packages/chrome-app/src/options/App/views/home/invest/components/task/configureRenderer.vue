
<template>
  <div>
    <h3 v-if="title">{{title}}</h3>
    <div class="flex flex-wrap">
      <div v-for="(item) in config" :key="item.label" class="flex w-50 item px-2 items-end">
        <div class="flex flex-col" v-if="item?.display?.(source) || true">
          <div>
            <component 
              v-if="item.component" 
              :is="item.component" 
              v-bind="item.props" 
              :filed="item.filed"
              :source="source"
            ></component>
            <span v-else-if="item.formatter">{{item?.formatter?.(source)}}</span>
            <span v-else>{{ source?.[item.filed] || '--'}}</span>
          </div>
          <p>{{ item.label }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, onMounted, PropType, computed} from "vue";
import { EllipsisOutlined } from '@ant-design/icons-vue'
import { type TConfigures } from './type';
import { taskAtions } from './constants';
import Tooltip from '@/options/App/component/tooltip.vue';


const props = defineProps({
  title:String,
  config:{
    type:Array as PropType<TConfigures>,
    required:true,
  },
  taskId:Number,
  source:{
    type:Object,
    required:true,
  },
  filed:{
    type:[String,Object],
  }
});





</script>

<style lang="scss" scoped>
.item{
  height: 50px;
  background-color: #ccc;
  margin: 5px;
  cursor: pointer;
}
.item:hover{
  background-color: #1677ff;
  opacity: .9;
}
</style>

