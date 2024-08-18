<template>
  <div class="px-1">
    <div class="flex">
      <span class="mr-2">项目名:</span>
      <span> {{ taskCardValue?.title || '暂无信息' }}</span>
    </div>
    <div class="flex">
      <span class="mr-2">投资时间项目切换开启状态</span>
      <a-switch v-model:checked="selectedVal" checked-children="开启" un-checked-children="关闭" @change="handleChange"/>
    </div>
    <div class="flex flex-col">
      <span>修改记录</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref,defineProps, onMounted, watch, computed } from 'vue';
import { TastFlags } from '../task/type';

const props = defineProps({
  taskCardValue:{
    type:Object,
    default:()=>({})
  },
});
// taskCardValue 是否开启投资的字段
const selectedVal = ref();

// 调用接口提示
const handleChange = (checked)=>{
  console.log(checked);
};

onMounted(()=>{

});



</script>