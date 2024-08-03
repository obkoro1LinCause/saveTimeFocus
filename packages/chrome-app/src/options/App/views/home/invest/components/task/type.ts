export type TaskStatus = 'investing' | 'planning' | 'closed';

export enum TaskStatusEnum {
  INVEST='investing',
  PLAN='planning',
  CLOSED='closed'
}

export const  TaskStatusMap = {
  [TaskStatusEnum.INVEST] : '投资中',
  [TaskStatusEnum.PLAN] : '规划中',
  [TaskStatusEnum.CLOSED] : '已归档'
}

export type TTaskItem = {
  label:string,
  value?:string,
  filed?:string | Array<string>,
  formatter?:Function
}
export type  TTaskItemMap = {
  components?:any,
  options:TTaskItem[],  //子主项目公共字段处理器
  title:string,
  source:any  //数据源
}

export type TTaskItemList = TTaskItemMap[];

export type TTaskMap = {
  item:TTaskItemMap,
  children:TTaskItemList,
}

export type TTaskList = TTaskMap[];


// 主项目组件
const PComponets = [
  {
    label:'前进语录',
    isComponent:false,
    component:'<span></span>',
    props:{

    }
  }
];
// 子项目组件
const CComponets = [
  {
    label:'子任务备注',
    component:'',
    props:{
      
    }
  }
]

// 提个task
export const TaskCard : TTaskItemMap = {
  title:'',
  source: {},
  options:[
    {
      label:'番茄重量/番茄时间',
      value:'1000g/20小时',
      formatter:(pars:any)=>`${pars?.s || '--'}g/${pars?.e || '--'}小时`,
      filed:'string',
    },
    {
      label:'投资时间计划/本日进度',
      value:'1000g/20小时',
      formatter:(pars:any)=>`${pars?.s || '--'}g/${pars?.e || '--'}小时`,
      filed:'string',
    },
    {
      label:'循环番茄/已进行的番茄',
      value:'1000g/20小时',
      formatter:(pars:any)=>`${pars?.s || '--'}g/${pars?.e || '--'}小时`,
      filed:'string',
    },
    {
      label:'预计投资时间/当前进度',
      value:'1000g/20小时',
      formatter:(pars:any)=>`${pars?.s || '--'}g/${pars?.e || '--'}小时`,
      filed:'string',
    }
  ],
  components:PComponets
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
