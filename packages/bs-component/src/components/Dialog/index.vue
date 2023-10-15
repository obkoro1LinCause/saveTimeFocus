<template>
    <ElDialog
        v-model="props.modelValue"
        v-bind="$attrs"
        :width="width"
        @close="onCancle"
    >
    <span>
        <slot name="content"></slot>
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancle">{{cancelText}}</el-button>
        <el-button type="primary" @click="onConfirm">{{okText}}</el-button>
      </span>
    </template>
  </ElDialog>
</template>
<script lang="ts" setup>
import { ref,defineProps, watch,defineEmits } from 'vue';
import { ElDialog } from 'element-plus';

const emits = defineEmits(['update:modelValue','cancel','ok']);
const props = defineProps({
     modelValue:{
        require:true,
        type:Boolean,
        default:false
    },
    width:{
        type:[ Number,String],
        default:'30%'
    },
    okText:{
        type:[String],
        default:'确定'
    },
    cancelText:{
        type:[String],
        default:'取消'
    }
});

const onCancle = ()=>{
    emits('cancel',false)
}
const onConfirm = ()=>{
    emits('ok',false);
}

</script>