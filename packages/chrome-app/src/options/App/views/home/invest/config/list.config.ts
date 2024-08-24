import { type TTaskItemMap,type TTaskList,type TConfigures } from '../components/task/type';

export const TaskCard : TTaskItemMap = {
  title:'',
  source: {},
  options:[
    {
      label:'番茄重量/番茄时间',
      display:()=>true,
      formatter:(pars:any)=>`${pars?.s || '--'}g/${pars?.e || '--'}小时`,
      filed:'string',
    },
    {
      label:'投资时间计划/本日进度',
      display:()=>true,
      formatter:(pars:any)=>`${pars?.s || '--'}g/${pars?.e || '--'}小时`,
      filed:'string',
    },
    {
      label:'循环番茄/已进行的番茄',
      display:()=>true,
      formatter:(pars:any)=>`${pars?.s || '--'}g/${pars?.e || '--'}小时`,
      filed:'string',
    },
    {
      label:'预计投资时间/当前进度',
      display:()=>true,
      formatter:(pars:any)=>`${pars?.s || '--'}g/${pars?.e || '--'}小时`,
      filed:'string',
    }
  ],
  components:[
    {
      label:'前进语录',
      filed:'',
      display:(pars:any)=>true,
      component:'',
      props:{}
    },
    {
      label:'子任务备注',
      filed:'',
      display:(pars:any)=>true,
      component:'',
      props:{}
    },
  ]
}

// 列表数组
export const taskListcons : TTaskList = [
  {
    item:TaskCard,
    children:[
      TaskCard,
      TaskCard,
      TaskCard
    ]
  }
];

