
<template>
    <div class="app-main">
        <div class="app-header">app侧面导航</div>
        <div class="app-body">
            <div class="body-sidebar">
                <TSideBar 
                    v-model="sidebarConfig"
                    @click-side="onClickSide"
                    @add-plan-tag="onClickPlanTagAdd"
                    @add-folder="onClickFolderAdd"
                ></TSideBar>
            </div>
            <div class="body-content">
                 <RouterView v-slot="{ Component }"> 
                    <component :is="Component" :page-name="pageName" />
                </RouterView>
             </div>
        </div> 
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView, useRoute, useRouter} from 'vue-router';
import { TSideBar, TypeSideBar } from '@bs/component';


const { ListEnum,PlanEnum,TypeConfigs,intelligentList } = TypeSideBar

const router = useRouter();
const intelligents = intelligentList;
const customs = [
    {
        name:'树',
        id:'low_priority_t',
        listType:ListEnum.Custom,
        children:[
            {
                name:'树11',
                id:'low_priority_t11',
            },
            {
                name:'树22',
                id:'low_priority_t12',
            },
            {
                name:'树33',
                id:'low_priority_t13',
            }
        ]
    },
    {
        name:'树2树2树2树2树2树2树2树2树2树2树2树2树2树2树2树2树2树2树2树2树2树2树2树2树2树2树2',
        id:'low_priority_t2',
        listType:ListEnum.Custom,
        children:[
            {
                name:'树111',
                id:'low_priority_t21',
            },
            {
                name:'树222',
                id:'low_priority_t22',
            },
            {
                name:'树333',
                id:'low_priority_t23',
            }
        ]
    },
]


const sidebarConfig = ref<TypeSideBar.TypeConfigs>({
    intelligent:intelligents,
    custom:customs
});
const pageName = ref();

const onClickSide = (item:any)=>{
    const { id,name } = item;
    pageName.value = name;
    router.push(`/app/${id}`);
}

const onClickPlanTagAdd = (item:any)=>{
    console.log(item,'---item---')
};

const onClickFolderAdd = (item:any)=>{};



</script>


<style scoped lang="scss">
.app-main{
    width:100%;
    height: 100%;
    display: flex;
}
.app-header{
    width: 35px;
    height: 100%;
    border-right: 1px solid #ccc;
}
.app-body{
    width: calc(100% - 35px);
    height: 100%;
    display: flex;
    overflow: hidden;
}
.body-sidebar{
    width: 260px;
    height: 100%;
    border-right: 1px solid #ccc;
}
.body-content{
    width: calc(100% - 260px);
    background:#ebedf0;
}
</style>
