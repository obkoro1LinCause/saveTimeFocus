
<template>
    <div class="side-container">
        <template v-for="(element,index) in modelValue?.intelligent" :key="index">
            <div  
                @click.stop="onClickSide(element)"
                class="item-row row-card"
                :class="{
                    'row-click':element.id == clickedId
                }"
            >
                <div class="level-lt">
                    <span class="icon">icon</span>
                    <span class="">{{element.name}}</span>
                </div>
                <div class="level-rt">
                    <span class="time">time</span>
                    <span>...</span>
                    <template v-if="element.children">
                        <Icon :iconType="IconName.ArrowDown" @click="onClickShow(element)" v-if="element.show"></Icon>
                        <Icon :iconType="IconName.ArrowUp" @click="onClickShow(element)" v-else></Icon>
                    </template>
                </div>
            </div>
        </template>
        <div class="side-border"></div>
        <draggable 
            v-model="modelValue.custom" 
            :options="options"  
            item-key="id" 
            animation="300"
            :group="groupA"
            :move="onMove"
            drag-class="drag-class"
        >
            <template #item="{ element }">
                <div  @click.stop="onClickSide(element)" class="row-card">
                    <div 
                        class="level-first" 
                        :class="{
                            'row-click':element.id == clickedId
                        }"
                    >
                        <div class="level-lt" @mousedown="onMousedown(element)">
                            <span class="icon">icon</span>
                            <span class="text-name">{{element.name}}</span>
                        </div>
                        <div class="level-rt">
                            <span class="time">time</span>
                            <span>...</span>
                            <template v-if="element.children">
                                <Icon :iconType="IconName.ArrowDown" @click="onClickShow(element)" v-if="element.show"></Icon>
                                <Icon :iconType="IconName.ArrowUp" @click="onClickShow(element)" v-else></Icon>
                            </template>
                        </div>
                    </div>
                    <template  v-if="element.children">
                        <draggable 
                            v-model="element.children" 
                            :options="options"  
                            item-key="id" 
                            animation="300"
                            v-show="element.show" 
                            group="itxst" 
                            class="row-card-child"
                            drag-class="drag-class"
                        >
                            <template #item="{element}">
                                <div 
                                    @click.stop="onClickSide(element)"
                                    class="item-row row-card item-row-child" 
                                    :class="{
                                       'row-click':element.id == clickedId
                                    }"
                                >
                                        <div>
                                            <span class="icon">icon</span>
                                            <span class="">{{element.name}}</span>
                                        </div>
                                    <span class="time" style="padding-right:10px">time</span>
                                </div>
                            </template>
                        </draggable>
                    </template>
                    <template v-if="element.children && !element.children.length && element.show">
                        <span>添加清单</span>
                    </template>
                </div>
            </template>
        </draggable>
        <div class="side-footer">
            <div class="footer-lt" @click="onClick('plan','创建清单')">
                <Icon :icon-type="IconName.Plus"></Icon>
                <span>创建清单</span>
            </div>
            <div class="footer-rt">
                <Icon :icon-type="IconName.FolderAdd" @click="onClick('tag','创建标签')"></Icon>
                <Icon :icon-type="IconName.FolderAdd" @click="onClick('folder','创建清单文件夹')"></Icon>
            </div>
        </div>
        <!-- <div class="side-dialog">
            <Dialog
                width="30%"
                :show-close="false"
                :close-on-click-modal="false"
                :title="title"
                v-model="visible"
                @cancel="onCancel"
                @ok="onConfirm"
            >
            <template #content>
                <ElInput 
                    :placeholder="placeholder"
                    v-model="addContent.text"
                    maxlength="100"
                ></ElInput>
                <template v-if="addType !== 'folder'">
                    <div class="colors-wrap">
                        <span 
                            v-for="(item,index) in Colors" :key="index"
                            class="color-token"
                            :style="{background:item.color}"
                            @click="onClickColor(item)"
                        ></span>
                    </div>
                </template>
            </template>
            </Dialog>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { defineProps,defineEmits,ref, watch, onMounted,nextTick,computed } from 'vue';
import { Dialog, Icon,TypeIcon,Colors } from '../index';
import { type TypeConfigs, ListEnum,type TypeConfig } from './TSideBar';
import draggable from 'vuedraggable';
const { IconName } = TypeIcon;

const emits = defineEmits([
    'click-side',
    'on-scroller',
    'add-plan-tag',
    'add-folder',
    'add-folder-success',
    'add-tag-success',
    'update:modelValue'
]);

const options = {
    forceFallback: true,
    animation:5000 
}

const props = defineProps({
    modelValue:{
        require:true,
        type:Object,
        default:()=>{
            return {
                intelligent:[],
                custom:[]
            }
        },
    }
});
const groupA = ref({
    name:'itxst',
    put: true, 
    pull:true
});
const newList = ref([]);
const clickedId = ref('');
const visible = ref(false);
const title= ref<string>('')
const addType = ref<string>('');
const addContent:any = ref<object>({
    text:'',
    token:''
});
const placeholder = computed(()=>{
    if(addType.value == 'plan'){
        return '清单名称';
    }else if(addType.value == 'tag'){
        return '标签名称';
    }else{
        return '清单文件夹名称';
    }
});


const onMove = (e) => { 
    const { draggedContext,to} = e;
    const className :any= to.getAttribute('class');
    if(draggedContext.element.children && className == 'row-card-child') return false;
    return true;
};

const onClickShow = (item:any)=>{
    item.show = !item.show;
}

const onMousedown = (item:any)=>{
    if(item.show){
        onClickShow(item);
    }
}
// 点击侧边栏
const onClickSide = (item:any)=>{
    clickedId.value = item.id;
    emits('click-side',item);
}

const onClickColor = (color:any)=>{
    addContent.value.token = color.token;
}

// 创建
const onClick = (type:string,name:string)=>{
    visible.value = true;
    addType.value = type;
    title.value = name;
}
// 取消
const onCancel = (bool:boolean)=>{
    visible.value = bool;
    addContent.value.text = '';
    addContent.value.token = '';
}

// 确定
const onConfirm = (bool:boolean)=>{
    if(!addContent.value.text.length) return;
    visible.value = bool;
    if(!addContent.value.token){
        addContent.value.token = 'Primary';
    }
    props.modelValue.custom.push({
        name:addContent.value.text,
        id:new Date().getTime(),    //时间戳先这么做
        color:addContent.value.token,
    });
   
    if(addType.value == 'plan' || addType.value == 'tag'){   
         emits('add-plan-tag',{
            name:'addContent.value.text',
            color:addContent.value.token,
            type:addType.value
         });
    }else{
         emits('add-folder',addContent.value.text);
    }
}

</script>

<style scoped>
.side-container{
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;

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
    padding: 10px;
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
.row-click{
    border-radius:5px ;
    background-color: #ddd;
}

.level-lt{
    width: calc(100% - 60px);
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}

.level-rt{
    display: flex;
    align-items: center;
    justify-content: center;
}
.side-border{
    border-bottom:1px solid #ccc ;
    margin: 10px;
    height: 0px;
}

.side-footer{
    display: flex;
    height: 35px;
    position: fixed;
    bottom: 0;
    width:250px; 
    padding: 5px;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border-top: 1px solid #ccc;
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
.colors-wrap{
    display: flex;
    width: 100%;
    flex-wrap: wrap;
}
.color-token{
    margin:10px 5px 0;
    width:20px;
    height:20px;
    border-radius:50%;
    cursor: pointer;
}

</style>
