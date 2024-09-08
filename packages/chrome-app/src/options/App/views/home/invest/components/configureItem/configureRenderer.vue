
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
          <a-tooltip v-if="item.tip" placement="bottom">
            <template #title>
              <div v-if="typeof item.tip === 'function'" v-html="item.tip()"></div>
              <div v-else v-html="item.tip"></div>
            </template>
            <p v-if="typeof item.label === 'string'">{{ item.label }}</p>
            <p v-else>{{ item.label(source) }}</p> 
          </a-tooltip>
          <template v-else>
            <p v-if="typeof item.label === 'string'">{{ item.label }}</p>
            <p v-else>{{ item.label(source) }}</p> 
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, onMounted, PropType, computed} from "vue";
import { EllipsisOutlined } from '@ant-design/icons-vue'
import { type TConfigures } from '../task/type';
import { taskAtions } from '../task/constants';
import Tooltip from '@/options/App/component/tooltip.vue';


const props = defineProps({
  title:String,
  tip:String,
  config:{
    type:Array as PropType<TConfigures>,
    required:true,
  },
  taskId:Number,
  source:{
    type:Object,
    default:()=>({}),
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

