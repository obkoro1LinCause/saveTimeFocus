
<template>
    <a-select
        ref="selectRef"
        v-model:value="selectValue"
        @focus="focus"
        @change="handleChange"
        class="select"
    >
    <template v-for="(item,index) in list" :key="index">
        <a-select-option :value="item?.timezoneId">
            {{ item?.timezoneCn }}
        </a-select-option>
    </template>
    </a-select>
</template>

<script setup lang="ts">
import { ref, watch,defineProps, computed,defineEmits } from 'vue';
import { Utils } from '@toolkit';


const emits = defineEmits(['update:modelValue']);

const props = defineProps({
    modelValue:{
        require:true,
        default:''
    }
});

const selectValue = ref();
const selectRef = ref();

const list = computed(()=>{
    return Utils.timezoneList || [];
});

const handleChange = (value:any)=>{
    emits('update:modelValue',value)
}



</script>


<style scoped lang="scss">
.select{
    width: 200px;
}
</style>
