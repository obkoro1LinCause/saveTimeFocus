
<template>
  <div  class="flex flex-col w-full">
    <p v-if="listMap.title" class="m-3 text-4 font-500">{{ listMap?.title }}</p>
    <div 
      v-if="type!=='fqa_info'" 
      class="flex px-3 w-full"  
      :style="{
        'flex-wrap':`${ type == 'ana_info' ? 'nowrap':'wrap'}`
      }"
    >
      <template v-for="(item,index) in listMap?.options" :key="index">
          <Card 
            :cardItem="item"  
            :style="{ width:`${ type == 'ana_info' ? 'auto':'50%'}`
          }"></Card>
      </template>
    </div>
    <div class="p-3" v-else>
      <a-collapse>
        <a-collapse-panel v-for="(item,index) in listMap?.options" :key="index" :header="item?.title">
          <p v-html="item?.components"></p>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, onMounted, computed} from "vue";
import Card from './card.vue';

const props = defineProps({
  type:[String],
  listMap:{
    type:Object,
    required:true,
  }
});

</script>

