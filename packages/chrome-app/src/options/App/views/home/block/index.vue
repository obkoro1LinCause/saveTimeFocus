
<template>
  <div class="block-main" v-loading="loading">
    <div class="block-header">
      <div>
        <h3>黑名单</h3>
        <span>永久或按计划阻止站点</span>
        <a-button class="btn ml-6" type="primary" size="small" @click="onClick('add')" v-if="currentValue.length">
          <template #icon><PlusOutlined /></template>
          添加到阻止列表
        </a-button>
      </div>
      <div>
        <a-switch class="mr-4">阻塞</a-switch>
        <a-button @click="onClick('redirect')">重定向</a-button>
        <a-button class="ml-4" @click="onClick('set')">日程</a-button>
        <a-button class="ml-4" @click="onClick('page')">自定义阻止页面</a-button>
      </div>
    </div>
    <div class="block-card">
      <div v-if="!currentValue?.length" class="card-center">
          <h3>还没有被屏蔽的网站</h3>
          <span class="tip">当您添加要阻止的网站时，您会在此处看到它</span>
          <a-button class="btn" type="primary" size="large" @click="onClick('add')">
            <template #icon>
              <PlusOutlined />
            </template>
              添加到阻止列表
          </a-button>
      </div>
      <div v-else class="card-center">
        <div v-for="(item,index) in currentValue" :key="item.label" class="card-item-del">
          <div>
            <span>{{ item?.label }}</span>
            <span class="label-type">{{ item?.type === 'website' ? '网站':'关键字'}}</span>
          </div>
          <a-button :icon="h(DeleteOutlined)" size="small" @click="onDel(index)"></a-button>
        </div>
      </div>
    </div>
    <ModalBlock 
      v-model="open" 
      :current-value="currentValue"
      @change="onChange">
    </ModalBlock>
    <ModalRedirect v-model="openRedirect"></ModalRedirect>
    <ModalSetTime  v-model="openSetTime"></ModalSetTime>
    <ModalPage v-model="openPage"></ModalPage>
  </div>
</template>

<script setup lang="ts">
import { ref, watch,defineProps,h } from 'vue';
import { PlusOutlined,DeleteOutlined } from '@ant-design/icons-vue';
import ModalBlock from './modalBlock.vue';
import ModalRedirect from './modalRedirect.vue';
import ModalSetTime from './modalSetTime.vue'
import ModalPage from './modalPage.vue'



const open = ref<boolean>(false);
const openRedirect = ref<boolean>(false);
const openPage = ref<boolean>(false);
const openSetTime = ref<boolean>(false);
const currentValue = ref([]);
const loading = ref(false);

setTimeout(()=>{
  loading.value = false;
},5000)

const onClick = (type:'redirect' | 'set' | 'add' | 'page')=>{
  if(type === 'add'){
    open.value = true;
  }else if(type === 'redirect'){
    openRedirect.value = true;
  }else if(type === 'set'){
    openSetTime.value = true;
  }else if(type === 'page'){
    openPage.value = true;
  }
}

const onChange = (selected:any)=>{
  currentValue.value = selected;
}

const onDel = (index)=>{
  currentValue.value.splice(index,1);
}
</script>


<style scoped lang="scss">
.block-main{

}
.block-header{
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.block-card{
  display: flex;
  justify-content: center;
  background: rgb(245, 245, 245);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 0px;
  padding: 24px 0px;
  border-radius: 12px;
}
.card-center{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
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
  background-color: #1677ff;
  border-radius: 4px;
}
.tip{
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: rgb(158, 158, 158);
  margin-top: 4px;
  margin-bottom: 24px;
}
.btn{
  margin-top:10px
}
.label-type{
  margin-left: 8px;
  font-size: 12px;
  color: #ccc;
}

</style>
