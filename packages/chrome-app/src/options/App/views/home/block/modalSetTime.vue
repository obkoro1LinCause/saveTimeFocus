<template>
  <div>
    <a-modal v-model:open="open" title="设置阻塞时间表" width="450px" :footer="null" @cancel="handleCancel">
      <div class="time-content">
        <div v-for="(item,index) in timeLists" :key="index" class="flex content">
          <div class="time-picker">
            <a-time-picker v-model:value="item.startValue" format="HH:mm" />
            <span class="ml-3 mr-3">到</span>
            <a-time-picker v-model:value="item.endValue" format="HH:mm" />
          </div>
          <a-button :icon="h(PlusOutlined)" size="middle" @click="onClick('add')" class="mr-3"></a-button>
          <a-button :icon="h(DeleteOutlined)" size="middle" @click="onClick('del',index)" v-if="!!index"></a-button>
        </div>
      </div>
      <div class="footer">
        <a-button @click="handleCancel" size="large">清除</a-button>
        <a-button class="ml-8"  @click="handleOk" type="primary" size="large">确定</a-button>
      </div>
    </a-modal>
  </div>
</template>


<script lang="ts" setup>
import { ref,defineProps, computed,defineEmits,h, watch } from 'vue';
import { message } from "ant-design-vue";
import { DeleteOutlined,PlusOutlined } from '@ant-design/icons-vue';


const emits = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue:Boolean
});

const timeLists =  ref([{
  startValue:'',
  endValue:''
}]);

const setTimeLists = ()=>{
  return timeLists.value = [
    {
      startValue:'',
      endValue:''
    }
  ]
}

const open = computed(()=>{
  return props.modelValue || false;
});

const handleOk = (e: MouseEvent) => {
  // TODO:重定向
  emits('update:modelValue',false);
};

const handleCancel = ()=>{
  // TODO:重定向
  setTimeLists();
  emits('update:modelValue',false);
}

const onClick = (type:'add' | 'del',index?:number)=>{
  if(type === 'add'){
    timeLists.value.push({
      startValue:'',
      endValue:''
    })
  }else{
    if(timeLists.value?.length<=1) return;
    timeLists.value.splice(index,1);
  }
}


watch(()=>props.modelValue,(nv)=>{
  if(!nv) return;
})

</script>
<style lang="scss" scoped>
.title{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.time-content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.content{
  margin: 10px 0;
}
.time-picker{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}


.footer{
  margin-top:25px;
  display: flex;
  justify-content: center;
}
</style>

