
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
}

export  type TypeConfigs = TypeConfig[];

export const sideBarConfigGroup1:TypeConfigs = [
    {
        name:'今天',
        id:'today',
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
    }
]

export const sideBarConfigGroup2 = [
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
    },
    {
        name:'树2',
        id:'low_priority_t1',
        disabledPark:true,
        children:[
            {
                name:'树111',
                id:'low_priority_t11',
            },
            {
                name:'树222',
                id:'low_priority_t22',
            },
            {
                name:'树333',
                id:'low_priority_t33',
            }
        ]
    }
]