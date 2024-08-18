import { ModalEventNameEnum } from '../modal/type'
export const taskAtions = [
  {
    value:1,
    name:'投资经历分享',
    event:ModalEventNameEnum.SHARE
  },
  {
    value:2,
    name:'投资时间详情',
    // event:'DETAIL'
  },
  {
    value:3,
    name:'投资时间补记',
    event:ModalEventNameEnum.RECORD
  },
  {
    value:4,
    name:'归档',
    event:ModalEventNameEnum.CLOSED
  },
  {
    value:5,
    name:'取消归档',
    event:ModalEventNameEnum.UNCLOSED
  },
  {
    value:6,
    name:'上移',
    // event:'UP'
  },
  {
    value:7,
    name:'下移',
    // event:'DOWN'
  },
  {
    value:8,
    name:'置顶',
    // event:'TOP'
  },
  {
    value:9,
    name:'置底',
    // event:'BOTTOM'
  },
  {
    value:10,
    name:'删除',
    event:ModalEventNameEnum.DELETE
  }
];