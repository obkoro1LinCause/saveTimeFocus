
<template>
    <div class="icon-container">
        <template v-if="iconType === IconName.Plus">
            <i class="el-icon" data-v-ea893728="" style="font-size: 20px;"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"></path></svg></i>
        </template>
        <template v-if="iconType === IconName.FolderAdd">
            <i class="el-icon" data-v-ea893728="" style="font-size: 20px;"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M128 192v640h768V320H485.76L357.504 192H128zm-32-64h287.872l128.384 128H928a32 32 0 0 1 32 32v576a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32zm384 416V416h64v128h128v64H544v128h-64V608H352v-64h128z"></path></svg></i>
        </template>
        <template v-if="iconType === IconName.ArrowDown">
            <i class="el-icon" data-v-ea893728="" style="font-size: 20px;"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"></path></svg></i>
        </template>
        <template v-if="iconType === IconName.ArrowUp">
            <i class="el-icon" data-v-ea893728="" style="font-size: 20px;"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="m488.832 344.32-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0z"></path></svg></i>
        </template>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { IconName } from './type';

const props = defineProps({
   iconType:{
        type:String,
        default:''
    }
});


</script>

<style scoped>

</style>
