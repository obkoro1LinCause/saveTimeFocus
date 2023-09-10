
<template>
    <div class="app-main">
        <div class="app-header">app侧面导航</div>
        <div class="app-body">
            <div class="body-sidebar">
                <TSideBar 
                    v-model=sidebarLists
                    @click-plan="onClickPlan"
                    @add-plan="onClickPlanAdd"
                    @add-tag="onClickTagAdd"
                    @add-folder="onClickFolderAdd"
                ></TSideBar>
            </div>
            <div class="body-content">
                <RouterView></RouterView>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView, useRoute, useRouter} from 'vue-router';
import { TSideBar, TypeSideBar } from '@bs/component';


const { ListEnum,PlanEnum,TypeConfigs} = TypeSideBar

const router = useRouter();
const sidebarLists = ref<TypeSideBar.TypeConfigs>([
    {
        name:'今天',
        id:'today',
        listType:TypeSideBar.Intelligent
    },
    {
        name:'明天',
        id:'tomorrow',
    },
    {
        name:'本周',
        id:'week',
    },
    {
        name:'高优先级',
        id:'high_priority',
    },
    {
        name:'中优先级',
        id:'medium_priority',
    },
    {
        name:'低优先级',
        id:'low_priority',
    },
    {
        name:'树',
        id:'low_priority_t',
        children:[
            {
                name:'树11',
                id:'low_priority_t1',
            },
            {
                name:'树22',
                id:'low_priority_t2',
            },
            {
                name:'树33',
                id:'low_priority_t3',
            }
        ]
    }
]);

const onClickPlan = (item:any)=>{
    console.log(item,'---item---',router)
    const { routeId } = item;
    router.push(`/app/${routeId}`);
}

const onClickPlanAdd = (item:any)=>{
    console.log(item,'---item---')
}

const onClickTagAdd = ()=>{};

const onClickFolderAdd = ()=>{};



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
    width: calc(100% - 45px);
    display: flex;
}
.body-sidebar{
    width: 240px;
    height: 100%;
    border-right: 1px solid #ccc;
}
.body-content{
    min-width: calc(100% - 240px);
}
</style>
