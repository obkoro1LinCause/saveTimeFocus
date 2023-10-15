
export enum PlanEnum {
    'tag'='tag',
    'list'='list',
    'file'='file'
}

export enum ListEnum {
    'Intelligent' = 'Intelligent',
    'Custom'='Custom'
}

export type TypeConfig = {
    name:string,
    id:string,
    icon?:string,
    color?:string,
    type?:PlanEnum,
    listType?:ListEnum
    children?:Array<TypeConfig>
    sort?:number
}

export  type TypeConfigs = TypeConfig[];



export const intelligentList = [
    {
        name:'今天',
        id:'today',
        listType:ListEnum.Intelligent
    },
    {
        name:'明天',
        id:'tomorrow',
        listType:ListEnum.Intelligent
    },
    {
        name:'本周',
        id:'week',
        listType:ListEnum.Intelligent
    },
    {
        name:'高优先级',
        id:'high_priority',
        listType:ListEnum.Intelligent
    },
    {
        name:'中优先级',
        id:'medium_priority',
        listType:ListEnum.Intelligent
    },
    {
        name:'低优先级',
        id:'low_priority',
        listType:ListEnum.Intelligent
    },
    {
        name:'已计划',
        id:'planned',
        listType:ListEnum.Intelligent
    },
    {
        name:'全部',
        id:'all',
        listType:ListEnum.Intelligent
    },
    {
        name:'待定',
        id:'pending',
        listType:ListEnum.Intelligent
    },
    {
        name:'已完成',
        id:'complete',
        listType:ListEnum.Intelligent
    },
    {
        name:'任务',
        id:'task',
        listType:ListEnum.Intelligent
    },
];
