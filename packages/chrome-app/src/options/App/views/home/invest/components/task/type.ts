import { Component } from "vue";
export type TaskStatus = 'investing' | 'planning' | 'closed';

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

export type TTaskItem = {
  label:string,
  filed:string | Array<string>,
  formatter?:MyFunc
  display?:MyFunc
  component?:Component | string,
  props?:any
}
export type  TTaskItemMap = {
  components?:TTaskItem[],
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

