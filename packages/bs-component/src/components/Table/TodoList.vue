
<template>
    <draggable 
        v-model="props.list" 
        :options="options"  
        item-key="id" 
        animation="300"
        drag-class="drag-class"
    >
        <template #item="{ element }">
            <div>
                <span class="item-label">{{element.name}}</span>
                <template v-for="(item,index) in element.child" :key="index">
                    <div class="item-card" @click.stop="onClickElement(item)">
                        <span>{{item.name}}</span>
                    </div>
                </template>
            </div>
        </template>
    </draggable>
</template>

<script setup lang="ts">
import { defineProps,defineEmits,ref, watch, onMounted,nextTick } from 'vue';
import draggable from 'vuedraggable';

const emits = defineEmits(['on-click']);
const props = defineProps({
    list:{
        require:true,
        type:Array,
        default:()=>{
            const arr = Array.from({ length: 100 });
            return arr.map((t,index)=>({
                name:index++,
                id:index,
                child:[
                    {
                        name:index++,
                        id:index+2
                    }
                ]
            }))
        },
    }
});

const options = {
    forceFallback: true,
    animation:5000 
}

const onClickElement = (item:any)=>{
    emits('on-click')
}

</script>

<style scoped>
#todo-scroller{
    height: 100%;
}
.item-card{
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: #fff;
}
.row{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 25px;
}
</style>
