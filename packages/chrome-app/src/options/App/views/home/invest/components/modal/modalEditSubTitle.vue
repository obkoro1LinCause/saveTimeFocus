<template>
  <div>
    <a-modal :open="open" :closable="true" width="620px" :footer="null" @cancel="handleCancel">
     <template #title>
        <div class="title">投资时间子项目标题编辑</div>
      </template>
      <div class="form-container">
        <a-input v-model:value="titleVal" placeholder="请输入" />
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
import { useDebounceFn } from '@vueuse/core'
import type { Rule } from 'ant-design-vue/es/form';

const emits = defineEmits(['update:modelValue','change']);
const props = defineProps({
  modelValue:Boolean,
});

const titleVal = ref();

const open = computed(()=>{
  return props.modelValue || false;
});
const handleOk = (e: MouseEvent) => {
  emits('update:modelValue',false);
};
const handleCancel = ()=>{
  emits('update:modelValue',false);
}



</script>
<style lang="scss" scoped>
.form-container {
  width: 420px;
  margin: 30px auto -10px;
}
.footer {
  margin-top:25px;
  display: flex;
  justify-content: end;
}
</style>

