<template>
  <a-tooltip :title="title" v-bind="$attrs" @openChange="onOpenChange">
    <span class="text-ellipsis overflow-hidden whitespace-nowrap label" v-if="text">{{ text }}</span>
    <slot></slot>
  </a-tooltip>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";


const props = defineProps({
  title:String,
  text:String
});

const emits =defineEmits(['change']);

const onOpenChange = (visible:boolean)=>{
  emits('change',visible)
}
</script>


<style scoped lang="scss">
.label{
  max-width: calc(100% - 10px);
  cursor: pointer;
}
</style>
