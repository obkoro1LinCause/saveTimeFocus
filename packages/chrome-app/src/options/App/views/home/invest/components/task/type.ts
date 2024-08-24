import { Component } from "vue";
export type TaskStatus = 'investing' | 'planning' | 'closed';

export enum TastFlagEnum {
  'OPEN' = 1,
  'CLOSED' = 0
}

export const TastFlags = [
  {
    label:'开启',
    value:TastFlagEnum.OPEN
  },
  {
    label:'关闭',
    value:TastFlagEnum.CLOSED
  },
]


export enum TaskStateEnum {
  CLOSED ='closed',
  NOCLOSED ='noclosed'
}

export const TaskStateMap = {
  [TaskStateEnum.CLOSED] : '已归档',
  [TaskStateEnum.NOCLOSED] : '未归档',
}

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


type MyFunc = (pars:any) => void;

export type TConfigureMap = {
  label:string,
  filed:string | Array<string>,
  formatter?:MyFunc;
  display?:MyFunc;
  component?:Component | string,
  props?:any
}
export type  TTaskItemMap = {
  components?:TConfigureMap[],
  options:TConfigureMap[],  //子主项目公共字段处理器
  title:string,
  source:any  //数据源
}

export type TTaskItemList = TTaskItemMap[];

export type TTaskMap = {
  item:TTaskItemMap,
  children:TTaskItemList,
}

export type TTaskList = TTaskMap[];

export type TConfigures = TConfigureMap[];