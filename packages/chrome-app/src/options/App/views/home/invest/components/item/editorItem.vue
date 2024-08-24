<template>
  <div class="">
    <div class="flex">
      <span>{{ source.value || '--' }}</span>
      <EditOutlined @click="onEditor" v-if="showEdit(source)"/>
    </div>
    <a-modal :open="visible" width="650px" :footer="null" @cancel="handleCancel" >
     <template #title>
        <div class="title">{{ title }}</div>
      </template>
      <div class="modal-body">
        <template v-if="type === 'plan'">
           <PlanEditor :source="source" :filed="filed"></PlanEditor>
        </template>
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

const props = defineProps({
  title:String,
  filed:[String,Array],
  showEdit:{
    type:Function,
    default:()=>true
  },
  desc:String,
  type:{
    type:String as PropType<TItem>,
    default:'',
  },
  source:{
    type:Object,
    default:()=>({}),
    required:true
  }
});

const visible = ref(false);
const iptVal = ref();

// const filedMap = computed(()=>{
//   if(Array.isArray(props.filed)){

//   }
//   return props.filed;
// })

const handleCancel = ()=>{
  visible.value = false;
};
const handleOk = ()=>{
  console.log(iptVal.value);
  // props.source.value = iptVal.value;
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