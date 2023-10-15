
<template>
    <div class="todo-main flex">
        <div class="todo-lt" :style="{width: visible ? 'calc(100% - 300px)':'100%'}">
            <header class="flex header">
                <span>{{pageName}}</span>
                <span>sort</span>
            </header>
            <div class="">11</div>
            <div class="page-lt">
                <TodoList @on-click="onClick"></TodoList>
            </div>
        </div>
        <div class="todo-rt" v-if="visible">
            <TodoDetail></TodoDetail>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch,defineProps } from 'vue';
import { useRoute } from 'vue-router';
import { TodoList,TodoDetail } from '@bs/component';
const route = useRoute();

const props = defineProps({
    pageName:{
        type:String,
        default:''
    }
});
const visible = ref(false);

const getPageData =(id:any)=>{
    if(!id) return;
    console.log(id);
}

const onClick = (item:any)=>{
    visible.value = true;
    console.log(item,'---item---')
}

watch(()=>route?.params,(nv)=>{
    getPageData(nv?.id)
},{
    immediate:true,
    deep:true
})

</script>


<style scoped lang="scss">
.todo-main{
  height: 100%;
}
.header{
    justify-content: space-between;
}

.todo-lt{
    padding: 20px;
    max-height:calc(100% - 20px);
    overflow: auto;
}
.page-lt{

}
.todo-rt{
    width: 300px;
    background: #fff;
    margin-right: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    padding: 10px;
}
</style>
