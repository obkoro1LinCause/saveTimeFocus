
<template>
    <div class="todo-detail">
        <div class="detail-header">详情头部</div>
        <div class="detail-body">详情</div>
        <div class="detail-footer">详情底部</div>
    </div>
</template>

<script setup lang="ts">
import { defineProps,defineEmits,ref, watch, onMounted,nextTick } from 'vue';

const props = defineProps({
   
});


</script>

<style scoped>
.todo-detail{
    display: flex;
    flex-direction: column;
    height: 100%;
}
</style>
