<template>
  <div class="px-1">
    <div class="flex">
      <span class="mr-2 text-16px font-400">项目名:</span>
      <span> {{ source?.title || "暂无信息" }}</span>
    </div>
    <div class="flex flex-col">
      <span>每隔一定数量的番茄专注后，显示番茄专注弹窗。</span>
      <span>用于记录投资时间过程中的事务、心情和感想。</span>
    </div>
    <a-form :model="formData">
      <a-form-item name="select">
        <a-select
          v-model:value="formData.selectVal"
          :size="size"
          style="width: 200px"
          :options="options"
        ></a-select>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, onMounted, watch, computed,PropType } from "vue";

const props = defineProps({
  source: {
    type: Object,
    default: () => ({}),
  },
  filed:{
    type:[String,Array],
    required:true
  },
});

const formData = ref({
  selectVal:''
});

const options = [...Array(36)].map((_, i) => ({ value: i+1, label:`${i+1}个番茄` })).filter((i)=> (i.value >= 4));



</script>
