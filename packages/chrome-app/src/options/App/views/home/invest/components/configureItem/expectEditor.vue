<template>
  <div class="px-1">
    <div class="flex">
      <span class="mr-2 text-16px font-400">项目名:</span>
      <span> {{ source?.title || "暂无信息" }}</span>
    </div>
    <div class="flex flex-col">
      <span class="mr-2 text-16px font-400">描述内容:</span>
      <div class="flex flex-col text-12px px-2">
          自己的规划设置投资时间目标截止日期，也就是预期在哪个时间日期之前完成该投资时间目标。
      </div>
    </div>
    <div class="flex flex-col">
      <span class="mr-2 text-16px font-400 mb-2">投资时间计划设置:</span>
      <div class="flex flex-col text-12px px-2">
        <a-form :model="formData">
          <a-form-item name="deadlineTime">
             <a-date-picker v-model:value="formData.deadlineTime" style="width: 100%"/>
        </a-form-item>
        </a-form>
      </div>
    </div>
    <div class="flex flex-col">
      <span class="mr-2 text-16px font-400">修改记录</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, onMounted, watch, computed,PropType } from "vue";
import { TItem } from '../item/item.type';

const props = defineProps({
  source: {
    type: Object,
    default: () => ({}),
  },
  filed:{
    type:[String,Array],
    required:true
  },
  type:{
    type:String as PropType<TItem>,
    default:'',
  }
});

const formData = ref(props.source?.[props?.filed] || { deadlineTime :''});



</script>
