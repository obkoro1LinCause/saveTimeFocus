
<template>
    <div class="todo-list-main">
       todolist {{ pageId }}
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const pageId:any  = ref('');


watch(()=>route,(nv)=>{
    pageId.value = nv?.params?.id;
},{
    immediate:true,
    deep:true
})

</script>


<style scoped lang="scss">

</style>
