<template>
  <div class="user-box">
    <div class="user-tab">
      <el-radio-group v-model="tabLabel">
        <el-radio-button label="register">register</el-radio-button>
        <el-radio-button label="login">login</el-radio-button>
      </el-radio-group>
    </div>
    <component :is="componentCard"></component>
  </div>
</template>

<script lang="ts" setup>
import { ref,computed } from 'vue';
import LoginCard from './loginCard.vue';
import RegisterCard from './registerCard.vue';

const tabLabel=ref('register');

// 组件卡片
const componentCard = computed(()=>{
  return tabLabel.value === 'register' ? RegisterCard : LoginCard;
});


// soket test

</script>


<style scoped>

</style>
