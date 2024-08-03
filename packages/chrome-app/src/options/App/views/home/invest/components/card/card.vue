
<template>
  <div class="px-2 my-5 flex-col flex items-center">
    <LikeOutlined :style="{ fontSize: '28px'}"/>
    <span class="my-3">{{ cardItem?.title }}</span>
    <span>{{ cardItem?.text }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, onMounted} from "vue";
import { LikeOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  cardItem:{
    type:Object,
    required:true,
  },
})
</script>

