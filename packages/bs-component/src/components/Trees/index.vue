<template>
  <div class="trees">
    <TreeItem v-model="list"></TreeItem>
  </div>
  
</template>
<script lang="ts">
import { ref, nextTick,defineComponent } from "vue";
import TreeItem from "./treeItem.vue";
import { morkList } from './type';

export default defineComponent({
  name:'BTrees',
  components:{
    TreeItem
  },
  setup(){
    const list = ref(morkList);
    return {
      list
    }
  }
})


</script>

<style scoped>
.prefix {
  color: var(--el-color-primary);
  margin-right: 10px;
}
.prefix.is-leaf {
  color: var(--el-color-success);
}
</style>
