
<template>
    <div>
        <a-date-picker v-model:value="data1" @change="change"/>
    </div>
</template>

<script setup lang="ts">
import { ref, watch,defineProps } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from '@/locales';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(timezone);
dayjs.extend(utc)

const { locale, tm } = useI18n();
const route = useRoute();
const data1 = ref();
const change = (date,dateString)=>{
    const tz = "America/New_York"
    const utcDate = dayjs.utc(dateString);
    const newDate = utcDate.tz(tz)
    const d1 = dayjs.tz('2013-11-18 11:55', 'Asia/Taipei')

    console.log(date,'===value locale===',dateString,utcDate.format(),newDate.format(),d1)
}


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
