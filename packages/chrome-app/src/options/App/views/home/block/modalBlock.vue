<template>
  <div>
    <a-modal :open="open" :closable="false" width="800px" :footer="null">
     <template #title>
        <div class="title" v-if="!isSee">
          <h3>添加到阻止列表</h3>
          <span class="tip">选择要阻止的内容</span>
        </div>
        <div v-else>
          <a-button type="text" :icon="h(ArrowLeftOutlined)" size="middle" @click="onClickSee('back')"></a-button>
          <span class="select-title">选中的项</span>
        </div>
      </template>
      <div v-if="!isSee">
          <a-input 
            v-model:value="keywordValue"
            @change="remoteSearch"
            placeholder="input search text"  
            class="search" size="large"
            allowClear
          />
          <a-tabs v-model:activeKey="activeKey" :tabBarGutter="50" size="large" @change="onChange">
            <a-tab-pane key="all" tab="综合"></a-tab-pane>
            <a-tab-pane key="website" tab="网站"></a-tab-pane>
            <a-tab-pane key="keyword" tab="关键词"></a-tab-pane>
          </a-tabs>
          <div class="tab-content">
            <div v-if="activeKey === 'website' || activeKey === 'all'" style="margin-top:20px">
              <h3>要阻止的网站</h3>
              <div class="card">
                <div v-for="(item,index) in websites" :key="index" class="card-item">
                  <span>{{ item.label }}</span>
                  <a-button :icon="h(PlusOutlined)" size="small" @click="onClick('website',item)" v-if="!item?.checked"></a-button>
                  <a-button :icon="h(CheckOutlined)" size="small" @click="onClick('website',item)" v-else></a-button>
                </div>
              </div>
            </div>
            <div v-if="activeKey === 'keyword' || activeKey === 'all'" style="margin-top:20px">
              <h3>要阻止的关键字</h3>
              <div class="card">
                <template v-if="keywords.length">
                  <div class="card-item">
                    <span>{{ keywordsLast?.label }}</span>
                    <a-button :icon="h(PlusOutlined)" size="small" @click="onClick('keyword',keywordsLast)" v-if="!keywordsLast?.checked"></a-button>
                    <a-button :icon="h(CheckOutlined)" size="small" @click="onClick('keyword',keywordsLast)" v-else></a-button>
                  </div>
                </template>
                <template v-else>
                  <div class="empty-item">
                    <FileSearchOutlined :style="{fontSize: '38px', color: '#08c'}"/>
                    <span class="text">使用搜索添加关键字</span>
                    <span class="tip">阻止包含特定单词的URL</span>
                  </div>
                </template>
              </div>
            </div>
          </div>
      </div>
      <div v-else class="tab-content">
        <template v-for="(item,index) in currentArrs" :key="index">
          <div class="card-item-del">
            <div>
              <span class="label">{{ item?.label }}</span>
              <span class="label-type">{{ item?.type === 'website' ? '网站':'关键字'}}</span>
            </div>
            <a-button :icon="h(DeleteOutlined)" size="small" @click="onClickDel(item)"></a-button>
          </div>
        </template>
      </div>
      <div class="footer">
        <a-button type="text" :disabled="!!!currentArrs?.length" @click="onClickSee('go')">
          {{ currentArrs?.length ? `选择要阻止的内容${currentArrs?.length}/${max}` : '选择要阻止的内容'}}
        </a-button>
        <div>
          <a-button @click="handleCancel" size="large">取消</a-button>
          <a-button class="ml-8"  @click="handleOk" type="primary" size="large">确定</a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>


<script lang="ts" setup>
import { ref,defineProps, computed,defineEmits,h, watch } from 'vue';
import { PlusOutlined,CheckOutlined,FileSearchOutlined,ArrowLeftOutlined,DeleteOutlined } from '@ant-design/icons-vue';
import { constants } from 'toolkit';
import { useDebounceFn } from '@vueuse/core'


const emits = defineEmits(['update:modelValue','change']);
const props = defineProps({
  modelValue:Boolean,
  currentValue:Array
});

const keywordValue = ref<string>('');
const activeKey = ref<'all' | 'keyword' | 'website'>('all');
const websites = ref([]);
const keywords = ref([]);
const loading = ref(false);
const isSee = ref(false);
const max = 3;

const currentArrs = computed(()=>{
  const arr1 =[...websites.value,...keywords.value].filter((item)=>!!item?.checked);
  return arr1;
});
const keywordsLast = computed(()=>{
  return keywords.value[keywords.value?.length-1] || {};
})
const open = computed(()=>{
  return props.modelValue || false;
})

const handleOk = (e: MouseEvent) => {
  const selected = JSON.parse(JSON.stringify(currentArrs.value));
  emits('change',selected);
  emits('update:modelValue',false);
};

const handleCancel = ()=>{
  emits('update:modelValue',false);
}

const onChange = (value:string)=>{
  onSearch();
}

const onSearch = ()=>{
  if(activeKey.value === 'keyword' || activeKey.value === 'all'){
    // 关键词
    if(!keywordValue.value) return keywords.value = [];
    keywords.value.push({
      label:keywordValue.value,
      value:keywordValue.value,
      checked:false
    });
  }
  if(activeKey.value === 'website'){
    console.log('=====网站====')
  }
  // domain校验
  // 关键字校验
}


const remoteSearch = useDebounceFn(() => {
  onSearch();
}, 500);

const onClick = (type:'website' | 'keyword' | 'all',item)=>{
  // if(type === 'website'){
    item.checked = !item?.checked;
    item.type = type;
  // }else if(type === 'keyword'){
  //    item.checked = !item?.checked;
  // }
}

const onClickDel = (item)=>{
  item.checked = false;
}

const onClickSee = (type:'back' | 'go')=>{
  if(!currentArrs.value?.length && type === 'go') return;
  isSee.value = type === 'go' ?  true : false;
}

// Websites 深拷贝
const initWebsites = ()=>{
  websites.value = JSON.parse(JSON.stringify(constants?.websites));
  if(props.currentValue?.length) {
    websites.value.forEach((item)=>{
      const idx = props.currentValue.findIndex((t:any)=>t.label === item.label)
      if(~idx) item.checked = true;
    })
  }
};

watch(()=>props.modelValue,(nv)=>{
  if(!nv) return;
  keywords.value = [];
  keywordValue.value = '';
  activeKey.value = 'all';
  isSee.value = false;
  initWebsites();
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
  cursor: pointer;
}
.card-item-del:hover{
  background-color: #1677ff;
  border-radius: 4px;
}
.label-type{
  margin-left: 8px;
  font-size: 12px;
  color: #ccc;
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

