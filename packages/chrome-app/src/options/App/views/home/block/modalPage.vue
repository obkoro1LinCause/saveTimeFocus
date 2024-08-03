<template>
  <div>
    <a-modal :open="open" :closable="false" width="800px" :footer="null">
       <template #title>
        <div class="title">
          <h3>自定义此页面</h3>
          <span class="tip">当你尝试访问阻止的页面时，选择要随机显示的图片</span>
        </div>
      </template>
      <div class="content" v-if="imgLists.length">
        <div class="img-card" v-for="(item,index) in imgLists" :key="index">
          <img :scr="item.scr">
        </div>
      </div>
      <div class="footer">
        <a-button @click="handleCancel" size="large">取消</a-button>
        <a-button class="ml-8"  @click="handleOk" type="primary" size="large">确定</a-button>
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
const imgLists = ref([{
  scr:'',
  name:''
}]);

const open = computed(()=>{
  return props.modelValue || false;
});


const handleOk = (e: MouseEvent) => {
  // TODO:重定向
  emits('update:modelValue',false);
};

const handleCancel = ()=>{
  // TODO:重定向
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
.tip{
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: rgb(158, 158, 158);
  margin-top: 2px;
  margin-bottom: 20px;
}

.footer{
  margin-top:25px;
  display: flex;
  justify-content: flex-end;
}
.content{
  border-bottom:1px solid #ccc;
}

.img-card{
  border: 1px solid #ccc;
  width:45px;
  height: 45px;
}
</style>

