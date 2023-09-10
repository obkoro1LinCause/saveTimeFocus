
<template>
    <div class="side-container">
        <!-- <DynamicScroller 
            ref="scrollerRef" 
            :items="lists"
            :min-item-size="45"
            key-field="routeId"
            :buffer="20" 
            @scroll.passive="onScroll"
            id="side-scroller"
        >
            <template v-slot="{item,active}">
                <DynamicScrollerItem :item="item"  :active="active" :data-index="item.routeId" id="item">
                        <div class="side-item-card">
                                <div class="item-row" @click="onClickItem(item)">
                                    <div>
                                        <span class="icon">icon</span>
                                        <span class="">{{item.label}}</span>
                                    </div>
                                    <div class="item-row-rt">
                                        <span class="time">time</span>
                                        <template v-if="item.children">
                                            <Icon :iconType="IconName.ArrowDown" @click="onClickShow(item)" v-if="item.show"></Icon>
                                            <Icon :iconType="IconName.ArrowUp" @click="onClickShow(item)" v-else></Icon>
                                        </template>
                                    </div>
                                </div>
                                <div  
                                    v-show="item.show"
                                    v-for="(row, index) in item.children"  
                                    :key="`${index}-${item.routeId}`"
                                    class="item-row"
                                    :style="{padding:'10px'}"
                                    @click="onClickItem(row)"
                                >
                                    <div>
                                        <span class="icon">icon</span>
                                        <span class="">{{row.label}}</span>
                                    </div>
                                    <span class="time" style="padding-right:10px">time</span>
                                </div>
                        </div>
                </DynamicScrollerItem>
            </template>
        </DynamicScroller> -->
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
import { RecycleScroller,DynamicScrollerItem,DynamicScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import { Icon,TypeIcon } from '../index';
import { sideBarConfig , TypeConfigs} from './TSideBar';
import draggable from 'vuedraggable';
import Sortable from "sortablejs";

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

const newList = ref([]);
const lists = ref<TypeConfigs>(sideBarConfig);
const scrollerRef = ref()


const onClickShow = (item:any)=>{
    item.show = !item.show;
    console.log(item,'---item--')
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
    nextTick(()=>{
        const el = document.querySelector('.side-container');
        console.log(el);
        Sortable.create(el,{
            sort: true,
            bubbleScroll: true,
            onEnd: function(evt) {
                console.log('The item', evt.item, 'has moved from position', evt.oldIndex, 'to position', evt.newIndex);

            }
        });
        // var list = document.getElementById('my-list');
        // console.log(list,'---list---');
        // var sortable = Sortable.create(list,{
        //     onEnd: function(evt) {
        //         console.log('The item', evt.item, 'has moved from position', evt.oldIndex, 'to position', evt.newIndex);
        //     }
        // });
    })
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
.side-item-card{
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
}
.item-row{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 25px;
}
.item-row-rt{
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
</style>
