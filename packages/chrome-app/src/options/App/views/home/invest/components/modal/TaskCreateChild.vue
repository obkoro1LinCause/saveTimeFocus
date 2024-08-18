<template>
    <a-form
      ref="FormRef"
      class="form-container"
      :rules="formDataRule"
      :model="formData"
      name="basic"
  >
      <a-form-item label="标题" name="title" >
       
      </a-form-item>
      <a-form-item label="截止日期" name="deadlineTime" tooltip="投资时间目标需要定一下截止时间，因为我们需要知道他应该什么时候完成">
        
      </a-form-item>
      <a-form-item  label="投资状态" name="investStatus" tooltip="我们建议尽量少的开启投资时间目标，因为会分散精力，我们最好同时只投资一个目标">
         
      </a-form-item>
      <a-form-item  label="预期投资时间" name="expectedTime" tooltip="预期投资时间最低设置30小时，用于投入到对未来生活有帮助的大目标上，而不是管理生活琐事。最大一万个小时，在投资目标上专注时间一万个小时，在某个领域成为大师">
         
      </a-form-item>
    </a-form>
</template>


<script lang="ts" setup>
import { ref,defineProps, computed,defineEmits,h, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core'
import type { Rule } from 'ant-design-vue/es/form';

const emits = defineEmits(['update:modelValue','change']);
const props = defineProps({
  modelValue:Boolean,
});

const formDataRule:Record<string, Rule[]> = ref({
  
});
const formData = ref({
 
});



</script>
<style lang="scss" scoped>
.form-container{
  width: 420px;
  margin: 30px auto -10px;
}
.footer{
  margin-top:25px;
  display: flex;
  justify-content: end;
}
</style>

