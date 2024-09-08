<template>
  <div class="editor-item-box">
    <div class="flex my-1">
      <div v-if="type=='plan'">{{ $attrs.source.value || '--' }}</div> 
      <div v-if="type=='expect'">
        <span>{{ $attrs.source.value || '--' }}</span>
        <span class="ml-4 text-red">过期 XX</span>
      </div>
      <EditOutlined @click="onEditor" v-if="showEdit($attrs.source)" class="ml-2"/>
    </div>
    <a-modal :open="visible" width="650px" :footer="null" @cancel="handleCancel" >
     <template #title>
        <div class="title">{{ title }}</div>
      </template>
      <div class="modal-body">
        <PlanEditor v-if="type === 'plan'" :source="$attrs.source" :filed="filed" :type="type"></PlanEditor>
        <ExpectEditor v-if="type === 'expect'" :source="$attrs.source" :filed="filed" :type="type"></ExpectEditor>
        <CycleEditor v-if="type === 'cycle'"></CycleEditor>
      </div>
      <div class="footer">
          <a-button @click="handleCancel" size="large">取消</a-button>
          <a-button class="ml-5"  @click="handleOk" type="primary" size="large">确定</a-button>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { ref,defineProps, onMounted, watch, computed,PropType } from 'vue';
import { EditOutlined } from '@ant-design/icons-vue';
import { TItem } from '../item/item.type';
import PlanEditor from './planEditor.vue';
import ExpectEditor from './expectEditor.vue';
import CycleEditor from './cycleEditor.vue';


const props = defineProps({
  title:String,
  filed:[String,Array],
  desc:String,
  showEdit:{
    type:Function,
    default:()=>true
  },
  type:{
    type:String as PropType<TItem>,
    default:'',
  }
  // source:{
  //   type:Object,
  //   default:()=>({}),
  //   required:true
  // }
});

const visible = ref(false);


const handleCancel = ()=>{
  visible.value = false;
};
const handleOk = ()=>{
  visible.value = false;
};

const onEditor = ()=>{
  visible.value = true;
};
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