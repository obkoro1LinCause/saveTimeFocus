<template>
  <div>
    <a-modal :open="open" :closable="true" width="620px" :footer="null" @cancel="handleCancel">
     <template #title>
        <div class="title">创建投资时间子项目</div>
      </template>
      <a-form
        ref="FormRef"
        class="form-container"
        :rules="formDataRule"
        :model="formData"
        name="basic"
    >
        <a-form-item label="标题" name="title" >
          <a-input v-model:value="formData.title" placeholder="请输入标题" allowClear/>
        </a-form-item>
        <a-form-item label="截止日期" name="deadlineTime">
          <a-date-picker v-model:value="formData.deadlineTime" style="width: 100%"/>
        </a-form-item>
        <a-form-item  label="预期投资时间" name="expectedTime">
          <a-input-number  v-model:value="formData.expectedTime" :max="10000" :min="30"  addon-after="小时"/>
        </a-form-item>
        <a-form-item  label="备注" name="remark">
         <a-input></a-input>
        </a-form-item>
      </a-form>
      <div class="footer">
          <a-button @click="handleCancel" size="large">取消</a-button>
          <a-button class="ml-8"  @click="handleOk" type="primary" size="large">确定</a-button>
      </div>
    </a-modal>
  </div>
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
  title:[
    { required: true, message: '请输入标题', trigger: 'change' },
    { max: 160, message: '标题的长度最大160', trigger: 'blur' },
  ],
  deadlineTime:[{ required: true, message: 'Please pick a date', trigger: 'change', type: 'object' }],
  expectedTime:[
    { required: true, message:'预期投资时间不能为空' },
  ]
});
const formData = ref({
  title:'',
  deadlineTime:'',
  expectedTime:80,
  remark:''
});

const open = computed(()=>{
  return props.modelValue || false;
})

const handleOk = (e: MouseEvent) => {
  emits('update:modelValue',false);
};

const handleCancel = ()=>{
  emits('update:modelValue',false);
}



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

