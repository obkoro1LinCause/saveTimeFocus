
import { TTimezoneList } from './day';

export  declare class Day {
    timezoneList:TTimezoneList;
    getUtcByChina(time:Date): Date
    getTimezoneByUtc(timezoneId:string,utc:any):void;
    formatTime(format:string):string
  }