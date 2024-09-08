<template>
  <div class="child-task">
    <div class="flex justify-between mb-2">
      <h3>子项目111</h3>
      <a-button @click="onCreateChild" size="small" type="primary">创建</a-button>
    </div>
    <div class="child-task-content flex flex-col">
      <div class="child-task-item" v-for="item in 15" :key="item">
        <div class="header flex justify-between p-2">
          <div class="flex flex-col lf">
            <div class="flex mb-2">
              <span class="title font-16px font-400">子任务标题</span>
              <EditOutlined @click="onEditTitle" class="ml-2" />
            </div>
            <div>
              <a-tag>111</a-tag>
              <a-tag>222</a-tag>
            </div>
          </div>
          <div class="rt">
            <span class="mr-3">分享</span>
            <a-button size="small">开始投资时间</a-button>
          </div>
        </div>
        <div class="body">
           <ConfigRenderer :config="configureBySub" :source="source"></ConfigRenderer>
        </div>
      </div>
    </div>
    <ModalCreateSub v-model="createVisible"></ModalCreateSub>
    <ModalEditSubTitle v-model="editVisible"></ModalEditSubTitle>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, computed, PropType } from "vue";
import ConfigRenderer from "../configureItem/configureRenderer.vue";
import { EditOutlined } from "@ant-design/icons-vue";
import ModalCreateSub from '../modal/modalCreateSub.vue';
import ModalEditSubTitle from '../modal/modalEditSubTitle.vue'
import { configureBySub } from '../../config/detail.config'

const props = defineProps({
  
});

const createVisible = ref(false);
const editVisible = ref(false);
const source = ref();

// 创建子项目
const onCreateChild = () => {
  createVisible.value = true;
};

// 编辑子项目标题
const onEditTitle = () => {
  editVisible.value = true;
};
</script>

<style scoped lang="scss">
.child-task {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  &-content {
    height: 500px;
    overflow: auto;
    padding: 10px;
  }
  &-item {
    height: 400px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 5px 0;
  }
}
</style>
