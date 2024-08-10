<template>
   <a-modal :open="visible" :closable="true" width="620px" :footer="null" @cancel="handleCancel" >
     <template #title>
        <div class="title">{{ title }}</div>
      </template>
      <div class="modal-body">
        <TaskOpen v-if="eventName === ModalEventNameEnum.OPEN"></TaskOpen>
        <TaskStart v-if="eventName === ModalEventNameEnum.START"></TaskStart>
        <TaskClosed v-if="eventName === ModalEventNameEnum.CLOSED"></TaskClosed>
        <TaskUnClosed v-if="eventName === ModalEventNameEnum.UNCLOSED"></TaskUnClosed>
      </div>
      <div class="footer">
          <a-button @click="handleCancel" size="large">取消</a-button>
          <a-button class="ml-5"  @click="handleOk" type="primary" size="large">确定</a-button>
      </div>
    </a-modal>
</template>
<script lang="ts" setup>
import { ref,defineProps, onMounted, watch, onBeforeUnmount, computed,PropType } from 'vue';
import emitter from '@/utils/emitter';
import TaskOpen from './TaskOpen.vue';
import TaskStart from './TaskStart.vue';
import TaskClosed from './TaskClosed.vue';
import TaskUnClosed from './TaskUnClosed.vue';
import { ModalEventNameEnum } from './type';

const props = defineProps({
  type:{
    type: String as PropType<ModalEventNameEnum>,
    default:''
  },
  modelValue:{
    type:Boolean,
    default:false
  }
});

const visible = ref(props.modelValue);
const eventName = ref<ModalEventNameEnum>(props.type);
const title = computed(()=> {
  if(eventName.value === ModalEventNameEnum.CLOSED) return '归档投资时间项目';
  if(eventName.value === ModalEventNameEnum.UNCLOSED) return '取消归档投资时间项目';
  if(eventName.value === ModalEventNameEnum.OPEN) return '开启投资';
  if(eventName.value === ModalEventNameEnum.START) return '开始投资';
  return '';
})

const onClose = ()=>{
  visible.value = false;
};

const handleOk = ()=>{
   visible.value = false;
   eventName.value = null;
}

const handleCancel = ()=>{
   visible.value = false;
   eventName.value = null;
}

onMounted(()=>{
  // 事件开启弹框
  emitter.on(ModalEventNameEnum.CLOSED,(pars)=>{
    if(visible.value) return ;
    visible.value = true;
    eventName.value = ModalEventNameEnum.CLOSED;
    console.log(pars,'==pars==')
  });
  emitter.on(ModalEventNameEnum.UNCLOSED,(pars)=>{
    if(visible.value) return ;
    visible.value = true;
    eventName.value = ModalEventNameEnum.UNCLOSED;
    console.log(pars,'==pars==')
  });
  emitter.on(ModalEventNameEnum.OPEN,(pars)=>{
     if(visible.value) return ;
     visible.value = true;
     eventName.value = ModalEventNameEnum.OPEN;
     console.log(pars,'==pars==')
  });
  emitter.on(ModalEventNameEnum.START,(pars)=>{
     if(visible.value) return ;
     visible.value = true;
     eventName.value = ModalEventNameEnum.START;
     console.log(pars,'==pars==')
  });
});

onBeforeUnmount(()=>{
  emitter.off(ModalEventNameEnum.CLOSED);
  emitter.off(ModalEventNameEnum.UNCLOSED);
  emitter.off(ModalEventNameEnum.OPEN);
  emitter.off(ModalEventNameEnum.START);
});

watch(()=>props.modelValue,(nv)=>{
  if(nv === visible.value) return;
  visible.value = nv;
},{ immediate:true });

</script>


<style lang="scss" scoped>
.footer{
  margin-top:25px;
  display: flex;
  justify-content: end;
}
.tip{
  color: #2f2f2f;
  font-size: 12px;
}
</style>