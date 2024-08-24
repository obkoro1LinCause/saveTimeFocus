<template>
  <div class="px-1">
    <div class="flex">
      <span class="mr-2 text-16px font-400">项目名:</span>
      <span> {{ source?.title || "暂无信息" }}</span>
    </div>
    <div class="flex flex-col">
      <span class="mr-2 text-16px font-400">描述内容:</span>
      <div class="flex flex-col text-12px px-2">
        <span>
          - 投资时间计划是用户根据自己的生活作息，给自己规定每天/每周，需要投资多少小时到投资时间项目中的一个计划，当这一天/这一周达到了投资目标，我们就认为这一天/这一周投资时间达标了。
        </span>
        <span>
          - 投资时间项目，不应该是短期的某项任务，所以我们可以定期投资时间进行播种，直到成熟收获投资时间项目。
        </span>
        <span>
          - 投资时间计划不该太难以完成，也不该太轻松完成，这对于我们长期投资时间并没有帮助，我们应该根据生活作息变化灵活动态调整投资计划~
        </span>
      </div>
    </div>
    <div class="flex flex-col">
      <span class="mr-2 text-16px font-400 mb-2">投资时间计划设置:</span>
      <div class="flex flex-col text-12px px-2">
        <a-form :model="formData">
          <a-form-item name="planType">
            <a-select 
              v-model:value="formData.planType"  
              :options="planMapTypes?.map(type => ({ value: type }))">
            </a-select>
            <a-form-item name="planTime" class="mt-4">
              <a-select
                v-model:value="formData.planTime"
                :options="planMapTimes?.map(time => ({ value: time,label:`专注${time}小时` }))">
              </a-select>
            </a-form-item>
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
import { ref, defineProps, onMounted, watch, computed } from "vue";

const props = defineProps({
  source: {
    type: Object,
    default: () => ({}),
  },
});

const formData = ref({
  planType:'每周',
  planTime:10
});
/** 投资时间计划 */
const planMapTypes = ['每天', '每周'];
const planMapTypeByTime = {
  '每天':()=>{
    const result = [];
    for(let i = 1;i<=23;i++){
      result.push(i);
    }
    return result;
  },
  '每周':()=>{
    const result = [];
    for(let i = 7;i<=120;i++){
      result.push(i);
    }
    return result;
  },
}
const planMapTimes = computed(() => {
  const fn = planMapTypeByTime?.[formData.value?.planType];
  return fn?.() || [];
});

// 通讯回显设计，根据不同状态
</script>
