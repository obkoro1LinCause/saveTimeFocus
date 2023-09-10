
<template>
    <div class="side-container">
        <template v-for="(element,index) in listGroup1" :key="index">
            <div  
                @click="onClickItem(element)"
                class="item-row row-card"
            >
                <div class="level-lt">
                    <span class="icon">icon</span>
                    <span class="">{{element.name}}</span>
                </div>
                <div class="level-rt">
                    <span class="time">time</span>
                    <template v-if="element.children">
                        <Icon :iconType="IconName.ArrowDown" @click="onClickShow(element)" v-if="element.show"></Icon>
                        <Icon :iconType="IconName.ArrowUp" @click="onClickShow(element)" v-else></Icon>
                    </template>
                </div>
            </div>
        </template>
        <div class="border"></div>
        <draggable 
            v-model="listGroup2" 
            :options="{ forceFallback: true }"  
            item-key="id" 
            animation="300"
            @start="onStart"
            @add="onAdd"
            @remove="onRemove"
            @sort="onSort"
            @clone="onClone"
            :group="groupA"
            :move="onMove"
            drag-class="drag-class"
        >
            <template #item="{ element }">
                <div  @click="onClickItem(element)" class="row-card">
                    <div class="level-first clicked">
                        <div class="level-lt">
                            <span class="icon">icon</span>
                            <span class="">{{element.name}}</span>
                        </div>
                        <div class="level-rt">
                            <span class="time">time</span>
                            <template v-if="element.children">
                                <Icon :iconType="IconName.ArrowDown" @click="onClickShow(element)" v-if="element.show"></Icon>
                                <Icon :iconType="IconName.ArrowUp" @click="onClickShow(element)" v-else></Icon>
                            </template>
                        </div>
                    </div>
                    <template  v-if="element.children">
                        <draggable 
                            v-model="element.children" 
                            item-key="id" 
                            v-if="element.show" 
                            group="itxst" 
                            class="row-card-child"
                            drag-class="dragClass"
                        >
                            <template #item="{element}">
                                <div class="item-row row-card" :style="{padding:'10px'}" @click="onClickItem(element)">
                                    <div>
                                        <span class="icon">icon</span>
                                        <span class="">{{element.name}}</span>
                                    </div>
                                    <span class="time" style="padding-right:10px">time</span>
                                </div>
                            </template>
                        </draggable>
                    </template>
                </div>
            </template>
        </draggable>
        <div class="side-footer">
            <div class="footer-lt" @click="onClickPlan">
                <Icon :icon-type="IconName.Plus"></Icon>
                <span>创建清单</span>
            </div>
            <div class="footer-rt">
                <Icon :icon-type="IconName.FolderAdd" @click="onClickTagAdd"></Icon>
                <Icon :icon-type="IconName.FolderAdd" @click="onClickFolderAdd"></Icon>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps,defineEmits,ref, watch, onMounted,nextTick } from 'vue';
import { Icon,TypeIcon } from '../index';
import { sideBarConfigGroup1, sideBarConfigGroup2, TypeConfigs} from './TSideBar';
import draggable from 'vuedraggable';

const { IconName } = TypeIcon;

const emits = defineEmits([
    'click-plan',
    'on-scroller',
    'add-plan',
    'add-folder',
    'add-folder-success',
    'add-tag',
    'add-tag-success'
]);

const props = defineProps({
    modelValue:{
        type:Object,
        default:()=>[]
    }
})
const groupA = ref({
    name:'itxst',
    put: true, 
    pull:true
})
const newList = ref([]);
const listGroup1 = ref<TypeConfigs>(sideBarConfigGroup1);
const listGroup2 = ref<TypeConfigs>(sideBarConfigGroup2);
const scrollerRef = ref();

const onStart =(e)=>{
    const { originalEvent } =e;
    console.log('onStart',e, originalEvent)
}

const onAdd =(e)=>{
     const { originalEvent } =e;
    //  console.log('onAdd',e, originalEvent)
}
const onRemove =(e)=>{
     const { originalEvent } =e;
    //  console.log('onAdd',e, originalEvent)
}
const onSort =(e)=>{
    // if(e.relatedContext.element.children) return false;
    // return true;
}
const onClone =(e)=>{
    // if(e.relatedContext.element.children) return false;
    // return true;
}

const onMove = (e) => { 
    const { relatedContext,to} = e;
    const className :any= to.getAttribute('class');
    if(e.draggedContext.element.children && className == 'row-card-child') return false;
    return true;
};

watch(()=>listGroup1.value,(nv)=>{
    console.log(nv)
})


const onClickShow = (item:any)=>{
    item.show = !item.show;
}

const onClickItem = (item:any)=>{
    emits('click-plan',item);
}

const onScroll =()=>{
    console.log('onScroll')
}
const onClickTagAdd = ()=>{
     emits('add-tag');
}
const onClickFolderAdd = ()=>{
     emits('add-folder');
}
const onClickPlan = ()=>{
     emits('add-plan');
}

onMounted(()=>{
   
});

watch(()=>props.modelValue,(nv)=>{
        if(nv){
            console.log(nv,'---nv---')
        }
    },{
        immediate:true
    })

</script>

<style scoped>
.side-container{
    display: flex;
    flex-direction: column;
    height: 100%;
   

}
#side-scroller{
    height: calc(100% - 45px);
    overflow-y: overlay !important;
}

.row-card{
    padding: 8px 10px;
    height: auto;
    min-height: 25px;
}

.item-row-child{
    display: flex;
    flex-direction: column;
}
.item-row{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 20px);
}

.level-first{
    display: flex;
    justify-content: space-between;
}

.level-lt{

}

.level-rt{
    display: flex;
    align-items: center;
    justify-content: center;
}
.side-footer{
    display: flex;
    height: 35px;
    position: fixed;
    bottom: 0;
    width: 210px;
    margin: 0 15px 0 15px;
    justify-content: space-between;
    align-items: center;
}
.border{
    border-bottom:1px solid #ccc ;
    padding: 10px;
    margin: 10px;
}
.side-footer{
    display: flex;
    justify-content: space-between;
}
.footer-lt{
    display: flex;
    align-items: center;
    justify-content: center;
}
.footer-rt{
    display: flex;
}
.drag-class{
    background-color: #ccc !important;
}
.chosen-class{
    border: 1px solid #ccc !important;
    border-radius:5px ;
    margin: 0 5px;
}
.clicked{
    border-radius:5px ;
    background-color: #ddd;
    height: 100%;
}
</style>
