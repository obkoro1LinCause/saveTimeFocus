
<template>
    <div class="app-main">
        <div class="app-header">app侧面导航</div>
        <div class="app-body">
            <div class="body-sidebar">
                <TSideBar :config="TSidebarConfig"></TSideBar>
            </div>
            <div class="body-content">
                内容
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { TSidebarConfig } from './type/sidebar';
import { TSideBar,type TypeSideBar } from '@bs/component';

const TSidebarConfig = ref<TypeSideBar>([
    {
        label:'',
    }
])

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
