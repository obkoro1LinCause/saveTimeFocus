import { type TTaskItemMap,type TTaskList,type TConfigures } from '../components/task/type';
import EditorItem from '../components/item/editorItem.vue';

export const configure:TConfigures = [
  {
    label:'番茄时间',
    filed:'',
    formatter:()=>'--',
  },
  {
    label:'番茄重量',
    filed:'',
    formatter:()=>'--',
  },
  {
    label:'投资时间计划/本日进度',
    filed:['schedule1','schedule2'],
    component:EditorItem,
    props:{
      title:'投资时间计划/本日进度',
      type:'plan',
      showEdit:()=>true,
      desc:`
        - 投资时间计划是用户根据自己的生活作息，给自己规定每天/每周，需要投资多少小时到投资时间项目中的一个计划，当这一天/这一周达到了投资目标，我们就认为这一天/这一周投资时间达标了。
        - 投资时间项目，不应该是短期的某项任务，所以我们可以定期投资时间进行播种，直到成熟收获投资时间项目。
        - 投资时间计划不该太难以完成，也不该太轻松完成，这对于我们长期投资时间并没有帮助，我们应该根据生活作息变化灵活动态调整投资计划~
      `
    }
  },
  {
    label:'预期投资时间',
    filed:'',
    formatter:()=>'--',
  },
  {
    label:'补记投资时间',
    filed:'',
    formatter:()=>'--',
  },
  {
    label:'投资目标截止日',
    filed:'',
    formatter:()=>'--',
  },
  {
    label:'闪念',
    filed:'',
    formatter:()=>'--',
  },
  {
    label:'日志感想',
    filed:'',
    formatter:()=>'--',
  },
  {
    label:'完美番茄专注时间',
    filed:'',
    formatter:()=>'--',
  },
  {
    label:'普通番茄专注时间',
    filed:'',
    formatter:()=>'--',
  },
  {
    label:'循环番茄',
    filed:'',
    formatter:()=>'--',
  },
]