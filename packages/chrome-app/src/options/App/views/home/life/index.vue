
<template>
    <div>

        <p>
            <TimezoneSelect v-model="timezoneValue"></TimezoneSelect>
        </p>

        <p>
            <a-date-picker 
                v-model:value="data1" 
                show-time 
                placeholder="Select Time" 
                @change="change" 
                @ok="onOk" />
        </p>
       
    </div>
</template>

<script setup lang="ts">
import { ref, watch,defineProps,getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from '@/locales';
import TimezoneSelect from '../../../component/timezone.vue'


const { appContext }:any = getCurrentInstance();
const configMethods = appContext.config.globalProperties; 
const { locale, tm } = useI18n();
const route = useRoute();
const data1 = ref();
const timezoneValue = ref('');


const change = (date,dateString)=>{
    console.log('===',configMethods.dayPlugin.getUtcByChina('1'))
    // const utcDate = dayjs.utc(date);    //世界时间
    // const utcFormate = utcDate.format('YYYY-MM-DD HH:mm:ss');   //转化世界时间
    // const newDate = utcDate.tz(timezoneValue.value);    //转化时区

    // console.log(dateString,'===value locale===',utcDate,utcFormate,timezoneValue.value,':',newDate.format('YYYY-MM-DD HH:mm:ss'))

    // const local = dayjs.utc().local();
    // const localFormat = dayjs.utc().local().format();
    // console.log(local);
    // const newDate = local.tz(timezoneValue.value);
    // const newDateFormat = newDate.format('YYYY-MM-DD HH:mm:ss');
    // console.log(newDate,newDateFormat);
}

const onOk = (value)=>{
    // console.log('===1',value)
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
