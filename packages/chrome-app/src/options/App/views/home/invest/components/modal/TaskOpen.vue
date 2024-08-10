<template>
  <div class="content">
    开启投资
  </div>
</template>
<script lang="ts" setup>
import { ref,defineProps, onMounted, watch, computed } from 'vue';

const props = defineProps({
  taskCardValue:{
    type:Object,
    default:()=>({})
  },
});

onMounted(()=>{

});



</script>