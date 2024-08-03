<template>
  <div>
    <a-modal v-model:open="open" title="设置阻塞时间表" width="450px" @ok="handleOk" @cancel="handleCancel" >
      <div>
         <a-input 
            v-model:value="urlValue"
            @change="remoteSearch"
            placeholder="input search text"  
            class="search" size="large"
            allowClear
          />
      </div>
    </a-modal>
  </div>
</template>


<script lang="ts" setup>
import { ref,defineProps, computed,defineEmits,h, watch } from 'vue';
import { message } from "ant-design-vue";


const emits = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue:Boolean
});

const open = computed(()=>{
  return props.modelValue || false;
});
const urlValue = ref('');

// 值发生变化
const remoteSearch = (value:string)=>{
  console.log('===value===',value)
}


const handleOk = (e: MouseEvent) => {
  // TODO:重定向
  emits('update:modelValue',false);
};

const handleCancel = ()=>{
  // TODO:重定向
  urlValue.value = '';
  emits('update:modelValue',false);
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
.select-title{
  text-align: center;
  display: inline-block;
  width: calc(100% - 24px)
}
.tip{
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: rgb(158, 158, 158);
  margin-top: 2px;
  margin-bottom: 20px;
}
.tab-content{
  overflow: auto;
  height: 330px;
  padding: 0 20px;
  margin: 0 -20px;
}
.card{
  display: flex;
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 16px;
  flex-wrap: wrap
}
.card-item{
  display: flex;
  width: calc(50% - 25px);
  height: 45px;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 8px;
}
.card-item:hover{
  border-radius: 4px;
  background: #1677ff;
  opacity: 0.9;
}
.card-item:nth-child(n){
  margin-right:25px;
}

.card-item-del{
  width: 100%;
  padding: 5px 20px;
  display: flex;
  height: 45px;
  justify-content: space-between;
  align-items: center;
}
.card-item-del:hover{
  background-color: #f2f2f2;
  border-radius: 4px;
}
.empty-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 20px 0 5px;
    .text{
      font-weight: bold;
      font-size: 14px;
      line-height: 16px;
      text-align: center;
      color: rgb(33, 33, 33);
      margin:12px 0 3px ;
    }
    .tip{
      font-size: 14px;
      line-height: 16px;
      text-align: center;
      color: rgb(158, 158, 158);
    }
}
.footer{
  margin-top:25px;
  display: flex;
  justify-content: space-between;
}
</style>

