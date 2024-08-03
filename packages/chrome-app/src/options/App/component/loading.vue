<template>
  <div class="loading-container">
    <Spin :spinning="loading"/>
  </div>
</template>

<script>
import { ref } from 'vue';
import {  Spin } from 'ant-design-vue';
export default {
  name: 'loading',
  components:{
    Spin
  },
  setup() {
    const loading = ref(true);
    return {
      loading
    }
  }
}
</script>


<style scoped lang="scss">
.loading-container {
   position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: rgba($color: #ffffff, $alpha: 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    color: #335dfd;
}
</style>
