<template>
  <div>
    <a-modal :open="open" :closable="true" width="620px" :footer="null" @cancel="handleCancel">
     <template #title>
        <div class="title">投资时间目标创建</div>
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
        <a-form-item label="截止日期" name="deadlineTime" tooltip="投资时间目标需要定一下截止时间，因为我们需要知道他应该什么时候完成">
          <a-date-picker v-model:value="formData.deadlineTime" style="width: 100%"/>
        </a-form-item>
        <a-form-item  label="投资状态" name="investStatus" tooltip="我们建议尽量少的开启投资时间目标，因为会分散精力，我们最好同时只投资一个目标">
            <a-radio-group v-model:value="formData.investStatus" name="radioGroup">
              <a-radio v-for="(item,index) in statusList" :value="item.value" :key="index">{{ item.label}}</a-radio>
            </a-radio-group>
        </a-form-item>
        <a-form-item  label="预期投资时间" name="expectedTime" tooltip="预期投资时间最低设置30小时，用于投入到对未来生活有帮助的大目标上，而不是管理生活琐事。最大一万个小时，在投资目标上专注时间一万个小时，在某个领域成为大师">
            <a-input-number  v-model:value="formData.expectedTime" :max="10000" :min="30"  addon-after="小时"/>
        </a-form-item>
        <a-form-item  label="投资时间计划" name="planType">
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
  investStatus:[
     { required: true, message:'投资状态不能为空' },
  ],
  expectedTime:[
    { required: true, message:'预期投资时间不能为空' },
  ],
  planType:{ required: true, message: '请选择投资时间计划', trigger: 'change' },
  planTime:{ required: true, message: '请选择投资时间计划', trigger: 'change' },
});
const formData = ref({
  title:'',
  deadlineTime:'',
  investStatus:'',
  expectedTime:80,
  planType:'每周',
  planTime:10
});
const statusList = [{
  label:'是',
  value:1
},{
  label:'否',
  value:0
}];
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
watch(()=>[formData.value.planType,formData.value.planTime],([type,time])=>{
  if(type === '每天' && time > 23){
    formData.value.planTime = 1;
  }

  if(type === '每周' && time < 7){
    formData.value.planTime = 7;
  }
})



// 获取投资状态
const getInvestStatus = ()=>{

};

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

