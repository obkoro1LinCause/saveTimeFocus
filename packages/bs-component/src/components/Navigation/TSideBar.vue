
<template>
    <div class="side-container">
        <RecycleScroller 
            ref="scrollerRef" 
            :items="lists"
            :item-size="40"
            key-field="id"
            :buffer="20" 
            @scroll.passive="onScroll"
            class="side-scroller"
        >
            <template v-slot="{item}">
                    <div class="side-item-card">
                        {{item}}
                    </div>
            </template>
        </RecycleScroller>
        <div class="side-footer">
            <div class="footer-lt">创建清单</div>
            <div class="footer-rt">
                <span>1</span>
                <span>2</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps,defineEmits,ref } from 'vue';
import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

const emits = defineEmits(['on-click','on-scroller']);
const props = defineProps({
    config:{
        type:Object,
        default:()=>{}
    }
});

const lists = ref(Array.from({ length: 10000 }, (_, i) => `Item ${i}`).map((t,index)=>({id:index,val:t})));


const onClick = (item:any)=>{
    emits('on-click',item);
}

const onScroll =()=>{
    console.log('onScroll')
}

</script>

<style scoped>
.side-container{
    display: flex;
    flex-direction: column;
    height: 100%;
   

}
.side-scroller{
    height: calc(100% - 45px);
    overflow-y: overlay !important;
}
.side-item-card{
    height: 30px;
    line-height: 30px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
}
.side-footer{
    display: flex;
    height: 35px;
    position: fixed;
    bottom: 0;
}
</style>
